import React, {useEffect, useState} from "react";
import {Button, Space, Switch, Table, Tag} from 'antd';
import UploadComponent from "./UploadComponent";
import {LoadingOutlined, ImportOutlined} from "@ant-design/icons";
import CompletCSVComponent from "./CompletCSVComponent";

const { Column, ColumnGroup } = Table;

const CleanCSVComponent = (res) => {
    const [array, setArray] = useState([]);
    const [imported, setImported] = useState(false);
    const [checked, setChecked] = useState(false);

    const cleanCSV = () => {
        if (res) {
            const file = res.file;
            let arrayTmp = [];
            let array = [];
            let tmpTWA = -1;
            let tmpVoile = "";
            console.log(res.file);

            const csvRows = file.slice(file.indexOf("\n") + 1).split("\n");
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
    }

    useEffect(() => {
        cleanCSV();
    }
    , [res]);

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

    let onChange = () => {
        setChecked(!checked)
    };

   const onImport = () => {
        setImported(true);
    }

    return (
        <div>
            {(checked) ? ( <CompletCSVComponent file={res.file} /> ) : (
             (imported) ? ( <UploadComponent/> ) : (
            ( array.length > 0 ) ? (
            <div>
                <div style={
                    {
                        margin: "10px",
                        display: "flex",
                        justifyContent: "space-between"
                    }
                }>
                    <Switch defaultChecked onChange={onChange} checkedChildren="Simplifié" unCheckedChildren="Complet"/>
                    <Button type="primary" shape="round" icon={<ImportOutlined />} size={'medium'} onClick={onImport}>
                        Nouvel import
                    </Button>
                </div>
                <Table dataSource={array} columns={columns} />
            </div>
            ) : (
                <LoadingOutlined />
            )
            ))}
        </div>
    );
}

export default CleanCSVComponent;