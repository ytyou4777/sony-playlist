const axios = require('axios');
const fs = require('fs');

const SOURCE_URL = 'https://pocket-tv-tamil-5afe35.gitlab.io/';
const OUTPUT_FILE = 'SONY.m3u';

async function fetchAndSave() {
  try {
    console.log(`Fetching from ${SOURCE_URL}...`);
    const response = await axios.get(SOURCE_URL, {
      timeout: 30000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    // The response should be the raw M3U content
    let m3uContent = response.data;

    // Optional: ensure it starts with #EXTM3U (some sources omit it)
    if (!m3uContent.trim().startsWith('#EXTM3U')) {
      m3uContent = '#EXTM3U\n' + m3uContent;
    }

    fs.writeFileSync(OUTPUT_FILE, m3uContent, 'utf8');
    console.log(`✅ Successfully saved to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('❌ Error fetching the M3U:', error.message);
    process.exit(1);
  }
}

fetchAndSave();
