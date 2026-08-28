import { Router } from 'express';
import type { Request, Response } from 'express';
import appEventEmitter from "../events/search.events";
import { jobs } from './search.routes';

const router = Router();

router.get("/:jobId", (req: Request, res: Response) => {

   const { jobId } = req.params;
   const job = jobs.get(jobId);

   if (!job) {
       return res.status(404).json({ error: "Job not found" });
   } 

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Flush the headers to establish the SSE connection

    console.log(`[SSE] Client connected for jobId: ${jobId}`);

    //Helper function to send events to the client
    const sendSseEvent = (eventName: string, data: any) => {
        res.write(`event: ${eventName}\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    //define event Handlers
    const onResultFound = (eventData: { jobId: string; result: any }) => {
        if (eventData.jobId === jobId) {
            console.log(`[SSE] Sending result for jobId: ${jobId}`);
            sendSseEvent('result.found', eventData.result);
        }
    }

    const onSearchCompleted = (completedJob: any) => {
        if (completedJob.id === jobId) {
            console.log(`[SSE] Search completed for jobId: ${jobId}`);
            sendSseEvent('search.completed', {
                message: `Search complete. Found ${completedJob.results.length} items.`
            });
        }
    };

    // Register event handlers
    appEventEmitter.on('result.found', onResultFound);
    appEventEmitter.on('search.completed', onSearchCompleted);

    // Clean up event handlers when the client disconnects
    req.on('close', () => {
        console.log(`[SSE] Client disconnected for jobId: ${jobId}`);
        appEventEmitter.off('result.found', onResultFound);
        appEventEmitter.off('search.completed', onSearchCompleted);
    });

});

export default router;
    