<script>
  import { writable } from 'svelte/store';

  // Stores
  let rawHeaders = writable('');
  let error = writable('');
  let step = writable(1);
  let analysisResult = writable({
    subject: '',
    receivedDelay: 0,
    spf: '',
    dkim: '',
    dmarc: '',
    headers: [],
    hops: []
  });

  // Functions
  function parseHeaders(headers) {
    try {
      const parsedHeaders = [];
      let currentKey = null;
      let currentValue = "";
      const delimiters = [':', '=', ' '];
      headers.split('\n').forEach(line => {
        if (/^\s+/.test(line)) {
          currentValue += line.trim();
        } else {
          if (currentKey) {
            parsedHeaders.push({ key: currentKey, value: currentValue.trim() });
          }
          const parts = line.split(new RegExp(delimiters.join('|'), 'g'));
          currentKey = parts[0].trim();
          currentValue = parts.slice(1).join(' ').trim();
        }
      });

      // Add the last header if any
      if (currentKey) {
        parsedHeaders.push({ key: currentKey, value: currentValue.trim() });
      }

      return parsedHeaders;
    } catch (err) {
      console.error('Error parsing headers:', err.message);
      return [];
    }
  }

  function formatDate(date) {
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });
  }

  function isBlacklisted(from) {
    // Replace with your logic to determine if the server is blacklisted
    return from.toLowerCase().includes('blacklist');
  }

  function analyzeHeaders() {
    const headers = parseHeaders($rawHeaders);
    if (headers.length === 0) {
      error.set('Failed to parse headers. Please ensure they are in the correct format.');
      return;
    }

    const subject = headers.find(header => header.key.toLowerCase() === 'subject')?.value || 'N/A';
    const receivedHeaders = headers.filter(header => header.key.toLowerCase() === 'received');
    const spf = headers.find(header => header.key.toLowerCase() === 'received-spf')?.value || 'N/A';
    const dkim = headers.find(header => header.key.toLowerCase() === 'dkim-signature')?.value || 'N/A';
    const dmarc = headers.find(header => header.key.toLowerCase() === 'authentication-results')?.value || 'N/A';

    let receivedDelay = 0;
    let hops = [];
    if (receivedHeaders.length >= 2) {
      try {
        const receivedTimes = receivedHeaders.map(header => new Date(header.value.split(';').pop().trim()).getTime());
        receivedDelay = Math.floor((Math.max(...receivedTimes) - Math.min(...receivedTimes)) / 1000);

        // Parse hop information
        hops = receivedHeaders.map((header, index) => {
          const parts = header.value.split(';');
          const date = new Date(parts.pop().trim());
          const details = parts.join(';');
          const hopInfo = {
            hop: index + 1,
            delay: index === 0 ? 0 : Math.floor((date.getTime() - new Date(receivedHeaders[index - 1].value.split(';').pop().trim()).getTime()) / 1000),
            from: details.match(/from\s+([^;\s]+)/i)?.[1] || 'N/A',
            by: details.match(/by\s+([^;\s]+)/i)?.[1] || 'N/A',
            with: details.match(/with\s+([^;\s]+)/i)?.[1] || 'N/A',
            time: formatDate(date),
            blacklist: isBlacklisted(details.match(/from\s+([^;\s]+)/i)?.[1] || 'N/A') ? '✔' : '❌'
          };
          return hopInfo;
        });
      } catch (e) {
        error.set('Error parsing dates in Received headers.');
        return;
      }
    }

    analysisResult.set({
      subject,
      receivedDelay,
      spf,
      dkim,
      dmarc,
      headers,
      hops
    });

    step.set(2);
  }

  function goBack() {
    step.set(1);
    error.set('');
  }
</script>

<style>
  .app {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  .uploader, .result {
    margin-bottom: 20px;
  }
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  .result-section {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
  }
  h2, h3 {
    margin-top: 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    padding: 5px 0;
  }
  .error {
    color: red;
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
</style>

{#if $step === 1}
  <div class="app">
    <h2>Email Header Analyzer</h2>
    <div class="uploader">
      <textarea bind:value={$rawHeaders} placeholder="Paste email headers here..."></textarea>
      {#if $error}
        <div class="error">{$error}</div>
      {/if}
      <button on:click={analyzeHeaders}>Analyze Header</button>
    </div>
    <div>
      <h3>About Email Headers</h3>
      <p>This tool will make email headers human readable by parsing them according to RFC 822. Email headers are present on every email you receive via the Internet and can provide valuable diagnostic information like hop delays, authentication results, and more.</p>
    </div>
  </div>
{:else if $step === 2}
  <div class="app">
    <h2>Header Analyzed</h2>
    
    <p>Email Subject: {$analysisResult.subject}</p>
   
    <div class="result-section">
      <h3>Relay Information</h3>
      <p>Received Delay: {$analysisResult.receivedDelay} seconds</p>
      <table>
        <thead>
          <tr>
            <th>Hop</th>
            <th>Delay</th>
            <th>From</th>
            <th>By</th>
            <th>With</th>
            <th>Time</th>
            <th>Blacklist</th>
          </tr>
        </thead>
        <tbody>
          {#each $analysisResult.hops as hop}
            <tr>
              <td>{hop.hop}</td>
              <td>{hop.delay}</td>
              <td>{hop.from}</td>
              <td>{hop.by}</td>
              <td>{hop.with}</td>
              <td>{hop.time}</td>
              <td>{hop.blacklist}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="result-section">
      <h3>SPF, DKIM, and DMARC Information</h3>
      <ul>
        <li><strong>SPF:</strong> {$analysisResult.spf}</li>
        <li><strong>DKIM:</strong> {$analysisResult.dkim}</li>
        <li><strong>DMARC:</strong> {$analysisResult.dmarc}</li>
      </ul>
    </div>
    <div class="result-section">
      <h3>Headers Found</h3>
      <ul>
        {#each $analysisResult.headers as header}
          <li><strong>{header.key}:</strong> {header.value}</li>
        {/each}
      </ul>
    </div>
    <div class="result-section">
      <h3>Raw Headers</h3>
      <textarea readonly>{$rawHeaders}</textarea>
    </div>
    <button on:click={goBack}>Go Back</button>
  </div>
{/if}
