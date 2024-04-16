import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FileUploadForm = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('excelFile', file);

        try {
            const response = await axios.post('http://localhost:5000/ExcelInsertion', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            // Optionally, you can show a success message or redirect to another page upon successful upload
        } catch (error) {
            console.error('Error uploading file:', error);
            // Optionally, you can show an error message to the user
        }
    };

    return (
        <div className="container">
            <h1>Upload Excel File</h1>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="file"
                        className="form-control"
                        id="excelFile"
                        accept=".xls,.xlsx"
                        onChange={handleFileChange}
                    />
                    <Button type="submit" variant="outline-secondary">Upload</Button>
                </InputGroup>
            </Form>
        </div>
    );
}

export default FileUploadForm;
