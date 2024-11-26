import jwt from 'jsonwebtoken';

// Middleware to authenticate user using JWT
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNzMyNjE2MDcwLCJleHAiOjE3MzI2MTk2NzB9.sAfFCK9V1VI8HHI6mt4sU7BHscT_RgV9RWX6l_JTkTA");
    req.user = decoded; // Attach user data to the request
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export default authenticateToken;
