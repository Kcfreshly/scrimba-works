// src/services/search.service.ts

import type { SearchJob, SearchResult } from "../types/search.types";
import appEventEmitter from "../events/search.events";

// In-memory job store (imported from your route/controller)
// We need to import 'jobs' from where you defined it.
// Note: You might need to adjust this import path depending on your structure.
// If you used a controller, import from there.
import { jobs } from '../routes/search.routes';

// A mock database of articles to search through.
const mockArticleDatabase: SearchResult[] = [
    { title: "The Rise of AI Agents", url: "https://example.com/ai-agents", description: "An overview of autonomous AI agents." },
    { title: "Evaluating Large Language Models", url: "https://example.com/eval-llms", description: "How to benchmark and evaluate LLMs." },
    { title: "What is LangGraph?", url: "https://example.com/langgraph", description: "A deep dive into the LangGraph framework." },
    { title: "Vector Databases for AI", url: "https://example.com/vector-db", description: "Comparing different vector database technologies for AI applications." },
    { title: "The Future of AI in Software Development", url: "https://example.com/ai-dev", description: "Exploring how AI is changing the way we code." }
];

/**
 * Simulates a delay.
 * @param ms The number of milliseconds to wait.
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * This class encapsulates the logic for performing a search.
 */
class SearchService {
    /**
     * Executes the search logic for a given job.
     * This is an async method that simulates a long-running search process.
     * @param job The search job to execute.
     */
    public async performSearch(job: SearchJob): Promise<void> {
        console.log(`[SearchService] Starting search for job: ${job.id}`);
        
        // 1. Emit 'search.started' event and update job status
        job.status = 'searching';
        appEventEmitter.emit('search.started', job);

        await delay(10000); // Simulate initial work

        // 2. Simulate finding results one by one
        let resultsFound = 0;
        for (const article of mockArticleDatabase) {
            // A simple mock search: does the title or description contain a keyword?
            if (article.title.toLowerCase().includes(job.query.toLowerCase()) || article.description?.toLowerCase().includes(job.query.toLowerCase())) {
                resultsFound++;
                job.results.push(article);
                // Emit 'result.found' for each result
                appEventEmitter.emit('result.found', { jobId: job.id, result: article });
                await delay(800); // Simulate time between finding results
            }
        }

        // 3. Emit 'search.completed' event and finalize job status
        job.status = 'completed';
        job.updatedAt = new Date();
        appEventEmitter.emit('search.completed', job);
        
        console.log(`[SearchService] Completed search for job ${job.id}. Found ${resultsFound} results.`);
    }
}

// Export a singleton instance of the service
export const searchService = new SearchService();
