const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken'); // For authentication (replace with your implementation)
const bcrypt = require('bcrypt'); // For password hashing (replace with your implementation)

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;
const secret = 'your_secret_key'; // Replace with a strong secret key for JWTs

app.use(bodyParser.json()); // Parse JSON request bodies

// Implement user authentication and authorization logic
// (Replace these placeholders with your actual implementation)
let users = []; // Placeholder for user data (replace with database storage)

function generateAccessToken(userId) {
  return jwt.sign({ userId }, secret, { expiresIn: '1h' }); // Replace with appropriate expiration time
}

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password securely
  const user = { id: users.length + 1, email, password: hashedPassword };
  users.push(user); // Replace with database insert logic
  return user;
}

async function findByEmail(email) {
  return users.find((user) => user.email === email); // Replace with database lookup
}

function isAuthorized(req) {
  const token = req.headers.authorization?.split(' ')[1]; // Extract JWT token
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, secret);
    return !!decoded.userId; // Check if a valid user ID is present
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return false;
  }
}

// API Endpoints

// User Login (replace with actual login form handling)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) { // Compare hashed password
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateAccessToken(user.id);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API Endpoints for Tools (require authentication)

// Get all tools (with optional filtering and sorting)
app.get('/api/tools', async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { category, sort } = req.query; // Allow optional query parameters for filtering and sorting

    let filter = {};
    if (category) {
      filter.category = category;
    }

    let orderBy = { id: 'asc' }; // Default sorting by ID
    if (sort === 'name') {
      orderBy = { name: 'asc' };
    } else if (sort === '-name') {
      orderBy = { name: 'desc' };
    }

    const tools = await prisma.tool.findMany({
      where: filter,
      orderBy,
    });
    res.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a tool by ID
app.get('/api/tools/:id', async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const id = parseInt(req.params.id); // Ensure ID is an integer

    const tool = await prisma.tool.findUnique({
      where: { id },
    });

    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    
