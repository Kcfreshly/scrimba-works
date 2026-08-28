# Search & Notify Bot

A Node.js/TypeScript application that demonstrates asynchronous job processing with real-time streaming notifications via **Server-Sent Events (SSE)**.

Submit a search query through the web UI, and the server processes the job in the background while streaming each result back to the browser as it's found — no polling required.

## How It Works

1. The client submits a search query via `POST /api/search`
2. The server creates a job, stores it in memory, and immediately responds with a `jobId`
3. The client opens a persistent SSE connection to `GET /api/events/:jobId`
4. As the backend finds each result, it emits events over that connection in real time
5. When the search is complete, a final `search.completed` event closes the stream

```
Browser ──POST /api/search──► Server (creates job, starts async work)
        ◄── 202 { jobId } ───
        ──GET /api/events/:id► Server (SSE stream stays open)
        ◄── event: result.found (per result)
        ◄── event: search.completed (done)
```

## Project Structure

```
src/
├── server.ts              # Entry point — starts the HTTP server on port 3006
├── app.ts                 # Express app setup, middleware, and route mounting
├── routes/
│   ├── search.routes.ts   # POST /api/search — creates and enqueues search jobs
│   └── events.routes.ts   # GET /api/events/:jobId — SSE stream per job
├── services/
│   └── search.service.ts  # Async search logic; emits events as results are found
├── events/
│   └── search.events.ts   # Shared Node.js EventEmitter instance
├── types/
│   └── search.types.ts    # TypeScript interfaces: SearchJob, SearchResult, etc.
└── public/
    ├── index.html         # Web UI
    ├── main.js            # Frontend: fetch + EventSource wiring
    └── index.css
```

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Language | TypeScript 7 |
| Framework | Express 5 |
| Real-time | Server-Sent Events (SSE) |
| Internal pub/sub | Node.js `EventEmitter` |
| Dev server | `tsx watch` (no build step) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run (development)

```bash
npm run dev
```

The server starts on **http://localhost:3006**.

Open that URL in your browser to use the web UI, or hit the API directly.

## API Reference

### `POST /api/search`

Creates a new search job and starts processing it asynchronously.

**Request body:**
```json
{ "query": "agent" }
```

**Response `202 Accepted`:**
```json
{
  "jobId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Search job accepted successfully"
}
```

---

### `GET /api/events/:jobId`

Opens a Server-Sent Events stream for a job. Returns `404` if the job doesn't exist.

**Content-Type:** `text/event-stream`

**Events emitted:**

| Event name | Payload | Description |
|---|---|---|
| `result.found` | `{ title, url, description }` | Fired once per matching result |
| `search.completed` | `{ message }` | Fired when the search finishes |

**Example stream:**
```
event: result.found
data: {"title":"The Rise of AI Agents","url":"https://example.com/ai-agents","description":"..."}

event: result.found
data: {"title":"The Future of AI in Software Development","url":"https://example.com/ai-dev","description":"..."}

event: search.completed
data: {"message":"Search complete. Found 2 items."}
```

---

### `GET /api/health`

Returns `{ "status": "ok" }`. Useful for liveness checks.

## Job Lifecycle

```
pending → searching → completed
                    ↘ failed
```

Jobs are stored in an in-memory `Map` and are lost on server restart.

## Key Concepts

**Why SSE instead of WebSockets?**
SSE is unidirectional (server → client) and works over plain HTTP, making it a great fit for streaming job progress. No additional libraries or protocol upgrades needed.

**EventEmitter as internal bus**
The `SearchService` emits `result.found` and `search.completed` events on a shared `EventEmitter`. The SSE route handler listens for those events and forwards them to the connected client, then cleans up listeners when the client disconnects.
