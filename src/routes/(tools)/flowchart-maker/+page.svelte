<script>
  import { onMount } from 'svelte';
  import html2canvas from 'html2canvas';

  let currentPage = 'home';
  let rectangles = [];
  let circles = [];
  let ovals = [];
  let rhombuses = [];
  let parallelograms = [];
  let triangles = [];
  let hexagons = [];
  let ors = [];
  let rightarrows = [];
  let leftarrows = [];
  let uparrows = [];
  let downarrows = [];

  // navigate to page
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

  // add a rectangle shape
  function addRectangle() {
    rectangles = [...rectangles, { el: null, isMoving: false, startX: 0, startY: 0 }];
  }

  // add a circle shape
  function addCircle() {
    circles = [...circles, { el: null, isMoving: false, startX: 0, startY: 0 }];
  }

  // add an oval shape
  function addOval() {
    ovals = [...ovals, { el: null, isMoving: false, startX: 0, startY: 0 }];
  }

  // add a rhombus shape
  function addRhombus() {
    rhombuses = [...rhombuses, { el: null, isMoving: false, startX: 0, startY: 0 }];
  }

  // add a parallelogram shape
  function addParallelogram() {
    parallelograms = [...parallelograms, { el: null, isMoving: false, startX: 0, startY: 0, width: 150, height: 100 }];
  }

   // add a triangle shape
   function addTriangle() {
    triangles = [...triangles, { el: null, isMoving: false, startX: 0, startY: 0 }];
  }

  // add a hexagon shape
  function addHexagon() {
    hexagons = [...hexagons, { el: null, isMoving: false, startX: 0, startY: 0 }];
  }

   // add a or shape
   function addOr() {
    ors = [...ors, { el: null, isMoving: false, startX: 0, startY: 0 }];
  }


  // add a arrow
  function addRightarrow() {
    rightarrows = [...rightarrows, { el: null, isMoving: false, startX: 0, startY: 0 }];
  }

  // add a arrow
  function addLeftarrow() {
    leftarrows = [...leftarrows, { el: null, isMoving: false, startX: 0, startY: 0 }];
  }

  // add a arrow
  function addUparrow() {
    uparrows = [...uparrows, { el: null, isMoving: false, startX: 0, startY: 0 }];
  }

  // add a arrow
  function addDownarrow() {
    downarrows = [...downarrows, { el: null, isMoving: false, startX: 0, startY: 0 }];
  }


// handle mouse down events for moving and resizing shapes
function handleMouseDown(index, action, type) {
    return function (event) {
      event.stopPropagation();

       let items;
      if (type === 'rectangle') {
        items = rectangles;
      } else if (type === 'circle') {
        items = circles;
      } else if (type === 'oval') {
        items = ovals;
      } else if (type === 'rhombus') {
        items = rhombuses;
      } else if (type === 'parallelogram') {
        items = parallelograms;
      } else if (type === 'triangle') {
        items = triangles;
      } else if (type === 'hexagon') {
        items = hexagons;
      } else if (type === 'or') {
        items = ors;
      } else if (type === 'rightarrow') {
        items = rightarrows;
      } else if (type === 'leftarrow') {
        items = leftarrows;
      } else if (type === 'downarrow') {
        items = downarrows;
      } else if (type === 'uparrow') {
        items = uparrows;
      }

      if (action === 'move') {
        items[index].isMoving = true;
        items[index].startX = event.clientX - items[index].el.offsetLeft;
        items[index].startY = event.clientY - items[index].el.offsetTop;
      } else if (action === 'resize') {
        const rect = items[index].el.getBoundingClientRect();
        const offsetX = event.clientX - rect.right;
        const offsetY = event.clientY - rect.bottom;

        items[index].isResizing = true;
        items[index].startWidth = rect.width;
        items[index].startHeight = rect.height;
        items[index].startX = event.clientX - items[index].el.offsetLeft;
        items[index].startY = event.clientY - items[index].el.offsetTop;
        items[index].offsetX = offsetX;
        items[index].offsetY = offsetY;
      }

      //handle mouse move and up events
      function handleMouseMove(event) {
        if (items[index].isMoving) {
          items[index].el.style.left = `${event.clientX - items[index].startX}px`;
          items[index].el.style.top = `${event.clientY - items[index].startY}px`;
        } else if (items[index].isResizing) {
          const newWidth = items[index].startWidth + (event.clientX - items[index].startX - items[index].offsetX);
          const newHeight = items[index].startHeight + (event.clientY - items[index].startY - items[index].offsetY);
          items[index].el.style.width = `${newWidth}px`;
          items[index].el.style.height = `${newHeight}px`;
        }
      }

      function handleMouseUp() {
        if (items[index].isMoving) {
          items[index].isMoving = false;
        } else if (items[index].isResizing) {
          items[index].isResizing = false;
        }
        
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
  }

  let selectedColor2 = '';

// Function to change background color of divs
function changeTextColor() {
    let divs = document.querySelectorAll('.content div');
    divs.forEach(div => {
        div.style.color = selectedColor2;
    });
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
        <p>The ultimate tool for transforming complex ideas into <br>clear visual representation. Streamline your workflow <br> with user-friendly, drag and drop flowchart creations<br>& effortlessly design professional diagrams in minute</p>
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
        <div class="dashboard" id="dashboard-logo"></div>

        <button class="home-button" on:click={() => navigate('home')}>Home</button>

        <div class="elements-section">
         
        Text Color
        <select bind:value={selectedColor2} on:change={changeTextColor}>
          <option value="">Change Text color</option>
          <option value="#FFFFFF">White</option>
          <option value="#000000">Black</option>
          <option value="#FF0000">Red</option>
          <option value="#00FF00">Green</option>
          <option value="#0000FF">Blue</option>
          <option value="#FFFF00">Yellow</option>
          <option value="#800080">Purple</option>
          <option value="#FFA500">Orange</option>
          <option value="#808080">Gray</option>
      </select>
      
          <!-- Add buttons for each shape -->
          <button class="rectangle-button" id="rectangle" on:click={addRectangle}>Process</button>
          <button class="circle-button" id="circle" on:click={addCircle}>Circle</button>
          <button class="oval-button" id="oval" on:click={addOval}>Terminator</button>
          <button class="rhombus-button" id="rhombus" on:click={addRhombus}>Decision</button>
          <button class="parallelogram-button" id="parallelogram" on:click={addParallelogram}>Data</button>
          <button class="triangle-button" id="triangle" on:click={addTriangle}>Merge</button>
          <button class="hexagon-button" id="hexagon" on:click={addHexagon}>Preparation</button>
          <button class="or-button" id="or" on:click={addOr}>Or</button>
          <button class="rightarrow-button" id="rightarrow" on:click={addRightarrow}>Right Arrow</button>
          <button class="leftarrow-button" id="leftarrow" on:click={addLeftarrow}>Left Arrow</button>
          <button class="downarrow-button" id="downarrow" on:click={addDownarrow}>Down Arrow</button>
          <button class="uparrow-button" id="uparrow" on:click={addUparrow}>Up Arrow</button>
        </div>

        <button class="download-button" on:click={downloadAsImage}>Download</button>
      </div>

      <!-- content to be downloaded-->
      <div id="content-to-download" class="content">
        <p><marquee>Visualize your ideas with flow</marquee></p>


        <span style="float: right;">
          <i style="color: red; font-size: 30px; cursor: pointer;" class="fa-solid fa-trash" on:click={() => deleteShape(index, type)}></i>
          </span>
    

        <!-- Rendering of every shape -->
        {#each rectangles as rectangle, index (rectangle)}
          <div class="rectangle resizable"
               bind:this={rectangle.el}
               on:mousedown={handleMouseDown(index, 'move', 'rectangle')}>
            <div class="rectangle-textbox" contenteditable="true">
            </div>
            <div class="resizer" on:mousedown={handleMouseDown(index, 'resize', 'rectangle')}></div>
          </div>
        {/each}

        {#each circles as circle, index (circle)}
          <div class="circle resizable"
               bind:this={circle.el}
               on:mousedown={handleMouseDown(index, 'move', 'circle')}>
            <div class="circle-textbox" contenteditable="true"></div>
            <div class="resizer" on:mousedown={handleMouseDown(index, 'resize', 'circle')}></div>
          </div>
        {/each}

        {#each ovals as oval, index (oval)}
          <div class="oval resizable"
               bind:this={oval.el}
               on:mousedown={handleMouseDown(index, 'move', 'oval')}>
            <div class="oval-textbox" contenteditable="true"></div>
            <div class="resizer" on:mousedown={handleMouseDown(index, 'resize', 'oval')}></div>
          </div>
        {/each}

      {#each rhombuses as rhombus, index (rhombus)}
        <div class="rhombus"
            bind:this={rhombus.el}
            on:mousedown={handleMouseDown(index, 'move', 'rhombus')}>
          <div class="rhombus-textbox" contenteditable="true"></div>
        </div>
      {/each}

      {#each parallelograms as parallelogram, index (parallelogram)}
        <div class="parallelogram"
            bind:this={parallelogram.el}
            on:mousedown={handleMouseDown(index, 'move', 'parallelogram')}
            style={`left: ${parallelogram.left}px; top: ${parallelogram.top}px;`}>
          <div class="parallelogram-textbox" contenteditable="true"></div>
          <div class="resize-handle bottom-right" on:mousedown={handleMouseDown(index, 'resize', 'parallelogram')}></div>
        </div>
      {/each}

      {#each triangles as triangle, index (triangle)}
        <div class="triangle"
            bind:this={triangle.el}
            on:mousedown={handleMouseDown(index, 'move', 'triangle')}
            style={`left: ${triangle.left}px; top: ${triangle.top}px;`}>
          <div class="triangle-textbox" contenteditable="true"></div>
        </div>
      {/each}

      {#each hexagons as hexagon, index (hexagon)}
        <div class="hexagon"
            bind:this={hexagon.el}
            on:mousedown={handleMouseDown(index, 'move', 'hexagon')}
            style={`left: ${hexagon.left}px; top: ${hexagon.top}px;`}>
          <div class="hexagon-textbox" contenteditable="true"></div>
        </div>
      {/each}

      {#each ors as or, index (or)}
        <div class="or"
            bind:this={or.el}
            on:mousedown={handleMouseDown(index, 'move', 'or')}>
            <div class="horizontal-diameter"></div>
            <div class="vertical-diameter"></div>
        </div>
      {/each}

      {#each rightarrows as rightarrow, index (rightarrow)}
        <div class="rightarrow"
            bind:this={rightarrow.el}
            on:mousedown={handleMouseDown(index, 'move', 'rightarrow')}>
        </div>
      {/each}

      {#each leftarrows as leftarrow, index (leftarrow)}
        <div class="leftarrow"
            bind:this={leftarrow.el}
            on:mousedown={handleMouseDown(index, 'move', 'leftarrow')}>
        </div>
      {/each}

      {#each downarrows as downarrow, index (downarrow)}
        <div class="downarrow"
            bind:this={downarrow.el}
            on:mousedown={handleMouseDown(index, 'move', 'downarrow')}>
        </div>
      {/each}

      {#each uparrows as uparrow, index (uparrow)}
        <div class="uparrow"
            bind:this={uparrow.el}
            on:mousedown={handleMouseDown(index, 'move', 'uparrow')}>
        </div>
      {/each}

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

/*left*/
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

/*SocialMedia**/
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

/*lets make*/
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
    height: 550px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.elements-section select{
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  background-color: white;
}
.elements-section button {
    margin-bottom: 10px;
    height: 50px;
    width: calc(50% - 10px); 
    border: 1px solid #ccc; 
    background-color: white;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  .elements-section button:hover {
    background-color: #f0f0f0; 
    border-color: #999; 
  }


.dashboardbody .content {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.dashboardbody .content h2 {
  color: #333;
  margin-bottom: 20px;
}

.dashboardbody .content p {
  line-height: 1.6;
}

.dashboardbody .home-button {
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

.dashboardbody .home-button::before {
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

.dashboardbody .home-button:hover {
  text-indent: -9999px;
}

.dashboardbody .home-button:hover::before {
  transform: scale(1, 1);
  text-indent: 0;
}

/* Download button */
.dashboardbody .download-button {
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

.dashboardbody .download-button::before {
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

.dashboardbody .download-button:hover {
  text-indent: -9999px;
}

.dashboardbody .download-button:hover::before {
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

.content p {
  color: orange;
  font-size: 30px;
  letter-spacing: 1px;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  animation: marquee 15s linear infinite;
}

/* shapes and their css along with their text box */
.rectangle, .circle {
  background-color: lightblue;
  margin: 10px 0;
  position: absolute; 
  display: flex;
  flex-direction: column;
  cursor: move; 
}

.rectangle {
  width: 150px;
  height: 100px;
}

.circle {
  width: 150px;
  height: 150px;
  border-radius: 50%; 
  position: relative; 
  overflow: hidden; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-textbox {
  max-width: calc(100% - 20px); 
  max-height: calc(100% - 20px); 
  padding: 5px;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none; 
  flex: 1;
  text-align: center;
}

.rectangle-textbox{
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
  padding: 5px;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none; 
  flex: 1; 
}

.resizable {
  position: relative;
}

.resizer {
  width: 10px;
  height: 10px;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: se-resize;
}

.oval {
    width: 150px;
    height: 100px; 
    border-radius: 50%;
    background-color: lightblue;
  position: absolute;
  right: 0;
  top: 0;
  cursor: se-resize; 
  }

  .oval .resizer {
    width: 10px;
    height: 10px;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: se-resize;
  }

  .oval-textbox {
    width: calc(100% - 40px); 
    height: calc(100% - 70px);
    border: none;
    box-sizing: border-box;
    padding: 5px;
    margin-left: 15px;
    margin-top: 30px;
    overflow: hidden;
    white-space: pre-wrap;
    word-wrap: break-word;
    outline: none;
    flex: 1;
    text-align: center; 
  }

  .rhombus {
    width: 100px; 
    height: 100px; 
    background-color: lightblue; 
    position: absolute; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    transform: rotate(45deg); 
  }

  .rhombus .rhombus-textbox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg); 
  width: calc(100% - 28px); 
  height: calc(100% - 28px);
  border: none;
  box-sizing: border-box;
  padding: 5px;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;
  text-align: center; 
}

.parallelogram {
  width: 150px;
  height: 100px;
  background-color: lightblue;
  position: absolute;
  transform: skew(20deg); 
}

.parallelogram .parallelogram-textbox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) skew(-20deg); 
  width: calc(100% - 20px); 
  height: calc(100% - 20px); 
  border: none;
  box-sizing: border-box;
  padding: 5px;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;
  text-align: center; 
}

.resize-handle {
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}

.triangle {
  width: 150px; 
  height: 150px; 
  position: relative;
  overflow: hidden;
}

.triangle::before {
  content: '';
  width: 0;
  height: 0;
  border-left: 75px solid transparent; 
  border-right: 75px solid transparent; 
  border-top: 150px solid lightblue;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%); 
}

.triangle-textbox {
  width: calc(100% - 20px); 
  height: calc(100% - 20px); 
  box-sizing: border-box;
  padding: 10px; 
  border: none;
  resize: none;
  outline: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  text-align: center;
  font-size: 14px; 
  line-height: 1.5; 
  overflow-y: auto; 
  white-space: pre-wrap; 
}

.hexagon {
  position: relative;
  width: 100px;
  height: 57.74px;
  background-color: lightblue;
  margin: 28.87px 0;
  transform: rotate(90deg);
}

.hexagon:before,
.hexagon:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
}

.hexagon:before {
  top: -28.87px;
  border-bottom: 28.87px solid lightblue;
}

.hexagon:after {
  bottom: -28.87px;
  border-top: 28.87px solid lightblue;
}

.hexagon .hexagon-textbox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg); 
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  border: none;
  padding: 2px;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;
  text-align: center;
  font-size: 12px;
}

.or {
  width: 50px;
  height: 50px;
  border-radius: 50%; 
  position: relative; 
  overflow: hidden; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.or {
  position: relative; 
  border: 2px solid black;
  background-color: lightblue;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  cursor: move;
}

.or .horizontal-diameter {
  position: absolute;
  width: 100%;
  height: 2px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ns-resize;
  background-color: black;
}

.or .vertical-diameter {
  position: absolute;
  width: 2px; 
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  cursor: ew-resize; 
  background-color: black;
}

.rightarrow {
  position: relative;
  width: 100px; 
  height: 3px; 
  background-color: lightblue; 
}

.rightarrow::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -10px; 
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent; 
  border-left: 10px solid black; 
}

.leftarrow {
  position: relative;
  width: 100px;
  height: 3px;
  background-color: lightblue;
}

.leftarrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid black;
}

.uparrow {
  position: relative;
  width: 3px;
  height: 100px;
  background-color: lightblue;
}

.uparrow::before {
  content: '';
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid black;
}

.downarrow {
  position: relative;
  width: 3px;
  height: 100px;
  background-color: lightblue;
}

.downarrow::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid black;
}

#content-to-download {
  position: relative; 
  width: 100%;
  height: 100%;
}

</style>
