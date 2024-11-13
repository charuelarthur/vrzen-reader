import React, {useEffect, useState} from "react";
import {Button, Switch, Table} from 'antd';
import UploadComponent from "./UploadComponent";
import {LoadingOutlined, ImportOutlined, CopyOutlined} from "@ant-design/icons";
import CompletCSVComponent from "./CompletCSVComponent";


const CleanCSVComponent = (props) => {
    const [array, setArray] = useState([]);
    const [imported, setImported] = useState(false);
    const [checked, setChecked] = useState(false);

    const cleanCSV = () => {
        if (props.fileResult) {
            const file = props.fileResult;
            let arrayTmp = [];
            let array = [];
            let tmpTWA = -1;
            let tmpVoile = "";

            const csvRows = file.slice(file.indexOf("\n") + 1).split("\n");
            for (let i = 0; i < csvRows.length; i++) {
                arrayTmp[i] = csvRows[i].split(";");
                arrayTmp[i].splice(16, 7);
                arrayTmp[i].splice(13, 2);
                arrayTmp[i].splice(7, 1);
                arrayTmp[i].splice(2, 3);
                arrayTmp[i].splice(0, 1);


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
        //log nameFile
    }, [props.fileResult]);

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
            dataIndex: '2',
            render(text, record) {
                const previousRecord = array[array.indexOf(record) - 1];
                if (previousRecord) {
                    return {
                        props: {
                            style: { background: (text/(-Math.abs(text))) !== (previousRecord[2]/(-Math.abs(previousRecord[2]))) ? '#e06666' : '' },
                        },
                        children: <div>{text}</div>,
                    };
                } else {
                    return {
                        props: {
                            style: { background: '' },
                        },
                        children: <div>{text}</div>,
                    };
                }
            },
        },
        {
            title: 'DownVMG',
            dataIndex: '3'
        },
        {
            title: 'UpVMG',
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
            dataIndex: '8',
            render(text, record) {
                const previousRecord = array[array.indexOf(record) - 1];
                if (previousRecord) {
                    return {
                        props: {
                            style: { background: text !== previousRecord[8] ? '#e06666' : '' },
                        },
                        children: <div>{text}</div>,
                    };
                } else {
                    return {
                        props: {
                            style: { background: '#ffffff' },
                        },
                        children: <div>{text}</div>,
                    };
                }
            },
        },
        {
            title: 'EffetBoost',
            dataIndex: '9',
            render(text, record) {
                return {
                    props: {
                        style: { background: parseInt(text) > 0 ? '#fce5cd' : '' },
                    },
                    children: <div>{text}</div>,
                };
            },
        },
        {
            title: 'Energie',
            dataIndex: '10',
            render(text, record) {
                return {
                    props: {
                        style: { background: parseInt(text) > 80 ? '#46ff00' : parseInt(text) > 60 ? '#cdff00' : parseInt(text) > 40 ? '#ffed00' : parseInt(text) > 20 ? '#ff7d00' : '#ff0000' },
                    },
                    children: <div>{text}</div>,
                };
            },
        }
    ];

    let onChange = () => {
        setChecked(!checked)
    };

   const onImport = () => {
        setImported(true);
   };

   const copyCSV = () => {
       navigator.clipboard.writeText(props.fileResult).then(r => console.log(r));
   }

    return (
        <div>
            {(checked) ? ( <CompletCSVComponent {...props} /> ) : (
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
                    <h3>{props.nameFile}</h3>
                    <div>
                        <Button type="primary" shape="round" icon={<CopyOutlined />} size={'medium'} onClick={copyCSV} style={{marginRight:"10px"}}>
                            Copier CSV
                        </Button>
                        <Button type="primary" shape="round" icon={<ImportOutlined />} size={'medium'} onClick={onImport}>
                            Nouvel import
                        </Button>
                    </div>
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