// src/lib/readability.js

function syllableCount(word) {
    word = word.toLowerCase();                                    
    if(word.length <= 3) { return 1; }                            
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   
    word = word.replace(/^y/, '');                                
    const syllableMatches = word.match(/[aeiouy]{1,2}/g);
    return syllableMatches ? syllableMatches.length : 0;
}

function readability(text) {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
    const words = text.match(/\b\w+\b/g) || [];
    const syllables = words.reduce((acc, word) => acc + syllableCount(word), 0);

    const numSentences = sentences.length;
    const numWords = words.length;
    const numSyllables = syllables;

    const readabilityScore = 206.835 - 1.015 * (numWords / numSentences) - 84.6 * (numSyllables / numWords);
    const gradeLevel = 0.39 * (numWords / numSentences) + 11.8 * (numSyllables / numWords) - 15.59;

    return {
        readabilityScore: readabilityScore.toFixed(2),
        gradeLevel: gradeLevel.toFixed(2),
        numCharacters: text.length,
        numWords,
        numSentences,
        avgCharsPerWord: (text.length / numWords).toFixed(2),
        avgSyllablesPerWord: (numSyllables / numWords).toFixed(2),
        avgWordsPerSentence: (numWords / numSentences).toFixed(2),
    };
}

export { readability };
