<script>

</script>

<div class="card gap-16 items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg">

	<!-- Aman Updated The +page.svelte -->

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
		{:else if links.length >0}
			<Card class="max-w-full border-2 mt-8">
				<div class="grid grid-cols-4 border-gray-200 border-b dark:border-gray-700 pb-4">
					<dl class="col-span-1">
						<dt class="text-base font-normal text-gray-500 dark:text-gray-400">Links</dt>
						<dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">{links.length}</dd>
					</dl>
					<dl class="col-span-2">
						<dt class="text-base font-normal text-gray-500 dark:text-gray-400">URL</dt>
						<dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">
							{#if url.length<35}
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
					</TableHead>
					<TableBody tableBodyClass="divide-y">
						{#each links as { href, text, type, followStatus, isInternal }, index}
							<TableBodyRow>
								<TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
								<TableBodyCell>
									<a href={href} target="_blank" rel="noopener noreferrer">{href.slice(0, 40)}</a>
								</TableBodyCell>
								<TableBodyCell>{text.slice(0, 40)}</TableBodyCell>
								<TableBodyCell>{type}</TableBodyCell>
								<TableBodyCell>{isInternal}</TableBodyCell>
								<TableBodyCell>{followStatus}</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
				</div>
			</Card>
		{/if}
	</div>
</div>

<style>

</style>