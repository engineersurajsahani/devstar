<script lang="ts"> 
	import { Input, ButtonGroup, Label, Button, CloseButton, Card, Alert } from 'flowbite-svelte';
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { InfoCircleSolid, DownloadOutline } from 'flowbite-svelte-icons';

	let url = '';
	let links = [];
	let error = '';
	let shortUrl='';

	// Variables to store link statistics
	let noFollowLinks = 0;
	let doFollowLinks = 0;
	let internalLinks = 0;
	let externalLinks = 0;

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
			shortUrl = url.slice(0,31).concat("...");
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
        'Internal': link.isInternal
    }));

    const summaryData = [
        { 'Statistic': 'URL', 'Value': url },
        { 'Statistic': 'Total Links', 'Value': links.length },
        { 'Statistic': 'No-Follow Links', 'Value': noFollowLinks },
        { 'Statistic': 'Do-Follow Links', 'Value': doFollowLinks },
        { 'Statistic': 'Internal Links', 'Value': internalLinks },
        { 'Statistic': 'External Links', 'Value': externalLinks }
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

<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	<!-- Add tool here -->
</div>

<style>

</style>