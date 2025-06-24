import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './Config/db.js';
import cookieParser from 'cookie-parser';
import courseRoutes from './routes/course.routes.js';
import todoRoutes from './routes/todo.routes.js';


dotenv.config(); // Load environment variables

const app = express();

// Middleware
const allowedOrigins = ['https://skyfall-62c.vercel.app', 'http://localhost:5173'];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., server-to-server communication)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();



// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/todos', todoRoutes);
app.use('/', (req, res) => {
  res.send('Welcome to Najint API');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
