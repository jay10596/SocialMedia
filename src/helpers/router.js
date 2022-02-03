import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../components/pages/Home';
import Posts from '../components/pages/Posts';
import Post from '../components/pages/Post';
import About from '../components/pages/About';
import Error from '../components/pages/Error';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} exact />

            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<Post />} />

            <Route path="/about" element={<About />} />

            <Route path='*' element={<Error exact />} />
        </Routes>
    );
}

export default Router;
