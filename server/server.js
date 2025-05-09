import cookieParser from 'cookie-parser'; 
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware configuration
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Database connection and server startup
async function startServer() {
  try {
    await connectDB();
    console.log('Database connected successfully');
    
    // Routes
    app.get('/', (req, res) => res.send("API is working"));
    app.use('/api/user', userRouter);
    
    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
    
    // Start server
    const server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    
    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the application
startServer();