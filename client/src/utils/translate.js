/**
 * Stellar AI — Translation Utility
 * Uses MyMemory free API (https://mymemory.translated.net)
 * No API key required. Limit: ~10 000 chars/day per IP (ample for demo).
 */

const MYMEMORY_URL = 'https://api.mymemory.translated.net/get';

// MyMemory caps each request at 500 chars
const CHUNK_SIZE = 480;

/**
 * Split text into chunks that respect the API character limit.
 * Tries to break on newline or space boundaries.
 */
function chunkText(text, size = CHUNK_SIZE) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = start + size;
    if (end >= text.length) {
      chunks.push(text.slice(start));
      break;
    }
    // Try to cut at a newline or space
    const nlIdx = text.lastIndexOf('\n', end);
    const spIdx = text.lastIndexOf(' ', end);
    const cutAt = nlIdx > start ? nlIdx : spIdx > start ? spIdx : end;
    chunks.push(text.slice(start, cutAt));
    start = cutAt;
  }
  return chunks.map(c => c.trim()).filter(Boolean);
}

/**
 * Translate a single chunk (≤480 chars) via MyMemory.
 * Returns translated string or original on failure.
 */
async function translateChunk(chunk, langPair = 'en|hi') {
  try {
    const url = `${MYMEMORY_URL}?q=${encodeURIComponent(chunk)}&langpair=${langPair}`;
    const res = await fetch(url);
    if (!res.ok) return chunk;
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (!translated || data?.responseStatus !== 200) return chunk;
    return translated;
  } catch {
    return chunk;
  }
}

/**
 * Translate a (possibly long) text string.
 * @param {string} text     Source text
 * @param {string} targetLang  'hi' | 'en'
 * @param {string} sourceLang  'en' | 'hi'  (default 'en')
 * @returns {Promise<string>} Translated text
 */
export async function translateText(text, targetLang = 'hi', sourceLang = 'en') {
  if (!text || targetLang === sourceLang) return text;
  const langPair = `${sourceLang}|${targetLang}`;
  const chunks = chunkText(text);
  if (chunks.length === 0) return text;

  // Translate all chunks in parallel (MyMemory is rate-limited per request, not concurrency)
  const results = await Promise.all(chunks.map(c => translateChunk(c, langPair)));
  return results.join('\n');
}
