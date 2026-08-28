// src/types/search.types.ts

/**
 * Represents the possible states of a search job.
 */
export type SearchStatus = 'pending' | 'searching' | 'completed' | 'failed';

/**
 * Defines the structure for a client's request to initiate a search.
 * This will be the body of the POST /api/search request.
 */
export interface SearchRequest {
  query: string;
}

/**
 * Defines the structure of a single search result item.
 */
export interface SearchResult {
  title: string;
  url: string;
  description?: string;
}

/**
 * Represents a search job within the backend.
 * This combines the request, status, and results of a search operation.
 */
export interface SearchJob {
  id: string;
  query: string;
  status: SearchStatus;
  results: SearchResult[];
  createdAt: Date;
  updatedAt: Date;
}
