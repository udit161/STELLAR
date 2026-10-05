/**
 * Agent37 API Service
 * Extends STELLAR's frontend to talk to the Agent37 controller layer.
 */

const API_BASE_URL = import.meta.env.VITE_AI_URL || 'http://localhost:8000';

export async function sendQuery(queryText, options = {}) {
  const res = await fetch(`${API_BASE_URL}/api/v1/agent37/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: queryText,
      user_id: options.userId || 'demo_user',
      session_id: options.sessionId || 'demo_session',
      geo_context: options.geoContext || {}
    })
  });
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Agent37 backend error: ${res.status} ${errorBody}`);
  }
  return await res.json();
}

export async function getJobResult(jobId) {
  const res = await fetch(`${API_BASE_URL}/api/v1/agent37/job/${jobId}`);
  if (!res.ok) throw new Error('Failed to fetch job trace');
  return await res.json();
}

export function subscribeToJobStream(jobId, onEvent, onDone, onError) {
  const eventSource = new EventSource(`${API_BASE_URL}/api/v1/agent37/stream/${jobId}`);

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'done' || data.status === 'completed' || data.status === 'failed') {
        eventSource.close();
        if (onDone) onDone(data);
      } else {
        if (onEvent) onEvent(data);
      }
    } catch (err) {
      console.error('Error parsing SSE data', err);
    }
  };

  eventSource.onerror = (err) => {
    eventSource.close();
    if (onError) onError(err);
  };

  return () => {
    eventSource.close();
  };
}
