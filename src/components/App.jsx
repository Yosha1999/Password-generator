import React from "react";
import Header from "./Header";
import Password from "./Password";
import Slider from "./Slider";
import Checkbox from "./Checkbox";
import Footer from "./Footer";

function App(){
    return (
        <div>
            <div className="main-div">
                <Header />
                <Password />
            </div>
            <Footer />
        </div>
        
    )
}

export default App;