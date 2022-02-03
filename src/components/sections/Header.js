import React from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../helpers/reducers/Theme'
import { Link } from 'react-router-dom';

const Header = (props) => {
    const dispatch = useDispatch()

    return (
        <header>
            {props.account}
            <Link to="/posts">Posts</Link>
            <Link to="/about">About</Link>

            <button onClick={() => dispatch(setTheme({color: props.themeColor === 'light' ? 'dark' : 'light'}))}>
                {props.themeColor}
            </button>
        </header>
    );
}

export default Header;