/**
 * Data processing utilities for K-Pop Accent Web App
 * These functions handle parsing, filtering, and analyzing comment data
 */

/**
 * Parses the raw CSV data and converts it to structured JSON
 * @param {string} csvData - The raw CSV data as a string
 * @return {Array} Structured JSON data array of comments
 */
export function parseCommentsCSV(csvData) {
	// First, parse the CSV data into records, properly handling quoted fields
	const records = parseCSV(csvData);
	const commentData = [];

	// Process each record
	for (let i = 1; i < records.length; i++) { // Skip header row
		const record = records[i];
		if (!record || record.length < 6 || !record[0]) continue; // Skip invalid records

		// Extract values from the record
		const videoId = record[0];
		const commentText = record[1] || '';
		const language = record[2] === '1' ? 'English' : 'Korean';
		const sentiment = mapSentiment(record[3]);
		const aspectsStr = record[4] || '';
		const quotesStr = record[5] || null;
		const notesStr = record.length > 6 ? record[6] || '' : '';

		// Process Korean comments with translations
		let originalText = commentText;
		let translation = null;

		if (language === 'Korean' && commentText) {
			// Check for translation pattern in the comment text
			const translationPattern = /\n\nT: (.*?)(?:\n|$)/s;
			const translationMatch = commentText.match(translationPattern);
			
			if (translationMatch) {
				translation = translationMatch[1].trim();
				originalText = commentText.replace(translationPattern, '').trim();
			} else {
				// Alternative pattern: T: at the beginning of a line
				const altPattern = /T: (.*?)(?:\n|$)/s;
				const altMatch = commentText.match(altPattern);
				
				if (altMatch) {
					translation = altMatch[1].trim();
					originalText = commentText.replace(altPattern, '').trim();
				}
			}
		}

		// Create a comment object
		const comment = {
			id: `${videoId}-${i}`, // Create a unique ID from video# and row number
			videoId: parseInt(videoId, 10) || null,
			text: language === 'Korean' && translation ? originalText : commentText,
			language: language,
			sentiment: sentiment,
			evaluationAspects: parseAspects(aspectsStr),
			quotes: quotesStr
		};

		// Add translation fields if present
		if (language === 'Korean' && translation) {
			comment.originalText = originalText;
			comment.translation = translation;
		}

		// Extract mentioned idols from both original text and translation
		comment.mentionedIdols = extractMentionedIdols(comment.text || '');
		if (translation) {
			const translationIdols = extractMentionedIdols(translation);
			comment.mentionedIdols = [...new Set([...comment.mentionedIdols, ...translationIdols])];
		}

		commentData.push(comment);
	}

	return commentData;
}

/**
 * Parses CSV data into records, properly handling quoted fields and newlines
 * @param {string} csvData - The raw CSV data as a string
 * @return {Array} Array of records, each record being an array of field values
 */
function parseCSV(csvData) {
	const records = [];
	let currentRecord = [];
	let currentField = '';
	let inQuotes = false;
	
	// Add a newline at the end to ensure the last record is processed
	csvData += '\n';
	
	for (let i = 0; i < csvData.length; i++) {
		const char = csvData[i];
		const nextChar = i < csvData.length - 1 ? csvData[i + 1] : '';
		
		// Handle quotes
		if (char === '"') {
			// Check for escaped quotes (double quotes)
			if (nextChar === '"') {
				currentField += '"';
				i++; // Skip the next quote
			} else {
				inQuotes = !inQuotes;
			}
		}
		// Handle commas
		else if (char === ',' && !inQuotes) {
			currentRecord.push(currentField);
			currentField = '';
		}
		// Handle newlines
		else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
			if (char === '\r') i++; // Skip the \n in \r\n
			
			// Add the last field to the current record
			currentRecord.push(currentField);
			currentField = '';
			
			// Add the current record to the records array if it's not empty
			if (currentRecord.some(field => field.trim() !== '')) {
				records.push(currentRecord);
			}
			
			// Start a new record
			currentRecord = [];
		}
		// Handle normal characters
		else {
			currentField += char;
		}
	}
	
	return records;
}

/**
 * Maps the sentiment code to a descriptive string
 * @param {string} code - The sentiment code (a, b, c, or Off-topic)
 * @return {string} The sentiment description
 */
function mapSentiment(code) {
	if (!code) return 'unknown';
	
	switch (code.trim()) {
		case 'a':
			return 'positive';
		case 'b':
			return 'neutral';
		case 'c':
			return 'negative';
		case 'Off-topic':
			return 'off-topic';
		default:
			return 'unknown';
	}
}

/**
 * Parses the aspect codes into an array of aspect names
 * @param {string} aspectsStr - The aspect codes string
 * @return {Array} Array of aspect names
 */
function parseAspects(aspectsStr) {
	if (!aspectsStr || aspectsStr.trim() === '') return [];

	const aspects = [];
	const aspectMap = {
		a: 'general',
		b: 'nativeness',
		c: 'motivation',
		d: 'proficiency',
		e: 'phoneticFeatures',
		COM: 'comprehensibility',
		SP: 'speech',
		SA: 'socialAttractiveness',
		MOT: 'motivation',
		NA: 'nativeness',
		META: 'metalinguistic'
	};

	// Handle multiple aspects (e.g., "a\nSP")
	const aspectCodes = aspectsStr.split(/[\n\r]+/);

	for (const code of aspectCodes) {
		const trimmedCode = code.trim();
		if (aspectMap[trimmedCode]) {
			aspects.push(aspectMap[trimmedCode]);
		}
	}

	return [...new Set(aspects)]; // Remove duplicates
}

/**
 * Extracts mentioned idol names from comment text
 * @param {string} text - The comment text
 * @return {Array} Array of idol IDs mentioned
 */
function extractMentionedIdols(text) {
	if (!text) return [];
	
	const idolNames = [
		{ id: 'joshua', variations: ['joshua', 'shua', '조슈아'] },
		{ id: 'mark', variations: ['mark', 'mark lee', '마크'] },
		{ id: 'wendy', variations: ['wendy', 'seungwan', '웬디', '승완'] },
		{ id: 'rose', variations: ['rose', 'rosé', 'rosie', 'chaeyoung', '로제', '채영'] },
		{ id: 'jennie', variations: ['jennie', '제니'] },
		{ id: 'rm', variations: ['rm', 'namjoon', '남준'] },
		{ id: 'felix', variations: ['felix', '필릭스'] }
	];

	const mentioned = [];
	const lowerText = text.toLowerCase();

	for (const idol of idolNames) {
		for (const variation of idol.variations) {
			if (lowerText.includes(variation.toLowerCase())) {
				mentioned.push(idol.id);
				break; // Found this idol, move to next
			}
		}
	}

	return [...new Set(mentioned)]; // Remove duplicates
}

/**
 * Extracts comments related to a specific idol
 * @param {Array} comments - The parsed comments array
 * @param {string} idolId - The ID of the idol
 * @return {Array} Comments mentioning the specified idol
 */
export function getCommentsByIdol(comments, idolId) {
	return comments.filter((comment) => comment.mentionedIdols.includes(idolId));
}

/**
 * Extracts comments from a specific video
 * @param {Array} comments - The parsed comments array
 * @param {number} videoId - The video ID (1-4)
 * @return {Array} Comments from the specified video
 */
export function getCommentsByVideo(comments, videoId) {
	return comments.filter((comment) => comment.videoId === videoId);
}

/**
 * Calculates sentiment distribution for a set of comments
 * @param {Array} comments - The comments to analyze
 * @return {Object} Distribution of positive, neutral, and negative sentiments
 */
export function calculateSentimentDistribution(comments) {
	// Filter out off-topic comments
	const relevantComments = comments.filter((c) => c.sentiment !== 'off-topic');
	const total = relevantComments.length;

	if (total === 0) return { positive: 0, neutral: 0, negative: 0 };

	const counts = {
		positive: relevantComments.filter((c) => c.sentiment === 'positive').length,
		neutral: relevantComments.filter((c) => c.sentiment === 'neutral').length,
		negative: relevantComments.filter((c) => c.sentiment === 'negative').length
	};

	return {
		positive: (counts.positive / total) * 100,
		neutral: (counts.neutral / total) * 100,
		negative: (counts.negative / total) * 100,
		counts: counts,
		total: total
	};
}

/**
 * Calculates distribution of evaluation aspects for a set of comments
 * @param {Array} comments - The comments to analyze
 * @return {Object} Distribution of different evaluation aspects
 */
export function calculateAspectDistribution(comments) {
	// Filter out off-topic comments
	const relevantComments = comments.filter((c) => c.sentiment !== 'off-topic');
	const total = relevantComments.length;

	if (total === 0) return {};

	const aspectCounts = {
		general: 0,
		socialAttractiveness: 0,
		nativeness: 0,
		phoneticFeatures: 0,
		speech: 0,
		motivation: 0,
		proficiency: 0,
		comprehensibility: 0,
		metalinguistic: 0
	};

	// Count occurrences of each aspect
	for (const comment of relevantComments) {
		for (const aspect of comment.evaluationAspects) {
			if (aspectCounts[aspect] !== undefined) {
				aspectCounts[aspect]++;
			}
		}
	}

	// Calculate percentages
	const aspectDistribution = {};
	for (const [aspect, count] of Object.entries(aspectCounts)) {
		aspectDistribution[aspect] = (count / total) * 100;
	}

	return {
		distribution: aspectDistribution,
		counts: aspectCounts,
		total: total
	};
}

/**
 * Creates cross-tabulation of sentiment vs. aspect
 * @param {Array} comments - The comments to analyze
 * @return {Object} Matrix showing relationship between sentiment and aspects
 */
export function createSentimentAspectMatrix(comments) {
	// Filter out off-topic comments
	const relevantComments = comments.filter((c) => c.sentiment !== 'off-topic');

	const matrix = {
		positive: {
			general: 0,
			socialAttractiveness: 0,
			nativeness: 0,
			phoneticFeatures: 0,
			speech: 0,
			motivation: 0,
			proficiency: 0,
			comprehensibility: 0,
			metalinguistic: 0
		},
		neutral: {
			general: 0,
			socialAttractiveness: 0,
			nativeness: 0,
			phoneticFeatures: 0,
			speech: 0,
			motivation: 0,
			proficiency: 0,
			comprehensibility: 0,
			metalinguistic: 0
		},
		negative: {
			general: 0,
			socialAttractiveness: 0,
			nativeness: 0,
			phoneticFeatures: 0,
			speech: 0,
			motivation: 0,
			proficiency: 0,
			comprehensibility: 0,
			metalinguistic: 0
		}
	};

	// Count occurrences of each sentiment-aspect combination
	for (const comment of relevantComments) {
		const sentiment = comment.sentiment;
		for (const aspect of comment.evaluationAspects) {
			if (matrix[sentiment] && matrix[sentiment][aspect] !== undefined) {
				matrix[sentiment][aspect]++;
			}
		}
	}

	return matrix;
}

/**
 * Extracts Korean comments with their translations
 * @param {Array} comments - The parsed comments array
 * @return {Array} Korean comments with translations
 */
export function getKoreanCommentsWithTranslations(comments) {
	return comments
		.filter((comment) => comment.language === 'Korean' && comment.translation)
		.map((comment) => ({
			id: comment.id,
			videoId: comment.videoId,
			originalText: comment.originalText || comment.text,
			translation: comment.translation,
			sentiment: comment.sentiment,
			evaluationAspects: comment.evaluationAspects,
			mentionedIdols: comment.mentionedIdols
		}));
}

/**
 * Gets example comments for each evaluation aspect
 * @param {Array} comments - The parsed comments array
 * @param {number} limit - Maximum number of examples per aspect
 * @return {Object} Example comments for each aspect
 */
export function getAspectExamples(comments, limit = 3) {
	const aspects = [
		'general',
		'socialAttractiveness',
		'nativeness',
		'phoneticFeatures',
		'speech',
		'motivation',
		'proficiency',
		'comprehensibility',
		'metalinguistic'
	];

	const examples = {};

	for (const aspect of aspects) {
		// Get comments that have this aspect
		const relevantComments = comments
			.filter((c) => c.sentiment !== 'off-topic' && c.evaluationAspects.includes(aspect))
			.slice(0, limit);

		examples[aspect] = relevantComments.map((c) => ({
			id: c.id,
			text: c.language === 'Korean' ? c.translation || c.text : c.text,
			originalText: c.language === 'Korean' ? c.originalText || c.text : null,
			sentiment: c.sentiment,
			videoId: c.videoId,
			mentionedIdols: c.mentionedIdols
		}));
	}

	return examples;
}

/**
 * Gets sentiment examples for visualization
 * @param {Array} comments - The parsed comments array
 * @param {number} limit - Maximum number of examples per sentiment
 * @return {Object} Example comments for each sentiment
 */
export function getSentimentExamples(comments, limit = 3) {
	const sentiments = ['positive', 'neutral', 'negative'];
	const examples = {};

	for (const sentiment of sentiments) {
		// Get comments with this sentiment
		const relevantComments = comments.filter((c) => c.sentiment === sentiment).slice(0, limit);

		examples[sentiment] = relevantComments.map((c) => ({
			id: c.id,
			text: c.language === 'Korean' ? c.translation || c.text : c.text,
			originalText: c.language === 'Korean' ? c.originalText || c.text : null,
			videoId: c.videoId,
			evaluationAspects: c.evaluationAspects,
			mentionedIdols: c.mentionedIdols
		}));
	}

	return examples;
}

/**
 * Formats data for SentimentChart component
 * @param {Object} distribution - The sentiment distribution object
 * @return {Object} Formatted data for Chart.js
 */
export function formatSentimentChartData(distribution) {
	return {
		labels: ['Positive', 'Neutral', 'Negative'],
		datasets: [
			{
				data: [distribution.positive, distribution.neutral, distribution.negative],
				backgroundColor: [
					'#36D7B7', // Positive (teal)
					'#F1C40F', // Neutral (amber)
					'#E74C3C' // Negative (red)
				]
			}
		]
	};
}

/**
 * Formats data for AspectChart component
 * @param {Object} distribution - The aspect distribution object
 * @return {Object} Formatted data for Chart.js
 */
export function formatAspectChartData(distribution) {
	const aspectLabels = {
		socialAttractiveness: 'Social Attractiveness',
		nativeness: 'Nativeness',
		phoneticFeatures: 'Phonetic Features',
		speech: 'Speech',
		motivation: 'Motivation',
		proficiency: 'Proficiency',
		comprehensibility: 'Comprehensibility',
		metalinguistic: 'Metalinguistic',
		general: 'General'
	};

	// Sort aspects by percentage (descending)
	const sortedAspects = Object.entries(distribution.distribution)
		.filter(([_, value]) => value > 0) // Only include non-zero values
		.sort((a, b) => b[1] - a[1]);

	return {
		labels: sortedAspects.map(([aspect, _]) => aspectLabels[aspect]),
		datasets: [
			{
				data: sortedAspects.map(([_, value]) => value),
				backgroundColor: [
					'#FF3E76', // Primary color
					'#6236FF', // Secondary color
					'#36D7B7', // Teal
					'#F1C40F', // Amber
					'#E74C3C', // Red
					'#3498DB', // Blue
					'#9B59B6', // Purple
					'#1ABC9C', // Turquoise
					'#F39C12' // Orange
				]
			}
		]
	};
}
