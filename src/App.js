import './App.css';
import React from "react";
import UploadComponent from "./component/UploadComponent";
import { inject } from '@vercel/analytics';
import {SpeedInsights} from "@vercel/speed-insights/react";

function App() {
    inject();
    return (
        <div style={{ textAlign: "center" }}>
            <h1>VRZEN READER</h1>
            <br />
            <UploadComponent />
            <SpeedInsights />
        </div>
    );
}

export default App;
