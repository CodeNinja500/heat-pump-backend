import express from 'express';
import cors from 'cors';
import { DataService } from './services/buffer.service';
import { createModbusRouter } from './routes/dataRoutes';
import { initializeDatabase } from './database';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// CORS
app.use(
  cors({
    origin: ['http://localhost:4200', 'http://192.168.0.9'] // Replace with your Angular app's domain
  })
);

// Initialize database
const db = initializeDatabase();

//Initialize DataService
const dataService = new DataService();
dataService.start(5000, 48 * 60 * 60 * 1000); // read every 5s, flush every 48h

// Mount the modbus routes
app.use('/api', createModbusRouter(dataService));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
