import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { Space, Table, Tag, Button } from 'antd';
import UploadComponent from "./component/UploadComponent";
const { Column, ColumnGroup } = Table;


function App() {
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        console.log(e);
        setFile(e.target.files[0]);
    };

    const cleanCSV = string => {
        let arrayTmp = [];
        let array = [];
        let tmpTWA = -1;
        let tmpVoile = "";

        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        for (let i = 0; i < csvRows.length; i++) {
            arrayTmp[i] = csvRows[i].split(";");
            arrayTmp[i].splice(16, 7); // delete column UTC
            arrayTmp[i].splice(12, 2); // delete column Date
            arrayTmp[i].splice(2, 3); // delete column Time
            arrayTmp[i].splice(0, 1); // delete column No


            if ((arrayTmp[i][2] !== tmpTWA) || (arrayTmp[i][9] !== "") || (arrayTmp[i][8] !== tmpVoile)) {
                tmpTWA = arrayTmp[i][2];
                tmpVoile = arrayTmp[i][8];
                array.push(arrayTmp[i]);
            }
        }

        setArray(array);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                cleanCSV(text);
            };

            fileReader.readAsText(file);
        }
    };



    return (
        <div style={{ textAlign: "center" }}>
            <h1>VRZEN READER</h1>
            <br />
            <UploadComponent />
        </div>
    );
}

export default App;
