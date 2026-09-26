const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        service: 'Portfolio Backend',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // In a real app, you would use Nodemailer here to send an email
    console.log('--- New Contact Form Submission ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('------------------------------------');

    // Simulate a delay like a real database/email service
    setTimeout(() => {
        res.status(200).json({ success: true, message: 'Message received. I will get back to you soon!' });
    }, 1000);
});

// Serve frontend for all other routes (SPA behavior)
// Serve frontend for all other routes (SPA behavior)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});