/**
 * Example usage of data processing utilities
 * This file demonstrates how to use the data processing functions
 */

import { 
  parseCommentsCSV,
  getCommentsByIdol,
  getCommentsByVideo,
  calculateSentimentDistribution,
  calculateAspectDistribution,
  createSentimentAspectMatrix,
  getKoreanCommentsWithTranslations,
  getAspectExamples,
  getSentimentExamples,
  formatSentimentChartData,
  formatAspectChartData
} from './dataProcessing.js';

/**
 * Process CSV data and generate various analyses
 * @param {string} csvData - The raw CSV data as a string
 * @return {Object} Various analyses of the data
 */
export function processData(csvData) {
  // Parse the CSV data
  const comments = parseCommentsCSV(csvData);
  
  // Generate various analyses
  const analyses = {
    // Overall statistics
    totalComments: comments.length,
    sentimentDistribution: calculateSentimentDistribution(comments),
    aspectDistribution: calculateAspectDistribution(comments),
    sentimentAspectMatrix: createSentimentAspectMatrix(comments),
    
    // Examples for visualization
    sentimentExamples: getSentimentExamples(comments, 5),
    aspectExamples: getAspectExamples(comments, 5),
    
    // Idol-specific analyses
    idolAnalyses: {},
    
    // Video-specific analyses
    videoAnalyses: {},
    
    // Korean comments with translations
    koreanComments: getKoreanCommentsWithTranslations(comments)
  };
  
  // Generate idol-specific analyses
  const idolIds = ['joshua', 'mark', 'wendy', 'rose', 'jennie', 'rm', 'felix'];
  for (const idolId of idolIds) {
    const idolComments = getCommentsByIdol(comments, idolId);
    analyses.idolAnalyses[idolId] = {
      commentCount: idolComments.length,
      sentimentDistribution: calculateSentimentDistribution(idolComments),
      aspectDistribution: calculateAspectDistribution(idolComments),
      examples: idolComments.slice(0, 5).map(c => ({
        id: c.id,
        text: c.language === 'Korean' ? (c.translation || c.text) : c.text,
        originalText: c.language === 'Korean' ? (c.originalText || c.text) : null,
        sentiment: c.sentiment,
        evaluationAspects: c.evaluationAspects,
        videoId: c.videoId
      }))
    };
  }
  
  // Generate video-specific analyses
  for (let videoId = 1; videoId <= 4; videoId++) {
    const videoComments = getCommentsByVideo(comments, videoId);
    analyses.videoAnalyses[videoId] = {
      commentCount: videoComments.length,
      sentimentDistribution: calculateSentimentDistribution(videoComments),
      aspectDistribution: calculateAspectDistribution(videoComments),
      examples: videoComments.slice(0, 5).map(c => ({
        id: c.id,
        text: c.language === 'Korean' ? (c.translation || c.text) : c.text,
        originalText: c.language === 'Korean' ? (c.originalText || c.text) : null,
        sentiment: c.sentiment,
        evaluationAspects: c.evaluationAspects,
        mentionedIdols: c.mentionedIdols
      }))
    };
  }
  
  // Format data for charts
  analyses.chartData = {
    sentimentChart: formatSentimentChartData(analyses.sentimentDistribution),
    aspectChart: formatAspectChartData(analyses.aspectDistribution)
  };
  
  return analyses;
}

/**
 * Example of how to use the processData function
 * @param {string} csvPath - Path to the CSV file
 */
export async function exampleUsage(csvPath) {
  try {
    // In a browser environment, you would use fetch
    // const response = await fetch(csvPath);
    // const csvData = await response.text();
    
    // In a Node.js environment, you would use fs
    // const fs = require('fs');
    // const csvData = fs.readFileSync(csvPath, 'utf8');
    
    // For demonstration purposes, we'll use a placeholder
    const csvData = `Video#,Comments,Language,General evaluation,Aspect(s) of evaluation,Quotes,Notes
1,Her voice and pronunciation is so good! Very cute as well :),1,a,,Her voice and pronunciation is so good!,
1,"her voice,her accent I love it",1,a,,"her voice,her accent I love it",
2,Felix has the best accent his voice chef kisses,1,a,a,,
3,rosie's accent is what i live for.,1,a,G,,`;
    
    // Process the data
    const analyses = processData(csvData);
    
    // Log the results
    console.log('Total comments:', analyses.totalComments);
    console.log('Sentiment distribution:', analyses.sentimentDistribution);
    console.log('Aspect distribution:', analyses.aspectDistribution);
    console.log('Example comments for positive sentiment:', analyses.sentimentExamples.positive);
    
    // Return the analyses
    return analyses;
  } catch (error) {
    console.error('Error processing data:', error);
    return null;
  }
}

// If this file is run directly (e.g., in Node.js), execute the example
// if (typeof window === 'undefined') {
//   exampleUsage('./data/comments.csv')
//     .then(analyses => {
//       console.log('Analysis complete!');
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }
