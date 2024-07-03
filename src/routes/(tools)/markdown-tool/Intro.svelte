<script>
    import { marked } from 'marked';
    let markdown = `
      # Welcome to Markdown Editor Tool!
  
      Hi! I'm your first Markdown code in **</Dev>star**. If you want to learn about Markdown Editor, you can read me. If you want to play with Markdown, you can edit me.
  
      # Files
  
      This editor stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**
  
      ## Some text stylings
  
      **strong text**
      _emphasized text_
      ~~strikethrough text~~
  
      # What is Lorem Ipsum?
  
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  
      ## Why do we use it?
  
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
  
      ### Where does it come from?
  
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    `;
  </script>
  
  <style>
    /* Optional: Add styles here */
  </style>
  
  <div>
    {@html marked(markdown)}
  </div>
  