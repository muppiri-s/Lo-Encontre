import React from "react";
import camel from "./images/camel.jpg"

function Camel() {
    return (
        <div className="camel_site">
            <h3>Camelcamelcamel</h3>
            <p>Camelcamelcamel is a website that tracks prices of products sold on Amazon.</p>
            <a href="https://camelcamelcamel.com/">
                <img src={camel} alt="camel_site"></img>
            </a>
            <p>Click on the camel to navigate to the site and track the prices.</p>
        </div>
    );
}

export default Camel;