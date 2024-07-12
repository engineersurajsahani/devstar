<script>
  export let name;
  export let title;
  export let email;
  export let phone;
  export let template = 'template1'; // Default template
  export let primaryColor = '#007BFF'; // Default primary color
  export let secondaryColor = '#FFFFFF'; // Default secondary color
</script>

<div class="business-card {template}" style="--primary-color: {primaryColor}; --secondary-color: {secondaryColor};">
  <div class="header">
    <h2>{name}</h2>
    <p>{title}</p>
  </div>
  <div class="contact-info">
    <p>Email: <a href="mailto:{email}" style="color: var(--primary-color);">{email}</a></p>
    <p>Phone: {phone}</p>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');

  .business-card {
    border: 2px solid #ccc;
    padding: 20px;
    margin: 10px;
    width: 350px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    background-color: var(--secondary-color); /* Link secondary color to background */
  }

  .business-card.template1 {
    border-left: 5px solid var(--primary-color);
    color: var(--primary-color);
    font-family: 'Roboto', sans-serif;
  }

  .business-card.template2 {
    border-right: 10px solid var(--primary-color);
    color: var(--primary-color);
    font-family: 'Lobster', cursive;
  }

  .business-card.template3 {
    border-top: 5px solid var(--primary-color);
    color: var(--primary-color);
    text-align: center;
    font-family: 'Open Sans', sans-serif;
  }

  .business-card.template4 {
    border: 4px dashed var(--primary-color);
    color: var(--primary-color);
    font-family: 'Merriweather', serif;
  }

  .header {
    color: var(--primary-color);
  }

  h2 {
    font-size: 27px;
    margin: 0;
    font-weight: bold;
  }

  p {
    font-size: 14px;
    margin: 5px 0;
    color: var(--text-color);
  }

  .contact-info p a {
    text-decoration: none;
  }
</style>