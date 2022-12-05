import React from "react";
import banner from "./images/banner.jfif"

const Banner = () => {
    return(
        <div>
            <img src={banner} alt="banner" className="banner"></img>
        </div>
    );
};

export default Banner;