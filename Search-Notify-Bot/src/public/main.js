// public/main.js

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchQuery = document.getElementById('search-query');
    const resultsContainer = document.getElementById('results-container');
    let eventSource = null;

    const startSearch = async () => {
        const query = searchQuery.value;
        if (!query) {
            alert('Please enter a search query.');
            return;
        }

        // Clean up any previous connection
        if (eventSource) {
            eventSource.close();
        }

        resultsContainer.innerHTML = '<p class="status">Submitting search...</p>';
        searchButton.disabled = true;

        try {
            // 1. Start the search job by calling our API
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to start search job.');
            }

            const { jobId } = await response.json();
            resultsContainer.innerHTML = `<p class="status">Search job started (ID: ${jobId}). Waiting for results...</p>`;

            // 2. Connect to the SSE endpoint to receive real-time events
            eventSource = new EventSource(`/api/events/${jobId}`);
            eventSource.onopen = () => console.log('SSE connection established.');

            // 3. Define listeners for events from the server
            eventSource.addEventListener('result.found', handleResultFound);
            eventSource.addEventListener('search.completed', handleSearchCompleted);
            eventSource.onerror = handleError;

        } catch (error) {
            resultsContainer.innerHTML = `<p class="status" style="color: red;">Error: ${error.message}</p>`;
            searchButton.disabled = false;
        }
    };

    const handleResultFound = (event) => {
        const result = JSON.parse(event.data);
        console.log('Result found:', result);

        // Remove the initial status message if it's still there
        const initialStatus = resultsContainer.querySelector('p.status');
        if (initialStatus && initialStatus.textContent.includes('Waiting for results...')) {
            initialStatus.remove();
        }

        const resultElement = document.createElement('div');
        resultElement.className = 'result-item';
        resultElement.innerHTML = `<strong>${result.title}</strong><br><a href="${result.url}" target="_blank">${result.url}</a><p>${result.description || ''}</p>`;
        resultsContainer.appendChild(resultElement);
    };

    const handleSearchCompleted = (event) => {
        const data = JSON.parse(event.data);
        console.log('Search completed:', data.message);
        const statusElement = document.createElement('p');
        statusElement.className = 'status';
        statusElement.innerHTML = `--- <strong>${data.message}</strong> ---`;
        resultsContainer.appendChild(statusElement);

        // Close the connection and re-enable the UI
        if (eventSource) {
            eventSource.close();
            console.log('SSE connection closed by server.');
        }
        searchButton.disabled = false;
    };

    const handleError = (err) => {
        console.error('EventSource failed:', err);
        if (eventSource) {
            eventSource.close();
        }
        searchButton.disabled = false;
    };

    // Attach event listener to the button
    searchButton.addEventListener('click', startSearch);
});
