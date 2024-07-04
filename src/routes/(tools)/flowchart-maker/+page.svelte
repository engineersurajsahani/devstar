<script>
    import { onMount } from 'svelte';
	import html2canvas from 'html2canvas';

    let currentPage = 'home';

	//navigaet to page
    function navigate(page) {
        currentPage = page;
    }

    onMount(() => {
        console.log('Component mounted');
    });

	// download the flowchart
	function downloadAsImage() {
    const element = document.getElementById('content-to-download');

    const paragraphs = element.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.style.display = 'none';
    });

    html2canvas(element).then(canvas => {
        paragraphs.forEach(p => {
            p.style.display = '';
        });

        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'download.png';
        a.click();
    });
}

	// Function to handle shape deletion
	function deleteShape(event) {
		const shape = event.target.closest('.shape-item');
		if (shape) {
			shape.remove();
		}
	}
</script>


<div class="card gap-16 items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    {#if currentPage === 'home'}
		<!-- home page -->
        <div class="mainbody">
            <div class="top">
                <div class="search"></div>
            </div>
        
            <div class="heading">
                <div class="left">
                    <p><marquee>Streamline Your Workflow with Clarity</marquee></p>
                    <p>The ultimate tool for transforming complex ideas into <br>clear visual representation. Streamline your workflow <br> with user-friendly, drag and drop flowchart creations<br>& effortlessly design professional diagrams in minutes</p>
                    <p>Let's start to make your own flowchart</p>
                    <button on:click={() => navigate('dashboard')}>Let's Make </button>
                </div>
        
                <div class="right" id="flowchart"></div>
                <div class="SocialMedia">
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-github"></i>
                </div>
            </div>
        </div>
		{:else if currentPage === 'dashboard'}

		<!-- dashboard page-->
        <div class="dashboardbody">
			<div class="main-content">
				<div class="sidebar">
					<div class="dashboard" id="dashboard-logo">
					</div>

					<button class="home-button" on:click={() => navigate('home')}>Home</button>
					<div class="search-bar">
						<input type="text" placeholder="search shape...">
					</div>

					<button class="add-text">Add Text</button>

					<div class="elements-section">
						<h3>Elements Section</h3>
						<div class="shapes-container" draggable="true" on:dragstart={(e) => {
							e.dataTransfer.setData('text/plain', e.target.id);
						}}>
							<div class="shape-item" id="rectangle" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape rectangle"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="diamond" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape diamond"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="oval" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape oval"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="parallelogram" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape parallelogram"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="cloud" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape cloud"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="double-cloud" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape double-cloud"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="trapezoid" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape trapezoid"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="hexagon" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape hexagon"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="rhombus" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape rhombus"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="cylinder" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape cylinder"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="double-cylinder" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape double-cylinder"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="data" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape data"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="flag" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape flag"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="triangle" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape triangle"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="circle" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape circle"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="plus" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape plus"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="multiply" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape multiply"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="pentagon" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape pentagon"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="heart" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape heart"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="curly-braces" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape curly-braces"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="square-braces" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape square-braces"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="grid-vertical" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape grid-vertical"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="grid-horizontal" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape grid-horizontal"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
						</div>
					</div>

					<button class="download-button" on:click={downloadAsImage}>Download</button>
				</div>

				<div id="content-to-download" class="content" on:drop={(e) => {
					e.preventDefault();
					const data = e.dataTransfer.getData('text/plain');
					const shape = document.getElementById(data);
					const clone = shape.cloneNode(true);
					clone.style.position = 'absolute';
					clone.style.left = e.clientX + 'px';
					clone.style.top = e.clientY + 'px';
					clone.style.width = '50px';
					clone.style.height = '50px';
					clone.style.margin = '10px';
					e.target.appendChild(clone);
				}} on:dragover={(e) => {
					e.preventDefault();
				}}>
					<p><marquee>Visualize your ideas with flow</marquee></p>
				</div>
				
			</div>
		</div>

    {/if}

</div>

<style>

	/** css for home page */
	.mainbody {
		width: 100%;
		height: 600px;
		background-image: url('Background2.png');
		background-size: cover;
	}

	.heading {
		display: flex;
		justify-content: space-evenly;
		padding-top: 65px;
		align-items: center;
		flex-wrap: wrap;
	}

	.right {
		width: 400px;
		height: 400px;
		background-image: url('flow-chart.gif');
		background-size: cover;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 4.1%;
		margin-right: 3%;
		position: relative; 
	}

	.right::before {
		content: '';
		position: absolute;
		width: 420px; 
		height: 420px; 
		border: 2px solid white;
		border-radius: 50%;
		top: -10px; 
		left: -10px; 
	}

	.left p:nth-child(1) {
		color: orange;
		font-size: 30px;
		letter-spacing: 1px;
		font-style: italic;
		white-space: nowrap; 
		overflow: hidden;
		box-sizing: border-box;
		animation: marquee 15s linear infinite;
		margin-top: 2%;
	}
	.left p:nth-child(2) {
		color: white;
		font-size: 21px;
		letter-spacing: 1px;
		padding-top: 20px;
		padding-bottom: 15px;
	}
	.left h1 {
		font-size: 90px;
		color: white;
	}
	.left p:nth-child(3) {
		color: orange;
		font-size: 30px;
		font-style: italic;
		padding-bottom: 20px;
	}

	/*SocialMedia*/
	.SocialMedia {
		position: absolute;
		right: 11%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: column;
		width: 40px;
		height: 200px;
		margin-top: 2%;
		background-color: white;
		font-size: 25px;
	}

	.SocialMedia i:hover {
		color: orange;
	}



	.left button {
		width: 150px;
		height: 50px;
		font-size: 18px;
		border-radius: 20px;
		border: 2px solid white;
		background-color: transparent;
		color: white;
		margin: 20px 0px;
		position: relative;
		overflow: hidden;
		z-index: 1;
	}

	.left button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background-color: orange;
		transition: left 0.4s ease;
		z-index: -1;
	}
	.left button:hover::before {
		left: 0;
	}
	.left button:hover {
		color: white;
	}

	/* css for dashboard */

	.dashboardbody {
        display: flex;
        flex-direction: column;
        height: 1000px;
        font-family: Arial, sans-serif;
    }

    .dashboardbody .main-content {
        display: flex;
        flex: 1;
        background-color: #F0F0F0;
        overflow: hidden;
    }

    .dashboardbody .sidebar {
		position: relative;
        width: 300px;
        background-color: #D3D3D3; 
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
    }

    .dashboardbody .search-bar {
        margin-bottom: 20px;
    }

    .dashboardbody .search-bar input {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #C0C0C0;
    }

    .dashboardbody .color-section, .dashboardbody .elements-section {
        margin-bottom: 20px;
		position: relative;
        padding: 20px;
        background-color: white;
        border: 1px solid #C0C0C0;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .dashboardbody .elements-section {
        background-color: #ADD8E6; 
		height: 480px;
    }

    .dashboardbody .content {
        flex: 1;
        padding: 20px;
        box-sizing: border-box;
        overflow-y: auto;
        position: relative;
    }

    .dashboardbody .content h2 {
        color: #333;
        margin-bottom: 20px;
    }

    .dashboardbody .content p {
        line-height: 1.6;
    }

    .dashboardbody  .home-button, .dashboardbody .add-text{
    width: 100%;
    height: 50px;
    font-size: 18px;
    border-radius: 15px;
    border: black; 
    background-color: #FF8C00; 
    color: white;
    margin: 20 0px;
	margin-bottom: 20px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: all 0.2s linear;
}

.dashboardbody  .home-button::before {
    content: "\f060"; /* FontAwesome left arrow icon */
    font-family: FontAwesome;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 30px;
    transform: scale(0, 1);
    transition: all 0.2s linear;
    background-color: rgba(255, 255, 255, 0.2);
}

.dashboardbody  .home-button:hover {
    text-indent: -9999px;
}

.dashboardbody  .home-button:hover::before {
    transform: scale(1, 1);
    text-indent: 0;
}

.dashboardbody .add-text{

}

/* Download button */
.dashboardbody  .download-button {
	position: absolute;
    width: 100%;
    height: 50px;
    font-size: 18px;
    border-radius: 15px;
    border: black; 
    background-color: #FF8C00; 
    color: white;
    margin: 20 0px;
	margin-bottom: 10px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: all 0.2s linear;
}

.dashboardbody  .download-button::before {
    content: "\f019"; /* FontAwesome download icon */
    font-family: FontAwesome;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 30px;
    transform: scale(0, 1);
    transition: all 0.2s linear;
    background-color: rgba(255, 255, 255, 0.2);
}

.dashboardbody  .download-button:hover {
    text-indent: -9999px;
}

.dashboardbody  .download-button:hover::before {
    transform: scale(1, 1);
    text-indent: 0;
}

.dashboard {
		width: 150px;
		height: 150px;
		background-image: url('task.gif');
		background-size: cover;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 4.1%;
		margin-left: 20%;
		margin-bottom: 10%;
		position: relative; 
	}

	.content p{
		color: orange;
		font-size: 30px;
		letter-spacing: 1px;
		font-style: italic;
		white-space: nowrap; 
		overflow: hidden;
		box-sizing: border-box;
		animation: marquee 15s linear infinite;
	}

	/* Shapes CSS */
	.shapes-container {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 10px;
	}

	.shape-item {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #ccc;
		border-radius: 5px;
		cursor: pointer;
		position: relative;
	}

	.shape {
  width: 20px;
  height: 20px;
  border: 2px solid black;
  background-color: black; /* Make all shapes black */
}

	.rectangle {
		width: 20px;
		height: 20px;
	}

	.diamond {
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 30px solid black;
	}

	.oval {
		width: 25px;
		height: 15px;
		border-radius: 50%;
	}

	.parallelogram {
		width: 30px;
		height: 15px;
		transform: skewX(20deg);
	}

	.cloud {
		width: 30px;
		height: 15px;
		border-radius: 50% 50% 0 0;
	}

	.double-cloud {
		width: 30px;
		height: 15px;
		border-radius: 50% 50% 0 0;
	}

	.trapezoid {
		width: 30px;
		height: 15px;
		clip-path: polygon(0 0, 30px 0, 25px 15px, 5px 15px);
	}

	.hexagon {
		width: 30px;
		height: 30px;
		clip-path: polygon(15px 0, 30px 7.5px, 30px 22.5px, 15px 30px, 0 22.5px, 0 7.5px);
	}

	.rhombus {
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 30px solid black;
		transform: rotate(45deg);
	}

	.cylinder {
		width: 10px;
		height: 25px;
		border-radius: 5px 5px 0 0;
		background-color: black;
	}

	.double-cylinder {
		width: 10px;
		height: 25px;
		border-radius: 5px 5px 0 0;
		background-color: black;
	}

	.data {
		width: 30px;
		height: 15px;
		border: 2px solid black;
		border-radius: 5px;
		background-color: black; /* Make data shape black */
	}

	.flag {
		width: 30px;
		height: 15px;
		border: 2px solid black;
		border-radius: 5px;
		transform: rotate(45deg);
	}

	.triangle {
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 30px solid black;
	}

	.circle {
		width: 25px;
		height: 25px;
		border-radius: 50%;
	}

	.plus {
		width: 25px;
		height: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.plus::before,
	.plus::after {
		content: '';
		position: absolute;
		width: 2px;
		height: 15px;
		background-color: black;
	}

	.plus::before {
		transform: rotate(90deg);
	}

	.multiply {
		width: 25px;
		height: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.multiply::before,
	.multiply::after {
		content: '';
		position: absolute;
		width: 2px;
		height: 15px;
		background-color: black;
	}

	.multiply::before {
		transform: rotate(45deg);
	}

	.multiply::after {
		transform: rotate(-45deg);
	}

	.pentagon {
		width: 25px;
		height: 25px;
		clip-path: polygon(50% 0, 100% 19%, 81% 49%, 19% 49%, 0 19%);
	}

	.heart {
		width: 25px;
		height: 25px;
		background-color: red;
		border-radius: 50% 50% 0 0;
		position: relative;
	}

	.heart::before,
	.heart::after {
		content: '';
		position: absolute;
		width: 25px;
		height: 25px;
		background-color: red;
		border-radius: 50% 50% 0 0;
		top: 0;
	}

	.heart::before {
		transform: rotate(45deg);
	}

	.heart::after {
		transform: rotate(-45deg);
	}

	.curly-braces {
		width: 25px;
		height: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.curly-braces::before,
	.curly-braces::after {
		content: '';
		position: absolute;
		width: 2px;
		height: 15px;
		background-color: black;
	}

	.curly-braces::before {
		transform: rotate(90deg);
		border-radius: 0 0 5px 0;
	}

	.curly-braces::after {
		transform: rotate(90deg);
		border-radius: 0 0 0 5px;
	}

	.square-braces {
		width: 25px;
		height: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.square-braces::before,
	.square-braces::after {
		content: '';
		position: absolute;
		width: 2px;
		height: 15px;
		background-color: black;
	}

	.square-braces::before {
		transform: rotate(90deg);
		border-radius: 3px 3px 0 0;
	}

	.square-braces::after {
		transform: rotate(90deg);
		border-radius: 0 0 3px 3px;
	}

	.grid-vertical {
		width: 25px;
		height: 25px;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		border: 2px solid black;
	}

	.grid-horizontal {
		width: 25px;
		height: 25px;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		border: 2px solid black;
		transform: rotate(90deg);
	}
	
	/* Delete button styling */
	.shape-item i {
		position: absolute;
		top: 5px;
		right: 5px;
		font-size: 12px;
		color: red;
		cursor: pointer;
	}
</style>