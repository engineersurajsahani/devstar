<script lang="ts">
    import { Input, ButtonGroup, Label, Button, CloseButton, Card, Alert } from 'flowbite-svelte';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { InfoCircleSolid, DownloadOutline } from 'flowbite-svelte-icons';
    let url = '';
    let links = [];
    let error = '';
    let shortUrl = '';
    // Variables to store link statistics
    let noFollowLinks = 0;
    let doFollowLinks = 0;
    let internalLinks = 0;
    let externalLinks = 0;
    let brokenLinks = 0; // Monika Updated Code: Added variable for broken links count
    let httpsLinks = 0; // Monika Updated Code: Added variable for HTTPS links count
    let httpLinks = 0; // Monika Updated Code: Added variable for HTTP links count
 
    async function fetchLinks() {
      try {
        const response = await fetch(`http://localhost:3000/fetch-links?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        links = await response.json();
        error = '';
        // Update link statistics
        noFollowLinks = links.filter(link => link.followStatus === 'No follow').length;
        doFollowLinks = links.filter(link => link.followStatus === 'Do follow').length;
        internalLinks = links.filter(link => link.isInternal === 'Yes').length;
        externalLinks = links.filter(link => link.isInternal === 'No').length;
        brokenLinks = links.filter(link => link.status !== 200).length; // Monika Updated Code: Count broken links
        httpsLinks = links.filter(link => link.href.startsWith('https://')).length; // Monika Updated Code: Count HTTPS links
        httpLinks = links.filter(link => link.href.startsWith('http://')).length; // Monika Updated Code: Count HTTP links
        shortUrl = url.slice(0, 31).concat("...");
      } catch (err) {
        error = `Error: ${err.message}`;
      }
    }
 
    function clearData() {
      url = '';
      links = [];
      error = '';
      // Reset link statistics
      noFollowLinks = 0;
      doFollowLinks = 0;
      internalLinks = 0;
      externalLinks = 0;
      brokenLinks = 0; // Monika Updated Code: Reset broken links count
      httpsLinks = 0; // Monika Updated Code: Reset HTTPS links count
      httpLinks = 0; // Monika Updated Code: Reset HTTP links count
    }
 
    function downloadCSV() {
      // Helper function to convert data to CSV format
      function convertToCSV(objArray) {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        // Add header row
        const header = Object.keys(array[0]).join(',');
        str += header + '\r\n';
        // Add data rows
        for (let i = 0; i < array.length; i++) {
          let line = '';
          for (const index in array[i]) {
            if (line !== '') line += ',';
            line += array[i][index];
          }
          str += line + '\r\n';
        }
        return str;
      }
      // Get data from the tables
      const linkData = links.map((link, index) => ({
        '#': index + 1,
        'Link': link.href,
        'Anchor Text': link.text,
        'Type': link.type,
        'Follow': link.followStatus,
        'Internal': link.isInternal,
        'Status': link.status // Monika Updated Code: Include link status in CSV data
      }));
      const summaryData = [
        { 'Statistic': 'URL', 'Value': url },
        { 'Statistic': 'Total Links', 'Value': links.length },
        { 'Statistic': 'No-Follow Links', 'Value': noFollowLinks },
        { 'Statistic': 'Do-Follow Links', 'Value': doFollowLinks },
        { 'Statistic': 'Internal Links', 'Value': internalLinks },
        { 'Statistic': 'External Links', 'Value': externalLinks },
        { 'Statistic': 'Broken Links', 'Value': brokenLinks }, // Monika Updated Code: Include broken links count in summary
        { 'Statistic': 'HTTPS Links', 'Value': httpsLinks }, // Monika Updated Code: Include HTTPS links count in summary
        { 'Statistic': 'HTTP Links', 'Value': httpLinks } // Monika Updated Code: Include HTTP links count in summary
      ];
      // Convert data to CSV format
      const linkCSV = convertToCSV(linkData);
      const summaryCSV = convertToCSV(summaryData);
      // Create a Blob from the CSV string
      const blob = new Blob([summaryCSV + '\r\n' + linkCSV], { type: 'text/csv;charset=utf-8;' });
      // Create a link element and trigger the download
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'links.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  </script>
 
<div class="card gap-16 items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg">
    <div class="p-8">
        <Label for="input-addon" class="mb-2">Enter URL</Label>
        <ButtonGroup class="w-full">
            {#if url === "" && links.length === 0}
                <Input on:keypress={fetchLinks} id="input-addon" type="url" placeholder="https://example.com/" bind:value={url}/>
            {:else}
                <Input on:keypress={fetchLinks} id="input-addon" type="url" placeholder="https://example.com/" bind:value={url}>
                    <CloseButton slot="right" on:click={clearData} />
                </Input>
            {/if}
            <Button color="primary" on:click={fetchLinks}>Search</Button>
        </ButtonGroup>
 
        {#if error.length > 0}
            <Alert color="red" class="mt-6">
                <InfoCircleSolid slot="icon" class="w-5 h-5"/>
                {error}
            </Alert>
        {:else if links.length > 0}
            <Card class="max-w-full border-2 mt-8">
                <div class="grid grid-cols-4 border-gray-200 border-b dark:border-gray-700 pb-4">
                    <dl class="col-span-1">
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Links</dt>
                        <dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">{links.length}</dd>
                    </dl>
                    <dl class="col-span-2">
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">URL</dt>
                        <dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">
                            {#if url.length < 35}
                                <a href={url} target="_blank">{url}</a>
                            {:else}
                                <a href={url} target="_blank">{shortUrl}</a>
                            {/if}
                        </dd>
                    </dl>
                    <dl class="col-span-1 pt-1.5 text-right">
                        <Button color="light" on:click={downloadCSV}>
                            <DownloadOutline/>
                            <span class="pl-2">Download Link Stats</span>
                        </Button>
                    </dl>
                </div>
 
                <div class="grid grid-cols-4 pt-4">
                    <dl>
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Internal</dt>
                        <dd class="leading-none text-xl font-bold text-indigo-500 dark:text-indigo-400">{internalLinks}</dd>
                    </dl>
                    <dl>
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">External</dt>
                        <dd class="leading-none text-xl font-bold text-blue-500 dark:text-blue-400">{externalLinks}</dd>
                    </dl>
                    <dl>
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Do Follow</dt>
                        <dd class="leading-none text-xl font-bold text-green-500 dark:text-green-400">{doFollowLinks}</dd>
                    </dl>
                    <dl>
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">No Follow</dt>
                        <dd class="leading-none text-xl font-bold text-red-600 dark:text-red-500">{noFollowLinks}</dd>
                    </dl>
                    <dl>
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Broken</dt>
                        <dd class="leading-none text-xl font-bold text-gray-900 dark:text-gray-600">{brokenLinks}</dd>
                    </dl>
                    <dl>
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">HTTPS</dt>
                        <dd class="leading-none text-xl font-bold text-blue-900 dark:text-blue-600">{httpsLinks}</dd>
                    </dl>
                    <dl>
                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">HTTP</dt>
                        <dd class="leading-none text-xl font-bold text-red-900 dark:text-red-600">{httpLinks}</dd>
                    </dl>
                </div>
            </Card>
 
            <Card class="max-w-full border-2 mt-8 overflow-hidden" padding="none">
                <div class="block max-h-[400px] overflow-auto">
                <Table>
                    <TableHead>
                        <TableHeadCell class="!p-4">#</TableHeadCell>
                        <TableHeadCell>Link</TableHeadCell>                    
                        <TableHeadCell>Anchor Text</TableHeadCell>
                        <TableHeadCell>Type</TableHeadCell>
                        <TableHeadCell>Internal</TableHeadCell>
                        <TableHeadCell>Follow</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                    </TableHead>
                    <TableBody tableBodyClass="divide-y">
                        {#each links as { href, text, type, followStatus, isInternal, status }, index}
                            <TableBodyRow>
                                <TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
                                <TableBodyCell>
                                    <a href={href} target="_blank" rel="noopener noreferrer">{href.slice(0, 40)}</a>
                                </TableBodyCell>
                                <TableBodyCell>{text.slice(0, 40)}</TableBodyCell>
                                <TableBodyCell>{type}</TableBodyCell>
                                <TableBodyCell>{isInternal}</TableBodyCell>
                                <TableBodyCell>{followStatus}</TableBodyCell>
                                <TableBodyCell>{status}</TableBodyCell>
                            </TableBodyRow>
                        {/each}
                    </TableBody>
                </Table>
                </div>
            </Card>
        {/if}
    </div>
</div>