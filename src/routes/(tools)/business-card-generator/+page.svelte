<script>
    import html2canvas from 'html2canvas';
    import jsPDF from 'jspdf';
    import BusinessCard from './BusinessCard.svelte';

    let name = '';
    let title = '';
    let email = '';
    let phone = '';
    let primaryColor = '#007BFF';
    let secondaryColor = '#FFFFFF'; // Default secondary color is white
    let selectedTemplate = 'template1';
    const templates = ['template1', 'template2', 'template3', 'template4'];

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function applyRandomPalette() {
        primaryColor = getRandomColor();
        // Ensure secondaryColor is either black (#000000) or white (#FFFFFF)
        secondaryColor = ['#000000', '#FFFFFF'][Math.floor(Math.random() * 2)];
    }

    function downloadAsImage() {
        html2canvas(document.querySelector("#card")).then(canvas => {
            let link = document.createElement('a');
            link.download = 'business-card.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }

    function downloadAsPDF() {
        html2canvas(document.querySelector("#card")).then(canvas => {
            const pdf = new jsPDF();
            pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 10, 10, 85, 54);
            pdf.save('business-card.pdf');
        });
    }
</script>

<body>
    <style>
        :root {
            --primary-color: #007BFF;
            --secondary-color: #FFFFFF; /* Default secondary color */
        }

        body {
            display: content-box;
            background-color: var(--page-background-color);
            border: 5px solid grey;
            border-radius: 14px;
            padding: 20px;
            text-align: justify;
            justify-content: auto;
            font-family: Arial, sans-serif;
            width: full-width;
        }

        .form {
            display: flex;
            flex-direction: column;
            width: 60%;
            margin-bottom: 20px;
            margin: 30px;
            padding: 20px;
            text-align: justify;
        }

        .form input {
            margin-bottom: 10px;
            padding: 5px;
            font-size: 1em;
            text-align: justify;
            justify-content: center;
        }

        .templates {
            display: flex;
            align-items: center; /* Align items vertically */
            margin-bottom: 40px;
        }

        .template {
            width: 100px;
            height: 60px;
            border: 1px solid #ccc;
            margin-right: 10px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.8em;
            text-align: center;
            color: gray;
        }

        .template.selected:hover {
            border: 2px solid blue;
            color: gray;
        }

        #card {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .button-group {
            margin-top: 20px;
            display: flex; /* Display buttons in a row */
            align-items: center; /* Align items vertically */
        }

        button {
            margin-right: 10px;
            padding: 5px 10px;
            font-size: 1em;
            cursor: pointer;
            background-color: cornflowerblue;
            border: 1px solid cornflowerblue;
            border-radius: 8px;
            color: white;
        }

        #button1:hover,
        #button2:hover {
            color: lightsteelblue;
        }

        .colorbox {
            display: block;
            border: 1px solid grey;
            text-align: justify;
            padding: 20px;
            width: full-width;
            margin-top: 15px;
        }

        #primary,
        #secondary {
            display: block;
            padding: 5px;
            text-align: justify;
            color: cadetblue;
            margin-top: 15px;
        }
    </style>

    <div class="form">
        <input type="text" bind:value={name} placeholder="Name" />
        <input type="text" bind:value={title} placeholder="Title" />
        <input type="email" bind:value={email} placeholder="Email" />
        <input type="tel" bind:value={phone} placeholder="Phone" />
        <div class="colorbox">
            <label for="primary" id="primary">Primary Color</label><br>
            <input type="color" bind:value={primaryColor} /><br>
            <label for="secondary" id="secondary">Secondary Color</label><br>
            <input type="color" bind:value={secondaryColor} />
        </div>
    </div>

    <div class="templates">
        {#each templates as template}
        <div class="template {selectedTemplate === template ? 'selected' : ''}" on:click={() => selectedTemplate = template}>
            {template}
        </div>
        {/each}
        <button on:click={applyRandomPalette} style="margin-left: 10px;">Random Palette</button>
    </div>

    <div id="card" class={selectedTemplate}>
        <BusinessCard {name} {title} {email} {phone} {primaryColor} {secondaryColor} template={selectedTemplate} />
    </div>

    <div class="button-group">
        <button on:click={downloadAsImage} id="button1">Download as PNG</button>
        <button on:click={downloadAsPDF} id="button2">Download as PDF</button>
    </div>

</body>