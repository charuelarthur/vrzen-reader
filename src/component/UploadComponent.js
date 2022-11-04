import {useState} from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import CleanCSVComponent from "./CleanCSVComponent";

const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsText(file);
};

const beforeUpload = (file) => {
    const isCSV = file.type === 'text/csv';
    if (!isCSV) {
        message.error('You can only upload csv file!');
    }

    return isCSV;
};

const UploadComponent = () => {
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);

    const handleChange = (info) => {

            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setFile(url);
            });

    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Import csv VRZEN
            </div>
        </div>
    );

    return (
        <div>
        {file ? (
                <CleanCSVComponent file={file} />
            ) : (
        <Upload
            accept={".csv"}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={(e) => {
                handleChange(e);
            }}

        >
            {uploadButton}
        </Upload>
)}
        </div>
    );
};

export default UploadComponent;