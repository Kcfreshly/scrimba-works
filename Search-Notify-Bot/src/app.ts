// src/app.ts

import express from 'express';
import path from 'path'; // Import the 'path' module
import { fileURLToPath } from 'url';
import searchRoutes from './routes/search.routes';
import eventsRoutes from './routes/events.routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- Middleware ---

// Middleware to parse JSON bodies
app.use(express.json());

// *** ADD THIS LINE ***
// Middleware to serve static files from the 'public' directory
// path.join(__dirname, '../public') creates the correct absolute path.
app.use(express.static(path.join(__dirname, 'public')));
// *******************

// --- API Routes ---

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/search', searchRoutes);
app.use('/api/events', eventsRoutes);

export default app;
