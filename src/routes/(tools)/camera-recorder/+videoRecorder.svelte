<style>
	html, body {
	  margin: 0;
	  padding: 0;
	  height: 100%;
	  font-family: 'Arial', sans-serif;
	  background-color: #f8f9fa;
	  color: #343a40;
	}
  
	svg {
	  width: 100%;
	  height: auto;
	}
  
	.button {
	  display: inline-block;
	  padding: 0.5rem 1rem;
	  font-size: 1rem;
	  font-weight: 600;
	  color: #fff;
	  background-color: #007bff;
	  border: none;
	  cursor: pointer;
	  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
	}
  
	.button:hover {
	  transform: scale(1.05);
	  background-color: #0056b3;
	}
  
	.button:active {
	  transform: scale(0.95);
	  background-color: #004085;
	}
  
	.rounded {
	  border-radius: 0.375rem;
	}
  
	.shadow-lg {
	  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
  
	.gradient-bg {
	  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
	  color: #fff;
	}
  
	.animated {
	  animation: bounce 1s infinite;
	}
  
	@keyframes bounce {
	  0%, 20%, 50%, 80%, 100% {
		transform: translateY(0);
	  }
	  40% {
		transform: translateY(-30px);
	  }
	  60% {
		transform: translateY(-15px);
	  }
	}
  
	.container {
	  padding: 2rem;
	}
  
	.card {
	  background-color: #fff;
	  border: 1px solid #e0e0e0;
	  border-radius: 0.375rem;
	  padding: 1.5rem;
	  margin-bottom: 1rem;
	  transition: box-shadow 0.2s ease-in-out;
	}
  
	.card:hover {
	  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
	}
  
	.text-center {
	  text-align: center;
	}
  
	.text-primary {
	  color: #007bff;
	}
  
	.text-secondary {
	  color: #6c757d;
	}
  
	@media (min-width: 768px) {
	  .container {
		padding: 4rem;
	  }
	}
  
	.flex {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
  
	.flex-column {
	  flex-direction: column;
	}
  
	.flex-row {
	  flex-direction: row;
	}
  
	.space-between {
	  justify-content: space-between;
	}
  </style>