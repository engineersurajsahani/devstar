<script>
    import { onMount } from 'svelte';
	import html2canvas from 'html2canvas';

    let currentPage = 'home';

	//navigaet to page
    function navigate(page) {
        currentPage = page;
    }

   onMount(() => {
  shapes = document.querySelectorAll('.shape-item');
  shapes.forEach((shape) => {
    shape.addEventListener('resize', (event) => {
      handleShapeResize(event, shape.id);
    });
  });
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

	 // Function to handle search
	 let shapes = [];

onMount(() => {
  shapes = document.querySelectorAll('.shape-item');
});

function handleSearch(event) {
  const searchQuery = event.target.value.toLowerCase();
  const shapes = document.querySelectorAll('.shape-item');
  shapes.forEach((shape) => {
	const shapeName = shape.id.toLowerCase();
	if (shapeName.includes(searchQuery)) {
	  shape.style.display = 'block';
	} else {
	  shape.style.display = 'none';
	}
  });
}

 // Function to handle shape resizing
    function handleShapeResize(event, shapeId) {
        const shape = document.getElementById(shapeId);
        const rect = shape.getBoundingClientRect();
        const width = event.clientX - rect.left;
        const height = event.clientY - rect.top;

        shape.style.width = `${width}px`;
        shape.style.height = `${height}px`;
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
						<input type="text" placeholder="search shape..." on:input={handleSearch}>
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
                            <div class="shape-item" id="circle" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape circle"></div>
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
							<div class="shape-item" id="trapezoid" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape trapezoid"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>
							<div class="shape-item" id="triangle" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape triangle"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>

							<div class="shape-item" id="hexagon" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							}}>
								<div class="shape hexagon"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							</div>

							<div class="shape-item" id="decision" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							  }}>
								<div class="shape decision"></div>
								<i class="fas fa-trash" on:click={deleteShape}></i>
							  </div>

							<div class="shape-item" id="arrow-up" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							  }}>
								<div class="shape arrow-up"></div>
							  </div>
							  <div class="shape-item" id="arrow-down" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							  }}>
								<div class="shape arrow-down"></div>
							  </div>
							  <div class="shape-item" id="arrow-left" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							  }}>
								<div class="shape arrow-left"></div>
							  </div>
							  <div class="shape-item" id="arrow-right" draggable="true" on:dragstart={(e) => {
								e.dataTransfer.setData('text/plain', e.target.id);
							  }}>
								<div class="shape arrow-right"></div>
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
  width: 40px; /* updated width */
  height: 40px; /* updated height */
}

.shape {
  width: 30px; /* updated width */
  height: 30px; /* updated height */
  border: 2px solid black;
  background-color: #ADD8E6; /* Make all shapes black */
}

	.rectangle {
		width: 20px;
		height: 20px;
	}

	.circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ADD8E6; /* Make all shapes black */
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

	.trapezoid {
		width: 30px;
		height: 15px;
		clip-path: polygon(0 0, 30px 0, 25px 15px, 5px 15px);
	}

	.triangle {
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 30px solid black;
	}

	.hexagon {
  width: 30px;
  height: 30px;
  background-color: #ADD8E6;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

	.decision {
  width: 30px;
  height: 30px;
  border: 2px solid black;
  background-color: #ADD8E6; /* Make all shapes black */
  transform: rotate(45deg);
}

	.arrow-up {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid black;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 20px solid black;
}

.arrow-left {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 20px solid black;
}

.arrow-right {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 20px solid black;
}

	.shape-item i {
  display: none;
}

.elements-section {
  position: relative;
}

.elements-section::before {
  content: "\f1f8"; /* FontAwesome trash icon */
  font-family: FontAwesome;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  color: red;
  cursor: pointer;
}

/* Search Bar Styles */

.search-bar {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #C0C0C0;
}

.search-bar input[type="search"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #C0C0C0;
}

.search-bar button[type="submit"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #FF8C00;
  color: white;
  cursor: pointer;
}

.search-bar button[type="submit"]:hover {
  background-color: #FFA07A;
}

/* Responsive Styles */

@media only screen and (max-width: 768px) {
 .dashboardbody.sidebar {
    width: 200px;
  }
}

@media only screen and (max-width: 576px) {
 .dashboardbody.sidebar {
    width: 150px;
  }
}

</style>