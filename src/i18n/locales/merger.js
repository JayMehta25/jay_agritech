const fs = require('fs');

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function processLocaleFile(filePath) {
  console.log(`Processing file: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8').trim();
  
  // Split strictly on the malformed pages_details root boundaries
  const rawChunks = content.split(/\r?\n\s*\}\s*,\s*\r?\n\s*"pages_details":\s*\{/);
  
  let mergedObj = {};
  
  rawChunks.forEach((chunk, index) => {
    let normalized = chunk.trim();
    if (normalized === '') return;
    
    // Strip trailing commas first
    if (normalized.endsWith(',')) {
      normalized = normalized.slice(0, -1).trim();
    }
    
    // Wrap the chunk into a valid standalone JSON object
    if (index > 0) {
      // Prepend pages_details root key since the split consumed it
      normalized = '"pages_details": {' + normalized;
    }
    if (!normalized.startsWith('{')) {
      normalized = '{' + normalized;
    }
    if (!normalized.endsWith('}')) {
      normalized = normalized + '}';
    }
    
    try {
      const parsed = JSON.parse(normalized);
      mergedObj = deepMerge(mergedObj, parsed);
      console.log(`Parsed chunk ${index} successfully.`);
    } catch (e) {
      console.error(`Error parsing chunk ${index} in ${filePath}:`, e.message);
      // Fallback formatting: remove trailing commas within lists or objects
      try {
        let fixed = normalized.replace(/,\s*([\]}])/g, '$1');
        const parsed = JSON.parse(fixed);
        mergedObj = deepMerge(mergedObj, parsed);
        console.log(`Parsed chunk ${index} successfully with fallback.`);
      } catch (e2) {
        console.error('Failed to parse chunk content preview:', normalized.substring(0, 200) + '...');
      }
    }
  });
  
  // Write the clean single-root JSON back
  fs.writeFileSync(filePath, JSON.stringify(mergedObj, null, 2), 'utf8');
  console.log(`Successfully merged and saved ${filePath}`);
}

const hiPath = 'c:\\Users\\HP\\Desktop\\jayagritech\\src\\i18n\\locales\\hi.json';
const zhPath = 'c:\\Users\\HP\\Desktop\\jayagritech\\src\\i18n\\locales\\zh.json';

try {
  processLocaleFile(hiPath);
  processLocaleFile(zhPath);
  console.log('LOCALE MERGER COMPLETED SUCCESSFULLY!');
} catch (e) {
  console.error('Merger execution failed:', e);
}
