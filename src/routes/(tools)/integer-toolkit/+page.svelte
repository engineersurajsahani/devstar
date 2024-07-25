<script>
	
	import { Label, Button, Card } from 'flowbite-svelte';
  
	
	let num1 = 0;
	let num2 = 0;
	let result = 0;
	let roundedResult = 0; 
	let selectedFontStyle = 'normal';
	let sortedDigitsNum1 = '';
	let sortedDigitsNum2 = '';
	let palindromeNum1 = '';
  
	// Function to add integers
	function addIntegers() {
	  result = num1 + num2;
	  roundResult();
	  sortDigits();
	  convertToPalindrome();
	}
  
	// Function to subtract integers
	function subtractIntegers() {
	  result = num1 - num2;
	  roundResult();
	  sortDigits();
	  convertToPalindrome();
	}
  
	// Function to multiply integers
	function multiplyIntegers() {
	  result = num1 * num2;
	  roundResult();
	  sortDigits();
	  convertToPalindrome();
	}
  
	// Function to divide integers
	function divideIntegers() {
	  if (num2 !== 0) {
		result = num1 / num2;
	  } else {
		result = 'Cannot divide by zero';
	  }
	  roundResult();
	  sortDigits();
	  convertToPalindrome();
	}
  
	// Function to calculate factorial
	function calculateFactorial() {
	  if (num1 < 0) {
		result = 'Factorial is not defined for negative numbers';
	  } else {
		let factorial = 1;
		for (let i = 1; i <= num1; i++) {
		  factorial *= i;
		}
		result = factorial;
	  }
	  roundResult();
	  sortDigits();
	  convertToPalindrome();
	}
  
	// Function to calculate absolute value
	function calculateAbsolute() {
	  result = Math.abs(num1);
	  roundResult();
	  sortDigits();
	  convertToPalindrome();
	}
  
	// Function to round the result to the nearest integer
	function roundResult() {
	  if (Number.isInteger(result)) {
		roundedResult = result; 
	  } else {
		roundedResult = Math.round(result); 
	  }
	}
  
	// Function to sort digits of both integers
	function sortDigits() {
	  sortedDigitsNum1 = sortNumberDigits(num1);
	  sortedDigitsNum2 = sortNumberDigits(num2);
	}
  
	// Function to sort digits of an integer
	function sortNumberDigits(number) {
	  const digits = String(Math.abs(number)).split('');
	  const sortedDigits = digits.sort((a, b) => a - b);
	  const sortedNumber = number < 0 ? '-' + sortedDigits.join('') : sortedDigits.join('');
	  return sortedNumber;
	}
  
	// Function to convert result to palindrome
	function convertToPalindrome() {
	  const originalString = String(result); // Convert result to string
	  const reversedString = originalString.split('').reverse().join(''); 
	  palindromeNum1 = Number(originalString + reversedString); /
	}
  
	// Function to apply fancy font styles
	function applyFancyFontStyle(event) {
	  selectedFontStyle = event.target.value;
	}
  </script>
  
  <div class="card mx-auto max-w-screen-xl p-8">
	<Label for="num1" class="mb-2">Integer</Label>
	<input type="number" bind:value={num1} id="num1" class="input mb-3" />
  
	<Label for="num2" class="mb-2">Another Integer (for operations)</Label>
	<input type="number" bind:value={num2} id="num2" class="input mb-3" />
  
	<div class="mt-6 grid grid-cols-4 gap-1">
	  <Button class="h-16" color="light" on:click={addIntegers}>Add</Button>
	  <Button class="h-16" color="light" on:click={subtractIntegers}>Subtract</Button>
	  <Button class="h-16" color="light" on:click={multiplyIntegers}>Multiply</Button>
	  <Button class="h-16" color="light" on:click={divideIntegers}>Divide</Button>
	  <Button class="h-16" color="light" on:click={calculateFactorial}>Factorial</Button>
	  <Button class="h-16" color="light" on:click={calculateAbsolute}>Absolute</Button>
	</div>
  
	<div class="mt-6">
	  <Label for="fontStyle" class="mb-2">Select Fancy Font Style</Label>
	  <select id="fontStyle" bind:value={selectedFontStyle} class="select" on:change={applyFancyFontStyle}>
		<option value="normal">Normal</option>
		<option value="bold">Bold</option>
		<option value="italic">Italic</option>
		<option value="underline">Underline</option>
		<!-- Add more styles or import fancy fonts as needed -->
	  </select>
	</div>
  
	<Card class="mt-8 px-5" size="" padding="none">
	  <h2 class="text-lg font-semibold mb-3">Results</h2>
	  <div>
		<p style="font-family: 'Arial', sans-serif; font-size: 24px; font-weight: {selectedFontStyle === 'bold' ? 'bold' : 'normal'}; font-style: {selectedFontStyle === 'italic' ? 'italic' : 'normal'};">
		  Result: {result}
		</p>
		<p>
		  Rounded Result: {roundedResult}
		</p>
		<p>
		  Sorted Digits of Integer: {sortedDigitsNum1}
		</p>
		<p>
		  Sorted Digits of Another Integer: {sortedDigitsNum2}
		</p>
		<p>
		  Palindrome of Result: {palindromeNum1}
		</p>
	  </div>
	</Card>
  </div>
