import * as React from 'react';
import Notification from './notification';
import Banner from './banner';

const Home = () => {
    return (
        <div>
            <Banner />
            <form action="/" method="get" className='sub_form'>
                <h2>Search for discounted items</h2>
                <input className='search_bar'
                    type="text"
                    id="search"
                    placeholder="Search Products"
                />
                <button type="submit" className='btn'>Search</button>
            </form>
            <Notification />
        </div>
    );
};

export default Home;