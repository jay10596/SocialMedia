import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tipPost } from '../../helpers/reducers/SocialMedia';

function Post() {
    const { id } = useParams() // Route parameter

    const dispatch = useDispatch()
    const socialMedia = useSelector((state) => state.socialMedia.value)
    const post = socialMedia.posts[id - 1]

    const [tip, setTip] = useState('')

    // Binding values
    const updateTip = (e) => setTip(e.target.value.toString())
    
    return (
        <main>
            {id > socialMedia.posts.length
                ?   <Navigate to='/posts' />
                :   <div>
                        {post.id}) {post.content} - {post.author} - {window.web3.utils.fromWei(post.tip.toString(), 'Ether')} ETH

                        {post.mediaHash.length > 0 
                            ?   <img src={`https://ipfs.infura.io/ipfs/${post.mediaHash}`} alt={post.mediaHash} />
                            :   null
                        }

                        {post.author === socialMedia.account 
                            ?   null
                            :   <div>
                                    <label>
                                        Price:
                                        <input type="text" name="price" value={tip} onChange={updateTip} />
                                    </label>
                                    
                                    <button onClick={() => dispatch(tipPost({id: post.id, tip: window.web3.utils.toWei(tip, 'Ether')}))}>Tip</button>
                                </div>
                        }
                    </div>
            }
        </main>
    );
}

export default Post;
