import React, { useState } from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await axios.post('http://localhost:5000/sendEmail', { email });
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        }
    };

    return (
        <div className='div'>
            <h2>Send Email</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        autocomplete="off"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>

    );
}

export default Home;
