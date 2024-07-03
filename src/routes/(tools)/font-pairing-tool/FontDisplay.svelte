<script>
    export let font1;
    export let font2;
    export let text;
    export let size;
    export let weight;
  </script>
  
  <div class="font-display">
    <h4>Font 1 :</h4>
    <div style="font-family: {font1}; font-size: {size}px; font-weight: {weight};">{text}</div>
    <h4>Font 2 :</h4>
    <div style="font-family: {font2}; font-size: {size}px; font-weight: {weight};">{text}</div>
  </div>
  
  <style>
    .font-display {
      margin-top: 20px;
    }
    .font-display > div {
      margin-bottom: 10px;
      padding: 10px;
      /* border: 1px solid #ddd; */
      border-radius: 5px;
      background-color: #fff;
    }
    h4{
        margin-left: 10px;
        font-weight: bolder;
        
    }
  </style>