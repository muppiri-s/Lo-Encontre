import React from 'react'
import storeDetails from './storeDetails';

const Stores = () => {
    return (
        <ul>
            {storeDetails.map(store => {
                return (
                    <div className="card-container">
                        <img src={store.image} alt="store_name"></img>
                        <strong>{store.name}</strong>
                    </div>
                );
            })}
        </ul>
    );
};

export default Stores;