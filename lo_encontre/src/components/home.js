import * as React from 'react';
import Banner from './banner';
import Camel from './camel';

const Home = () => {
    return (
        <div>
            <Banner />
            <Camel />
            <form action="/" method="get" className='sub_form'>
                <h2>Search for discounted items</h2>
                <input className='search_bar'
                    type="text"
                    id="search"
                    placeholder="Search Products"
                />
                <button type="submit" className='btn'>Search</button>
            </form>
        </div>
    );
};

export default Home;