import React from "react";
//Custom components
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App(){
    return (
        <div>
            <Header />
            <Note />
            <Footer />
        </div>
    );
}

export default App;