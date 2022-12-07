import React from "react";
import Notification from './notification';

function About() {
    return (
        <div className="container">
            <div className="about">
                <h2>
                    Hey there!
                </h2>
                <p className="para">
                    Take advantage of our application to find the best deals in the town.
                    <br /> The app is designed to extract data from huge E-Commerce websites like Amazon. <br/>
                    The application uses a filter to get products at a discouted prices from these websites. You can also 
                    post any item that you want to sell using this website. <br /><br />
                    <span>Happy Browsing!</span>
                </p>
                <hr/>
                <h2>Contact us:</h2>
                <h3>Sahithi Muppiri</h3>
                <p> Email: mupps02@pfw.edu</p>
                <h3>Rushitaa</h3>
                <p> Email: drush01@pfw.edu</p>
            </div>
            <Notification />
        </div>
    );
}

export default About;