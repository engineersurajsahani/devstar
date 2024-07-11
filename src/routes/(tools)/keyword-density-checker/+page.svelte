<script>
    import { onMount } from 'svelte';
  
    let url = '';
    let inputType = 'url';
    let textInput = '';
    let includeMeta = false;
    let includeTitle = false;
    let includeAlt = false;
    let results = [];
    let showResults = false;
  
    let result = {
      url: "",
      loadTime: "",
      totalKeywords: 0,
      tagCloud: [],
      topKeywords: [],
      keywordDensity: {
        oneWord: [],
        twoWords: [],
        threeWords: [],
        fourWords: []
      }
    };
  
    let selectedDensity = 'oneWord';
  
    const stopWords = new Set([
        'i', 'before', 'after', 'during', 'we', 'he', 'she', 'it', 'an', 'will', 'can', 'and', 'the', 'is', 'in', 'at', 'of', 'a', 'to', 'with',
        'if', 'or', 'but', 'because', 'so', 'that', 'as', 'until', 'while', 'for', 'nor', 'though', 'although', 'even', 'when', 'where', 'whether',
        'however', 'nevertheless', 'moreover', 'furthermore', 'therefore', 'otherwise', 'thus', 'hence', 'nonetheless', 'instead', 'meanwhile',
        'also', 'besides', 'further', 'like', 'unlike', 'such', 'this', 'these', 'those', 'every', 'any', 'each', 'no', 'not', 'only', 'own',
        'just', 'same', 'still', 'rather', 'less', 'least', 'many', 'much', 'few', 'several', 'some', 'most', 'all', 'anyway', 'either', 'both',
        'next', 'then', 'now', 'always', 'often', 'sometimes', 'seldom', 'never', 'again', 'already', 'yet', 'ever', 'never', 'actually', 'perhaps',
        'probably', 'maybe', 'certainly', 'definitely', 'surely', 'likely', 'unlikely', 'certain', 'doubtless', 'absolutely', 'truly', 'indeed',
        'finally', 'eventually', 'lastly', 'once', 'previously', 'soon', 'later', 'nowadays', 'today', 'tonight', 'tomorrow', 'yesterday',
        'once', 'sometime', 'afterward', 'beforehand', 'here', 'there', 'everywhere', 'anywhere', 'nowhere', 'above', 'below', 'inside', 'outside',
        'beside', 'near', 'far', 'behind', 'ahead', 'over', 'under', 'up', 'down', 'across', 'along', 'around', 'through', 'throughout', 'toward',
        'onto', 'upon', 'about', 'amid', 'among', 'by', 'off', 'via', 'within', 'without', 'regarding', 'concerning', 'like', 'unlike', 'including',
        'except', 'besides', 'instead', 'regardless', 'notwithstanding', 'despite', 'apart', 'beneath', 'upon', 'whereas', 'while', 'although',
        'though', 'even', 'supposing', 'whether', 'provided', 'once', 'since', 'until', 'unless', 'whenever', 'wherever', 'if', 'although',
        'though', 'except', 'lest', 'lest', 'only', 'so', 'than', 'that', 'whom', 'whose', 'who', 'whom', 'which', 'whatever', 'whenever', 'wherever',
        'whereas', 'whichever', 'whomever', 'whoever', 'whether', 'however', 'therefore', 'furthermore', 'moreover', 'meanwhile', 'nonetheless', 
        'notwithstanding', 'otherwise', 'accordingly', 'consequently', 'thereafter', 'thus', 'hence', 'wherefore', 'likewise', 'similarly', 
        'alternatively', 'subsequently', 'henceforth', 'hereby', 'therein', 'thereupon', 'thereby', 'therefore', 'therein', 'wherein', 'thereby',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'var'
    ]);
    function setInputType(type) {
      inputType = type;
    }
  
    async function extractWords() {
      let text = '';
      showResults = false;
  
      try {
        if (inputType === 'url') {
          const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
          if (!response.ok) {
            throw new Error('Failed to fetch the URL');
          }
  
          const data = await response.json();
          const html = data.contents;
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          text = doc.body.textContent || '';
  
          if (includeMeta) {
            const metaTags = Array.from(doc.getElementsByTagName('meta'))
              .map(tag => tag.getAttribute('content') || '')
              .join(' ');
            text += ' ' + metaTags;
          }
  
          if (includeTitle) {
            const titleTag = doc.title || '';
            text += ' ' + titleTag;
          }
  
          if (includeAlt) {
            const altTags = Array.from(doc.getElementsByTagName('img'))
              .map(img => img.getAttribute('alt') || '')
              .join(' ');
            text += ' ' + altTags;
          }
        } else {
          text = textInput;
        }
  
        calculateDensities(text);
        showResults = true;
      } catch (err) {
        console.error(err.message);
      }
    }
  
    function calculateDensities(text) {
      if (text) {
        // Use a regex that accounts for apostrophes within words
        const words = text.toLowerCase().match(/(?:(?:\b\w+\b)(?:'\b\w+\b)*)/g) || [];
        const filteredWords = words.filter(word => !stopWords.has(word));
  
        const wordCounts = filteredWords.reduce((counts, word) => {
          counts[word] = (counts[word] || 0) + 1;
          return counts;
        }, {});
  
        const totalWords = filteredWords.length;
  
        results = Object.entries(wordCounts).map(([word, count]) => ({
          keyword: word,
          count: count,
          density: ((count / totalWords) * 100).toFixed(2)
        }));
  
        results.sort((a, b) => b.density - a.density);
  
        // Prepare keyword densities for 2-word, 3-word, and 4-word combinations
        result = {
          url: inputType === 'url' ? url : 'Text Input',
          loadTime: "N/A", // Placeholder, you might want to calculate this
          totalKeywords: totalWords,
          tagCloud: Object.keys(wordCounts),
          topKeywords: results.slice(0, 10).map(item => ({ keyword: item.keyword, freq: item.count })),
          keywordDensity: {
            oneWord: results.slice(0, 10).map(item => ({ keyword: item.keyword, freq: item.count, density: item.density })),
            twoWords: calculateNWordsDensity(filteredWords, 2),
            threeWords: calculateNWordsDensity(filteredWords, 3),
            fourWords: calculateNWordsDensity(filteredWords, 4)
          }
        };
      } else {
        results = [];
        result = {
          url: "",
          loadTime: "",
          totalKeywords: 0,
          tagCloud: [],
          topKeywords: [],
          keywordDensity: {
            oneWord: [],
            twoWords: [],
            threeWords: [],
            fourWords: []
          }
        };
      }
    }
  
    function calculateNWordsDensity(filteredWords, n) {
      const nWordsDensity = {};
      for (let i = 0; i <= filteredWords.length - n; i++) {
        const nWords = filteredWords.slice(i, i + n).join(' ');
        nWordsDensity[nWords] = (nWordsDensity[nWords] || 0) + 1;
      }
      const sortedNWords = Object.entries(nWordsDensity)
        .map(([words, count]) => ({
          keyword: words,
          freq: count,
          density: ((count / filteredWords.length) * 100).toFixed(2)
        }))
        .sort((a, b) => b.freq - a.freq);
      return sortedNWords.slice(0, 10); // Return top 10 results
    }
  
    function selectDensity(density) {
      selectedDensity = density;
    }
  </script>
  
  <div class="container mx-auto flex flex-col items-center justify-center min-h-screen">
    <div class="card max-w-screen-xl p-5 mb-8">
      <div class="content mx-auto flex flex-col justify-center items-center">
        <p class="mt-4 text-lg text-center">Keyword density tool: check by URL or text. Get density for one, two, and three words, etc.</p>
        <div class="input-type mt-4 flex justify-center">
          <button 
            on:click={() => setInputType('url')} 
            class={`px-4 py-2 rounded-l focus:outline-none ${inputType === 'url' ? 'bg-gray-300' : 'bg-gray-200'}`}
          >
            URL Input
          </button>
          <button 
            on:click={() => setInputType('text')} 
            class={`px-4 py-2 rounded-r focus:outline-none ${inputType === 'text' ? 'bg-gray-300' : 'bg-gray-200'}`}
          >
            Text Input
          </button>
        </div>
        {#if inputType === 'url'}
          <input 
            type="url" 
            bind:value={url} 
            placeholder="http://"
            class="mt-4 p-2 border border-gray-300 rounded w-full"
          />
          <div class="mt-4 flex flex-row items-center justify-between w-full">
            <label class="flex items-center">
              <input type="checkbox" bind:checked={includeMeta} />
              <span class="ml-2">Include Meta Tags</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" bind:checked={includeTitle} />
              <span class="ml-2">Include Titles</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" bind:checked={includeAlt} />
              <span class="ml-2">Include Alt Titles</span>
            </label>
          </div>
        {:else}
          <textarea 
            bind:value={textInput} 
            placeholder="Enter text here..." 
            class="mt-4 p-2 border border-gray-300 rounded w-full h-24"
          ></textarea>
        {/if}
        <button
          on:click={extractWords}
          class="bg-blue-500 text-white px-4 py-2 rounded mt-4 focus:outline-none focus:bg-blue-700"
        >
          Check Keyword Density
        </button>
      </div>
    </div>
  
    {#if showResults}
      <div class="card gap-16 items-center mx-auto w-full max-w-screen-xl lg:grid lg:grid-cols-1 overflow-hidden rounded-lg p-5">
        <div class="result-container w-full p-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col items-center">
          <div class="main-result text-center mb-5">
            <p><strong>URL to Verify:</strong> {result.url}</p>
            <p><strong>Load Time:</strong> {result.loadTime}</p>
            <p><strong>Total Keywords:</strong> {result.totalKeywords}</p>
          </div>
        
          <!-- <div class="tag-cloud flex flex-wrap gap-2 mt-5 justify-center mb-5">
            {#each result.tagCloud as tag}
              <span>{tag}</span>
            {/each}
          </div> -->
        
          <h3 class="mt-5 text-center text-lg font-semibold">Top Keywords</h3>
          <table class="w-full">
            <thead>
              <tr>
                <th>Keyword</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              {#each result.topKeywords as keyword}
                <tr>
                  <td>{keyword.keyword}</td>
                  <td>{keyword.freq}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        
          <div class="result-container mt-5">
            <h3 class="text-center text-lg font-semibold">Keyword Density</h3>
            <div class="tabs">
              <div class:tab-active={selectedDensity === 'oneWord'} class="tab" on:click={() => selectDensity('oneWord')}>One word</div>
              <div class:tab-active={selectedDensity === 'twoWords'} class="tab" on:click={() => selectDensity('twoWords')}>Two words</div>
              <div class:tab-active={selectedDensity === 'threeWords'} class="tab" on:click={() => selectDensity('threeWords')}>Three words</div>
              <div class:tab-active={selectedDensity === 'fourWords'} class="tab" on:click={() => selectDensity('fourWords')}>Four words</div>
            </div>
          
            <table class="w-full">
              <thead>
                <tr>
                  <th>Keyword</th>
                  <th>Frequency</th>
                  <th>Density</th>
                </tr>
              </thead>
              <tbody>
                {#each result.keywordDensity[selectedDensity] as density}
                  <tr>
                    <td>{density.keyword}</td>
                    <td>{density.freq}</td>
                    <td>{density.density}%</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  <style>
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 800px; /* Increased max-width */
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .input-type {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .input-type button {
      padding: 10px 20px;
      border: none;
      cursor: pointer;
    }
    .results-container {
      margin: 20px;
    }
    table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tr:hover {
    background-color: #e2e8f0; /* Change this color to adjust hover effect */
  }
    .result-container {
      padding: 20px;
      width: 100%;
    }
    .tag-cloud span {
      display: inline-block;
      background-color: #e2e8f0;
      padding: 5px 10px;
      border-radius: 15px;
    }
    .tabs {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .tab {
      cursor: pointer;
      padding: 10px 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .tab-active {
      background-color: #3182ce;
      color: white;
    }
    .cursor-pointer {
      cursor: pointer;
    }
  </style>