import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SectionHeader from '../reusables/SectionHeader';

function PostList() {
    const socialMedia = useSelector((state) => state.socialMedia.value)

    return (
        <section>
            <SectionHeader heading="Featured Posts (Tip Post on post detail page)" />

            {socialMedia.posts.map((post, key) => {
                return (
                    <Link to={`/posts/${post.id}`} key={key}>
                        <div>
                            {post.id}) {post.content} - {post.author} - {window.web3.utils.fromWei(post.tip.toString(), 'Ether')} ETH


                            {post.mediaHash.length > 0 
                                ? <img src={`https://ipfs.infura.io/ipfs/${post.mediaHash}`} alt={post.mediaHash} />
                                : null
                            }

                        </div>
                    </Link>
                )
            })}
        </section>
    );
}

export default PostList;