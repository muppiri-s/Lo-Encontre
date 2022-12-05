import React from "react";
import Sahithi from "./images/sahithi.jpg"
import Rushitha from "./images/Rushitha.jpeg"
import Notification from './notification';

function About() {
    return (
        <div>
            <div className="about">
                <h2>
                    Hey there!
                </h2>
                <h3>Sahithi</h3>
                <img src={Sahithi} alt="user1"></img>
                <h3>Rushitaa</h3>
                <img src={Rushitha} alt="user2"></img>
            </div>
            <Notification />
        </div>
    );
}

export default About;