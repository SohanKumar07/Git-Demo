const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files (CSS, JS, Images, etc.)
app.use(express.static(path.join(__dirname, '../')));

// Route for rendering index.html
app.get('/', (req, res) => {
  res.redirect('/');
});

app.get('/about', (req, res) => {
  res.redirect('/about');
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../contact.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, '../services.html'));
});

app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, '../portfolio.html'));
});



// Example API route
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: "Sohan Singh", role: "Full Stack Developer" },
    { id: 2, name: "Guest User", role: "Visitor" }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
