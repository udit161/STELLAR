/**
 * Stellar AI - API Service Layer
 * Communication module connecting frontend React client to FastAPI AI agent microservice.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Check backend health status
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error(`Health check status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[Stellar API] Microservice offline or unreachable:', err.message);
    return { status: 'offline', error: err.message };
  }
}

/**
 * Send text-only query payload to FastAPI agent
 * @param {string} query - Natural language query string
 * @param {Object} [geoContext] - AOI coordinates and filter options
 * @param {Object} [modalities] - Image modalities metadata
 */
export async function sendTextQuery(query, geoContext = {}, modalities = {}) {
  const payload = {
    query,
    geo_context: geoContext,
    modalities,
    user_id: 'user_' + Math.random().toString(36).substr(2, 6),
    session_id: 'sess_' + Date.now(),
  };

  const response = await fetch(`${API_BASE_URL}/api/v1/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'API Query error' }));
    throw new Error(errorData.detail || `Server returned ${response.status}`);
  }

  return await response.json();
}

/**
 * Upload single/multiple satellite images with a query in a single multipart request
 * @param {string} query - Natural language query string
 * @param {File|File[]} files - Image File object or array of Files
 * @param {Object} [options] - Additional parameters (sensor, aoi, date_range, cloud_cover)
 */
export async function sendQueryWithImage(query, files, options = {}) {
  const formData = new FormData();
  formData.append('query', query);

  if (Array.isArray(files)) {
    files.forEach((file) => formData.append('files', file));
  } else if (files) {
    formData.append('file', files);
  }

  if (options.sensor) formData.append('sensor', options.sensor);
  if (options.aoi) formData.append('aoi', options.aoi);
  if (options.dateRange) formData.append('date_range', options.dateRange);
  if (options.cloudCover) formData.append('cloud_cover', options.cloudCover);
  if (options.taskType) formData.append('task_type', options.taskType);

  const response = await fetch(`${API_BASE_URL}/api/v1/query-with-image`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Upload query error' }));
    throw new Error(errorData.detail || `Server returned ${response.status}`);
  }

  return await response.json();
}

/**
 * Upload T1 (pre-event) and T2 (post-event) images for bi-temporal change detection
 * @param {string} query - Natural language query string
 * @param {File} t1File - Pre-event satellite image file
 * @param {File} t2File - Post-event satellite image file
 * @param {Object} [options] - Additional parameters
 */
export async function sendBiTemporalQuery(query, t1File, t2File, options = {}) {
  const formData = new FormData();
  formData.append('query', query);
  formData.append('t1_file', t1File);
  formData.append('t2_file', t2File);
  if (options.sensor) formData.append('sensor', options.sensor);

  const response = await fetch(`${API_BASE_URL}/api/v1/analyze-bitemporal`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Bi-temporal query error' }));
    throw new Error(errorData.detail || `Server returned ${response.status}`);
  }

  return await response.json();
}

/**
 * Standalone file upload helper
 * @param {File} file - Satellite image file
 */
export async function uploadImageFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/v1/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Upload error' }));
    throw new Error(errorData.detail || `Server returned ${response.status}`);
  }

  return await response.json();
}

export default {
  checkBackendHealth,
  sendTextQuery,
  sendQueryWithImage,
  sendBiTemporalQuery,
  uploadImageFile,
};
