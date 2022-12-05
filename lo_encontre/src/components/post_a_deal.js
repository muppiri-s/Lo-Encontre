import React from "react";
import { useState } from "react";

import LocationInfo from "./multistep-form/first";
import OtherInfo from "./multistep-form/second";
import PersonalInfo from "./multistep-form/third";
import SignUp from "./multistep-form/signup";

function PostaDeal() {
    const [page, setPage] = useState(0);

    const [x, setX] = useState(0);

    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        password: "",
        nickname: "",
        email: "",
        address: "",
        nationality: "",
        zipcode: "",
        highestQualification: "",
        occupation: "",
        about: "",
    });

    const componentList = [
        <SignUp
        formData={formData}
        setFormData={setFormData}
        page={page}
        setPage={setPage}
        x={x}
        setX={setX}
      />,
        <PersonalInfo
            formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            x={x}
            setX={setX}
        />,
        <LocationInfo
            formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            x={x}
            setX={setX}
        />,
        <OtherInfo
            formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            x={x}
            setX={setX}
        />,
    ];

    return (
        <div>
            <div className="progress-bar">
                {
                    <div style={{ width: page === 0 ? "25%" : page === 1 ? "50%" : page === 2 ? "75%" : "100%", }}></div>
                }
            </div>
            <div className="body">{componentList[page]}</div>
        </div>
    );
}

export default PostaDeal;