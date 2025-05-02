/**
 * Process Raw Data Script
 * 
 * This script reads the raw CSV data, processes it using the utility functions,
 * and writes the result to comments.json.
 * 
 * Run with: node src/lib/utils/processRawData.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCommentsCSV } from './dataProcessing.js';

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the raw data file - use the truncated version for testing
const rawDataPath = path.resolve(__dirname, '../../../plans/raw-data/Coding trunc.csv');
// Path to the output file
const outputPath = path.resolve(__dirname, '../data/comments.json');

// Read the raw data
console.log(`Reading raw data from ${rawDataPath}...`);
const rawData = fs.readFileSync(rawDataPath, 'utf8');

// Process the data
console.log('Processing data...');
try {
  const comments = parseCommentsCSV(rawData);
  console.log(`Processed ${comments.length} comments.`);

  // Write the result to comments.json
  console.log(`Writing result to ${outputPath}...`);
  const output = {
    comments: comments,
    _meta: {
      description: "Comment data processed from the CSV files.",
      lastUpdated: new Date().toISOString(),
      totalComments: comments.length,
      source: "plans/raw-data/Coding trunc.csv"
    }
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
  console.log('Done!');
} catch (error) {
  console.error('Error processing data:', error);
}
