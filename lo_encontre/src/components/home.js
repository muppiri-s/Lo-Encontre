import React, { useState } from 'react';

const Home = () => {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    const getResult = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://loencontre-kzki.onrender.com/api/category/search?key=${search}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        let data = await response.json();
        data = JSON.parse(data.msg);
        data = data.amazon

        let temp = []
        for (const row in data) {
            temp.push(data[row])
        }
        setResult(temp);
    }

    return (
        <div className='container'>
            <form action="/" method="get" className='sub_form'>
                <h2>Search for discounted items</h2>
                <input className='search_bar'
                    type="text"
                    id="search"
                    placeholder="Search Products" value={search} onChange={e => setSearch(e.target.value)}
                /><br />

                <button type="submit" className='btn' onClick={getResult}>Search</button>

                <div className="result-container">
                    {result.map((row, index) => (
                        <div className="item-wrapper">
                            <div className="item-name" key={index}>{row.item_name}</div>
                            <div className="item-rating">Rating: {row.item_rating}</div>
                            <div className="item-price">Price: {row.item_price}</div>
                            <div className="item-link"><a href={row.item_link}>View Product</a></div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default Home;