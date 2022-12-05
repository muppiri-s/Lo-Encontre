import React from "react";
import { useEffect, useState } from "react";

function Kohls() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = () => {
            return fetch('https://kohls.p.rapidapi.com/categories/list', {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': 'bffe5e5627msh1a6c3bf3dbaf7e8p1ac432jsne6b3740a05a8',
                    'X-RapidAPI-Host': 'kohls.p.rapidapi.com'
                }
            })
                .then(data => {
                    return data.json()
                })
                .then(details => {
                    setUsers(details)
                })
        }
        fetchData();
    }, []);

    return (
        <div>
            {users.length > 0 && (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Kohls;