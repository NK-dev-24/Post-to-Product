import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// In-memory user storage (use a database in production)
const users = [];

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  const existingUser = users.find(user => user.username === username);
  if (existingUser) return res.status(400).json({ error: 'Username already exists' });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: { username } });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (!user) return res.status(400).json({ error: 'User not found' });

  // Compare passwords
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ username }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: '1h' });
    res.json({ token });
  });
});

export default router;
