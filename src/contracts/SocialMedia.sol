// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    // State variables
    string public name;
    uint public productCount = 0; 
    uint public collectionCount = 0; 

    // Equivalent to database
    struct Product {
        uint id;
        string name;
        string mediaHash;
        uint price;
        address owner;
        bool purchased;
        uint collection_id;
    }

    // Similar to declaring PK for adding data
    mapping(uint => Product) public products;

    // Emit event when a product is created
    event ProductCreated(
        uint id,
        string name,
        string mediaHash,
        uint price,
        address owner,
        bool purchased,
        uint collection_id
    );

    // Emit event when a product is purchased
    event ProductPurchased(
        uint id,
        string name,
        string mediaHash,
        uint price,
        address owner,
        bool purchased,
        uint collection_id
    );

    // Equivalent to database
    struct Collection {
        uint id;
        string name;
        string mediaHash;
        address owner;
    }

    // Similar to declaring PK for adding data
    mapping(uint => Collection) public collections;

    // Emit event when a collection is created
    event CollectionCreated(
        uint id,
        string name,
        string mediaHash,
        address owner
    );

    constructor() {
        name = "Exotique Marketplace";

        // Create a default collection
        createCollection('Default', ''); 
    }

    function createProduct(string memory _name, string memory _mediaHash, uint _price, uint _collection_id) public {
        // Validation
        require(bytes(_name).length > 0);
        require(bytes(_mediaHash).length > 0);
        require(_price > 0);

        // Update counter
        productCount ++;

        // Create a product
        products[productCount] = Product(productCount, _name, _mediaHash, _price, msg.sender, false, _collection_id);

        // Trigger an event (Similar to return)
        emit ProductCreated(productCount, _name, _mediaHash, _price, msg.sender, false, _collection_id);
    }

    function purchaseProduct(uint _id) public payable {
        // Fetch product and owner
        Product memory _product = products[_id];
        address _owner = _product.owner;

        // Validation
        require(_product.id > 0 && _product.id <= productCount); // Id is valid
        require(msg.value >= _product.price); // There is enough ETH in transation
        require(!_product.purchased); // Product is not purchased already
        require(msg.sender != _owner); // Buyer is not the owner

        // Transfer ownership and update price
        _product.owner = msg.sender;
        _product.purchased = true;
        _product.price = msg.value;

        // Update the actual product in blockchain
        products[_id] = _product;

        // Pay the owner
        payable(_owner).transfer(msg.value);

        // Trigger an event
        emit ProductPurchased(_id, _product.name, _product.mediaHash, _product.price, msg.sender, true, _product.collection_id);
    }

    function createCollection(string memory _name, string memory _mediaHash) public {
        // Validation
        require(bytes(_name).length > 0);

        // Update counter
        collectionCount ++;

        // Create a collection
        collections[collectionCount] = Collection(collectionCount, _name, _mediaHash, msg.sender);

        // Trigger an event (Similar to return)
        emit CollectionCreated(collectionCount, _name, _mediaHash, msg.sender);
    }
}



/*
Extra Notes:
    1) Why counter?
    Solidity doesn't tell us how many products are in Struct. It returns empty vals if you've 5 prods and search for 6. 

    2) What is state/public variable?
    Using public converts vaiable into function which can be used globally including console. More like auto increment PK.

    3) Why to trigger event?
    In Laravel, we return some value in the function. In solidity, we can trigger an event which will be passed as an argument in the callback of this function.

    4) What is msg.sender?
    It's the address of the person who calls the function i.e the one who makes the purchase with his wallet. In this case, msg. values come from metadata (msg.sender = from: buyer). 

    5) What is require() in a function?
    The function will throw an exception and will stop the execution if the condition is not correct in order to save gas fee.

    6) Why _ on parameters?
    _ is just for naming convention to differentiate local variables from state variables. 

    7) What is Product memory _product?
    Creates a duplicate copy of the product that exists in the blockchain and assigns it to the local variable _product. 

    8) What is payable?
    Solidity can't let you transfer money or use metadata(msg) value without payable function. The variable which contains owner address also must have payable.

    9) What happens ofter transfering the value?
    Check the Ganache network. The msg.sender/from: buyer (3rd account) will lose 1 eth and owner (2nd account) will gain one.   
*/

