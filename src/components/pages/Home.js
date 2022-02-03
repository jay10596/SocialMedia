import React from 'react';

import Banner from '../sections/Banner';
import PostForm from '../sections/PostForm';
import PostList from '../sections/PostList';

function Home() {
    return (
        <main>
            <Banner />

            <PostForm />

            <PostList />
        </main>
    );
}

export default Home;