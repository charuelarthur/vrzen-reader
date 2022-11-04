import React, {useEffect, useState} from "react";
import {Button, Space, Switch, Table, Tag} from 'antd';
import UploadComponent from "./UploadComponent";
import {LoadingOutlined, ImportOutlined} from "@ant-design/icons";
import CleanCSVComponent from "./CleanCSVComponent";

const { Column, ColumnGroup } = Table;

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
            dataIndex: '6'
        },
        {
            title: 'UpVMG',
            dataIndex: '7'
        },
        {
            title: 'DownVMG',
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
            dataIndex: '14'
        },
        {
            title: 'EffetBoost',
            dataIndex: '15'
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
            dataIndex: '23'
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