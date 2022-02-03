import React, { useEffect }  from 'react';
import Web3 from 'web3';
import SocialMedia from '../build/SocialMedia.json';
import { useDispatch, useSelector } from 'react-redux';
import { setSocialMedia } from '../helpers/reducers/SocialMedia'
import Router from '../helpers/router';

import Header from './sections/Header';
import Loading from './reusables/Loader';
import Footer from './sections/Footer';

// Can't use Redux hooks in a class component
function App() {    
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme)
    const socialMedia = useSelector((state) => state.socialMedia.value)

    // Equivalent to componentWillMount()
    useEffect(() => {
        loadWeb3()
        loadBlockchainData()
    })

    const loadWeb3 = async () => {
        // Modern dapp broswers
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.eth_requestAccounts
        }
        // Lagacy dapp broswers
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        // No-dapp broswers
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadBlockchainData = async () => {
        const account = await window.web3.eth.getAccounts() /* Use await while calling a function */
        const netId = await window.web3.eth.net.getId()

        // Check if smart contract is deployed to correct network(Ganache) 
        if(SocialMedia.networks[netId]) {
            const socialMedia = new window.web3.eth.Contract(SocialMedia.abi, SocialMedia.networks[netId].address)

            const postCount = await socialMedia.methods.postCount().call() /* https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#id26 */
            const posts = []

            for(var i = 1; i <= postCount; i++) {
                const post = await socialMedia.methods.posts(i).call()
                posts.push(post)
            }

            dispatch(setSocialMedia({ 
                account: account[0],
                socialMedia: socialMedia,
                postCount: postCount,
                posts: posts,
                loading: false
            }))
        } else {
            window.alert('Smart contract not deployed to detected network')
        }
    }

    return (
        <div className="App" >
            <Header account={socialMedia.account} themeColor={theme.color} />

            {socialMedia.loading 
                ? <Loading />
                : <Router />                    
            }
        
            <Footer />
        </div>
    )
}

export default App;