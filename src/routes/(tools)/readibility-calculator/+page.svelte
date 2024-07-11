<script>
   import { readability } from '$lib/readability';
    let text = '';
    let result = null;

    function analyzeText() {
        result = readability(text);
    }
</script>


	<!-- Add tool here -->

	<main class="text-white w-100">
		<h1 class="font-extrabold text-blue-300">Readability Analyzer</h1>
		<h3>This free online software tool calculates readability : Coleman Liau index, Flesch Kincaid Grade Level, ARI (Automated Readability Index), SMOG. The measure of readability used here is the indication of number of years of education that a person needs to be able to understand the text easily on the first reading. Comprehension tests and skills training.
			This tool is made primarily for English texts but might work also for some other languages. In general, these tests penalize writers for polysyllabic words and long, complex sentences. Your writing will score better when you: use simpler diction, write short sentences.
			It also displays complicated sentences (with many words and syllables) with suggestions for what you might do to improve its readability.</h3> 
		
			<h3>Basic text statistics are also displayed, including number of characters, words, sentences, and average number of characters per word, syllables per word, and words per sentence.</h3>
		<div>
			<textarea class="text-black" bind:value={text} rows="10" cols="50" placeholder="Paste your text here..."></textarea>
			
		</div>
		<button class="text-white rounded-md bg-green-500 p-2 " on:click={analyzeText}>Analyze</button>
	
		{#if result}
			<h2 >Readability Results</h2>
			<p><strong>Readability Score:</strong> {result.readabilityScore}</p>
			<p><strong>Grade Level:</strong> {result.gradeLevel}</p>
			<p><strong>Number of Characters:</strong> {result.numCharacters}</p>
			<p><strong>Number of Words:</strong> {result.numWords}</p>
			<p><strong>Number of Sentences:</strong> {result.numSentences}</p>
			<p><strong>Average Characters per Word:</strong> {result.avgCharsPerWord}</p>
			<p><strong>Average Syllables per Word:</strong> {result.avgSyllablesPerWord}</p>
			<p><strong>Average Words per Sentence:</strong> {result.avgWordsPerSentence}</p>
		{/if}
	</main>
	


<style>
 main {
	    width: 100%;
        margin: 0 auto;
        padding: 2rem;
        font-family: Arial, sans-serif;
		
    }

    textarea {
        width: 100%;
        margin-bottom: 1rem;
        padding: 0.5rem;
        font-size: 1rem;
    }

    
</style>