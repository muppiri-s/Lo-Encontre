import * as React from 'react';
import Notification from './notification';

const Home = () => {
    return (
        <div>
            <form action="/" method="get">
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search for discounted items</span>
                </label><br />
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search blog posts"
                    name="s"
                />
                <button type="submit">Search</button>
            </form>
            <Notification />
        </div>
    );
};

export default Home;