import React, { useState } from "react";

function Slider(props){

    const [slideVal, setSlideVal] = useState("8");
    const [width, setWidth] = useState("14%");

    function showVal(e){
        const newVal= e.target.value;
        setSlideVal(newVal);
        const newWidth = newVal<14 ? 14 + (newVal-8)*4 : 11 + (newVal-8)*4;
        setWidth(newWidth.toString() + "%");
        props.onSlide(newVal);
    }

    return ( 
        <div className="slider">
            <p>Password length: {slideVal}</p>
            <span className="slider-div">
                <input type="range" min="5" max="30" defaultValue={slideVal} onChange={showVal}/>
                <div className="progress-track" style={{width}}></div>
            </span>
        </div>
    )
}

export default Slider;