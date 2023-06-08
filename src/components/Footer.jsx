import React from "react";

function Footer(){
    const year = new Date().getFullYear();
    return (
        <footer>
            <p>Created with ♥ by Yosha</p>
            <p className="copyright">Copyright © {year}</p>
        </footer>
    )
}

export default Footer;