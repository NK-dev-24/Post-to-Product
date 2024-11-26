import express from 'express';
import connectDB from './db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './model/routes/authRoutes.js';
import Log from './model/log.js';
import authenticateToken from './model/authenticate.js';

// Initialize Express
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use the authentication routes
app.use('/api', authRoutes);

// Add a log
app.post('/api/logs', authenticateToken, async (req, res) => {
  const { message, level } = req.body;
  
  if (!message || !level) {
    return res.status(400).json({ error: "Message and level are required" });
  }

  try {
    const log = new Log({ message, level, user: req.user.username });
    const savedLog = await log.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add log', details: error.message });
  }
});

app.get('/api/logs', authenticateToken, async (req, res) => {
  try {
    console.log("Authenticated user:", req.user); // Verify decoded user
    const logs = await Log.find({ user: req.user.username });

    if (!logs.length) {
      console.log("No logs found for user:", req.user.username);
      return res.status(404).json({ message: "No logs found" });
    }

    console.log("Logs found:", logs); // Verify fetched logs
    res.json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error.message);
    res.status(500).json({ error: 'Failed to fetch logs', details: error.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
