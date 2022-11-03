import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

function App() {
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
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

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                cleanCSV(text);
            };

            fileReader.readAsText(file);
        }
    };

    const columns = [
        {
            title: 'DateHeure',
            dataIndex: '0'
        },
        {
            title: 'HDG',
            dataIndex: '1'
        },
        {
            title: 'TWA',
            dataIndex: '2'
        },
        {
            title: 'UpVMG',
            dataIndex: '3'
        },
        {
            title: 'DownVMG',
            dataIndex: '4'
        },
        {
            title: 'SPEED(kt)',
            dataIndex: '5'
        },
        {
            title: 'TWD',
            dataIndex: '6'
        },
        {
            title: 'TWS(kt)',
            dataIndex: '7'
        },
        {
            title: 'Voile',
            dataIndex: '8'
        },
        {
            title: 'EffetBoost',
            dataIndex: '9'
        },
        {
            title: 'Energie',
            dataIndex: '10'
        }
    ];

    return (
        <div style={{ textAlign: "center" }}>
            <h1>VRZEN READER</h1>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />

                <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                >
                    IMPORT CSV
                </button>
            </form>

            <br />

            <Table columns={columns} dataSource={array} />

        </div>
    );
}

export default App;
