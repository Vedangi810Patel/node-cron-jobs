import React, { useState } from 'react';
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
        <div>
            <h2>Send Email</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
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
