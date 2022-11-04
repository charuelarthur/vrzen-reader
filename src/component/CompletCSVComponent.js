import React, {useEffect, useState} from "react";
import {Button, Switch, Table} from 'antd';
import UploadComponent from "./UploadComponent";
import {LoadingOutlined, ImportOutlined} from "@ant-design/icons";
import CleanCSVComponent from "./CleanCSVComponent";


const CompletCSVComponent = (res) => {
    const [array, setArray] = useState([]);
    const [imported, setImported] = useState(false);
    const [checked, setChecked] = useState(false);

    const loadCSV = () => {
        if (res) {
            const file = res.file;
            let arrayTmp = [];
            let array = [];

            const csvRows = file.slice(file.indexOf("\n") + 1).split("\n");
            for (let i = 0; i < csvRows.length; i++) {
                arrayTmp[i] = csvRows[i].split(";");
                array.push(arrayTmp[i]);
            }

            setArray(array);
        }
    }

    useEffect(() => {
            loadCSV();
        }
        , [res]);

    const columns = [
        {
            title: 'DateHeureUTC',
            dataIndex: '0'
        },
        {
            title: 'DateHeure',
            dataIndex: '1'
        },
        {
            title: 'TTW',
            dataIndex: '2'
        },
        {
            title: 'Latitude',
            dataIndex: '3'
        },
        {
            title: 'Longitude',
            dataIndex: '4'
        },
        {
            title: 'HDG',
            dataIndex: '5'
        },
        {
            title: 'TWA',
            dataIndex: '6',
            render(text, record) {
                const previousRecord = array[array.indexOf(record) - 1];
                if (previousRecord) {
                    return {
                        props: {
                            style: { background: (text/(-Math.abs(text))) !== (previousRecord[6]/(-Math.abs(previousRecord[6]))) ? '#e06666' : '#ffffff' },
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
            title: 'DownVMG',
            dataIndex: '7'
        },
        {
            title: 'UpVMG',
            dataIndex: '8'
        },
        {
            title: 'SPEED(kt)',
            dataIndex: '9'
        },
        {
            title: 'TWD',
            dataIndex: '10'
        },
        {
            title: 'TWS(kt)',
            dataIndex: '11'
        },
        {
            title: 'DTG(nm)',
            dataIndex: '12'
        },
        {
            title: 'DTF(nm)',
            dataIndex: '13'
        },
        {
            title: 'Voile',
            dataIndex: '14',
            render(text, record) {
                const previousRecord = array[array.indexOf(record) - 1];
                if (previousRecord) {
                    return {
                        props: {
                            style: { background: text !== previousRecord[14] ? '#e06666' : '#ffffff' },
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
            dataIndex: '15',
            render(text, record) {
                return {
                    props: {
                        style: { background: parseInt(text) > 0 ? '#fce5cd' : '#ffffff' },
                    },
                    children: <div>{text}</div>,
                };
            },
        },
        {
            title: 'DureeChangementVoile',
            dataIndex: '16'
        },
        {
            title: 'RatioChangementVoile',
            dataIndex: '17'
        },
        {
            title: 'DureeChangementAmure',
            dataIndex: '18'
        },
        {
            title: 'RatioChangementAmure',
            dataIndex: '19'
        },
        {
            title: 'CoeffDuree',
            dataIndex: '20'
        },
        {
            title: 'PerteEnergie',
            dataIndex: '21'
        },
        {
            title: 'GainEnergie',
            dataIndex: '22'
        },
        {
            title: 'Energie',
            dataIndex: '23',
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
        setChecked(!checked);
    };

    const onImport = () => {
        setImported(true);
    }

    return (
        <div>
            {(checked) ? ( <CleanCSVComponent file={res.file} /> ) : (
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
                            <Switch defaultUnChecked onChange={onChange} checkedChildren="Simplifié" unCheckedChildren="Complet"/>
                            <Button type="primary" shape="round" icon={<ImportOutlined />} size={'medium'} onClick={onImport}>
                                Nouvel import
                            </Button>
                        </div>
                        <Table dataSource={array} columns={columns} pagination={{ pageSize: 8 }} scroll={{ x: 2500}}/>
                    </div>
                ) : (
                    <LoadingOutlined />
                )
            ))}
        </div>
    );
}

export default CompletCSVComponent;