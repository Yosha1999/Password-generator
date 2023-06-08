import React, { useState } from "react";

function Checkbox(props){

    const initialState = [{name :"uppercase", label: "Uppercase", isChecked: false}, 
                            {name :"lowercase", label: "Lowercase", isChecked: true},
                            {name :"specialchar", label: "Special Characters", isChecked: false},
                            {name :"number", label: "Numbers", isChecked: true}];

    const [cbArray, setChecked] = useState(initialState);
    
    function handleCheck(e){
        const indexVal = e.target.attributes.index.value;
        const check= e.target.checked;

        const newData = 
            cbArray.map((item, index) => {
                if(index === indexVal){
                    return {...item, isChecked:check}
                }
                return item;
            });
            
        setChecked(newData);
        props.onCheck(e);
    }

    return (
        <div>
            {cbArray.map((item, index) => (
                <div className="checkbox-wrapper" key={index}>
                    <label htmlFor={item.name}>{item.label}</label>
                    <input 
                        type="checkbox" 
                        id={item.name} 
                        name={item.name} 
                        defaultChecked={item.isChecked} 
                        index={index}
                        onChange={handleCheck}
                    />
                </div>
            ))}  
        </div>
    )
}

export default Checkbox;