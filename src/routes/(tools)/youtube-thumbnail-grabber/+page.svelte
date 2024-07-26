<script>
    let url = '';
    let thumbnail = '';

    function getVideo(url) {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get('v');
        if (videoId) {
            return videoId;
        }
        // For shortened URLs or other formats
        const pathSegments = urlObj.pathname.split('/');
        return pathSegments[pathSegments.length - 1];
    }

    function getThumbnail() {
        const videoId = getVideo(url);
        if (videoId) {
            thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        } else {
            thumbnail = '';
        }
    }
</script>


<main>
<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	<!-- Add tool here -->
     <h1>YouTube Thumbnail Grabber</h1>
    <input
        type="text"
        placeholder="Enter the URL of YouTube video"
        bind:value={url}
        on:input={getThumbnail}
    />
    {#if thumbnail}
        <img src={thumbnail} alt="YouTube Thumbnail" />
    {/if}
</main>

<style>
    main {
        text-align: center;
        margin: 1em;
        font-family: Arial, sans-serif;
    }

    input {
        width: 80%;
        padding: 0.5em;
        margin: 0.5em;
        font-size: 1em;
    }

    img {
        max-width: 100%;
        height: auto;
        margin-top: 1em;
    }
</style>