import react, {useState} from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import CleanCSVComponent from "./CleanCSVComponent";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    console.log('test', reader);
    reader.addEventListener('load', () => callback(reader.result));
    const text = reader.readAsText(img);
    console.log(text);
};

const beforeUpload = (file) => {
    const isCSV = file.type === 'text/csv';
    if (!isCSV) {
        message.error('You can only upload csv file!');
    }

    return isCSV;
};

const UploadComponent = (onChange) => {
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
            // Get value from info
            console.log(info.file);

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
                Import csv Vrzen
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