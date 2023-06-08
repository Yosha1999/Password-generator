import React, { useState } from "react";
import Checkbox from "./Checkbox";
import Slider from "./Slider";
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function Password(){
    
    const [passLen, setLen] = useState(8);
    const [cbArgs, setCb] = useState(['lowercase', 'number']);
    const [pwd, setPwd] = useState(getRandom(passLen, cbArgs));
    const [isCopied, setCopied] = useState(false);
    const [color, setColor] = useState("red");
    const [strength, setStrength] = useState("Weak");
    const [slideVal, setSlideVal] = useState(8);

    function getRandom(length, ...args){
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const number = '0123456789';
        const specialchar = '!@#$%^&*()';

        var initial = '';

        args[0].forEach(val => {
            if(val === "uppercase"){
                initial += uppercase;
            } else if(val === "lowercase"){
                initial += lowercase;
            } else if(val === "number"){
                initial += number;
            } else if(val === "specialchar"){
                initial += specialchar;
            }
        });
        
        const charLength = initial.length;
        var result = '';

        for(var i=0; i<length; i++){
            result += initial.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }


    function refresh(){
        const newPass = getRandom(passLen, cbArgs);
        setPwd(newPass);

        const cblen = cbArgs.length;
        if(slideVal < 8){
            setStrength("Too short");
            setColor("red");
        } else if(slideVal >= 8 && slideVal <12){
            if(cblen <= 2){
                setStrength("Weak");
            } else {
                setStrength("Medium");
                setColor("#fecf01");
            } 
        } else {
            if(cblen == 3){
                setStrength("Medium");
                setColor("#fecf01");
            } else if(cblen == 4){
                setStrength("Strong");
                setColor("green");
            }
        }
    }

    function checkboxCheck(e){
        const {name, checked} = e.target;
        if(!cbArgs.includes(name)){
            if(checked){
                cbArgs.push(name);
            }
        } else {
            if(!checked){
                const newArray = cbArgs.filter(item => item !== name);
                setCb(newArray);
            }
        }
    }

    function getVal(newVal){
        setLen(newVal);
        setSlideVal(newVal);
    }

    async function copyToClipboard(text){
        if( 'clipboard' in navigator){
            return navigator.clipboard.writeText(text);
        } 
    }

    function copyClick(){
        const text = pwd;
        copyToClipboard(text).then(() =>{
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch(err => console.log(err));
    }

    return (
        <span>
            <div className="password-wrapper">
                <form spellCheck="false">
                    <input type="text" autoComplete="off" autoCapitalize="off" autoCorrect="off" value={pwd} readOnly/>
                    <RefreshIcon onClick={refresh}/>
                </form>
                <button onClick={copyClick}>
                    {!isCopied && <ContentCopyIcon />}
                    &nbsp;{isCopied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <p className="strength" style={{color}}>{strength}</p>

            <Slider  onSlide={getVal}/>
            <Checkbox  onCheck={checkboxCheck}/>
        </span>
    )
}

export default Password;