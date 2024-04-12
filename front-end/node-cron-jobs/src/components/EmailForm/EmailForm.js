import React, { useState } from 'react';
import './EmailForm.css';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [image, setImage] = useState(null);
  const [excel, setExcel] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('image', image);
    formData.append('excel', excel);
    formData.append('pdf', pdf);

    try {
      await axios.post('http://localhost:5000/SendEmailForm', formData);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again later.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024 && ['image/jpeg', 'image/png'].includes(file.type)) {
      setImage(file);
    } else {
      alert('Please select an image file less than 2MB in size (JPG or PNG format).');
    }
  };

  const handleExcelChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size >= 5 * 1024 * 1024 && file.size <= 6 * 1024 * 1024 && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setExcel(file);
    } else {
      alert('Please select an Excel file between 5-6MB in size.');
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size >= 2 * 1024 * 1024 && file.size <= 6 * 1024 * 1024 && file.type === 'application/pdf') {
      setPdf(file);
    } else {
      alert('Please select a PDF file between 5-6MB in size.');
    }
  };

  return (
    <div className="email-form-container">
      <h1>Email Portal</h1>
      <form onSubmit={handleSubmit} className="email-form">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" autocomplete="off" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" autocomplete="off" className="form-control" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input type="file" className="form-control-file" id="image" onChange={handleImageChange} />
        </div>
        <div className="form-group">
          <label htmlFor="excel">Upload Excel</label>
          <input type="file" className="form-control-file" id="excel" onChange={handleExcelChange} />
        </div>
        <div className="form-group">
          <label htmlFor="pdf">Upload PDF</label>
          <input type="file" className="form-control-file" id="pdf" onChange={handlePdfChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>

  );
};

export default EmailForm;