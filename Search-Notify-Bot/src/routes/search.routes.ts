import { Router } from 'express';
import type { Request, Response } from 'express';
import type { SearchJob, SearchRequest } from "../types/search.types";
import { searchService } from "../services/search.service"; // <-- Corrected import (instance, not class)
import crypto from "crypto";

const router = Router();

// This map will act as our in-memory database for jobs.
// It's exported so other modules, like the service, can access it.
export const jobs: Map<string, SearchJob> = new Map();

/**
 * @route   POST /api/search
 * @desc    Creates and initiates a new search job.
 * @access  Public
 */
router.post("/", (req: Request, res: Response) => { // <-- Corrected path to "/"

    // 1. Validate the request body
    const { query }: SearchRequest = req.body;
    if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "A non-empty query string is required" });
    }

    // 2. Create a new search job
    const newJob: SearchJob = {
        id: crypto.randomUUID(),
        query,
        status: "pending",
        results: [],
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // 3. Store the job in the map
    jobs.set(newJob.id, newJob);

    // 4. Start the search asynchronously by calling the service
    searchService.performSearch(newJob); // <-- Corrected: Pass the full job object

    // 5. Respond that the job has been accepted for processing
    return res.status(202).json({ // <-- Corrected: Use 202 for async processing
        jobId: newJob.id,
        message: "Search job accepted successfully"
    });
});

export default router;
