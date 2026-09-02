import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Primary API Gateway (Node.js + Express.js)
 * Express application entry point
 */
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'SatQuery AI Express API Gateway' });
});

app.listen(PORT, () => {
  console.log(`Express Server running on port ${PORT}`);
});
