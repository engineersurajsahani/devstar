<script>
	let measurements = [
	  {
		id: 1,
		name: "Body Mass Index (BMI)",
		description:
		  "Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults.",
		tooltip:
		  "Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults.",
		icon_class: "fas fa-weight",
		additional_details:
		  "BMI is defined as the body mass divided by the square of the body height and is universally expressed in units of kg/m², resulting from mass in kilograms and height in meters.\n\nRange:\n\nUnderweight: BMI is less than 18.5\nNormal weight: BMI is 18.5 to 24.9\nOverweight: BMI is 25 to 29.9\nObesity: BMI is 30 or more",
		inputs: [
		  { name: "weight", label: "Weight (kg)", type: "number" },
		  { name: "height", label: "Height (cm)", type: "number" },
		],
		calculate: function (inputs) {
		  const weight = inputs.weight;
		  const height = inputs.height / 100; // convert cm to m
		  return (weight / (height * height)).toFixed(2);
		},
		result: function (value) {
		  return `Your BMI is ${value}`;
		},
	  },
	  {
		id: 2,
		name: "Basal Metabolic Rate (BMR)",
		description:
		  "Basal Metabolic Rate (BMR) is the number of calories required to keep your body functioning while at rest.",
		tooltip: "The Harris-Benedict equation is used to calculate BMR.",
		icon_class: "fas fa-fire",
		additional_details:
		  "",
		inputs: [
		  { name: "weight", label: "Weight (kg)", type: "number" },
		  { name: "height", label: "Height (cm)", type: "number" },
		  { name: "age", label: "Age (years)", type: "number" },
		  { name: "gender", label: "Gender (M/F)", type: "text" },
		],
		calculate: function (inputs) {
		  const weight = inputs.weight;
		  const height = inputs.height;
		  const age = inputs.age;
		  const gender = inputs.gender.toUpperCase();
		  let bmr;
		  if (gender === "M") {
			bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
		  } else if (gender === "F") {
			bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
		  } else {
			bmr = "Invalid gender";
		  }
		  return bmr.toFixed(2);
		},
		result: function (value) {
		  return `Your BMR is ${value}`;
		},
	  },
	  
    {
       "id": 15,
       "name": "Resting Metabolic Rate (RMR)",
       "description": "The Resting Metabolic Rate (RMR) is closely related to the basal metabolic rate (BMR) and it is the amount of energy required to maintain the body's normal metabolic activity, such as respiration, maintenance of body temperature (thermogenesis), and digestion. Specifically, it is the amount of energy required at rest with no additional activity. The energy consumed is sufficient only for the functioning of the vital organs such as the heart, lungs, nervous system, kidneys, liver, intestine, sex organs, muscles, and skin.",
       "tooltip": "Resting Metabolic Rate (RMR) is the number of calories your body needs to function at rest.",
       "icon_class": "fas fa-heartbeat",
       "inputs": [
       { "name": "sex", "label": "Sex(Male/Female)", "type": "select", "options": ["Male", "Female"] },
       { "name": "weight", "label": "Weight (kg)", "type": "number" },
       { "name": "height", "label": "Height (cm)", "type": "number" },
       { "name": "age", "label": "Age (years)", "type": "number" },
    
     ],
       "calculate": function (inputs) {
       const sex = inputs.sex;
       const weightInKg = inputs.weight;
       const heightInCm = inputs.height;
       const age = inputs.age;
      let heightInMeters = heightInCm / 100; // convert cm to meters
      let rmr;
    if (sex === "Male") {
      rmr = (9.99 * weightInKg) + (6.25 * heightInCm) - (4.92 * age) + 5;
    } else {
      rmr = (9.99 * weightInKg) + (6.25 * heightInCm) - (4.92 * age) - 161;
    }
    return rmr.toFixed(2);
  },
  "result": function (value) {
    return `Your RMR is ${value} kcal/day`;
  },
},
	];
  
	let selectedMeasurement = null;
	let result = "";
  
	function handleSelect(id) {
	  selectedMeasurement = measurements.find((m) => m.id === id);
	}
  
	function goBack() {
	  selectedMeasurement = null;
	  result = "";
	}
  
	function handleSubmit(event) {
	  event.preventDefault();
	  const inputs = {};
	  selectedMeasurement.inputs.forEach((input) => {
		inputs[input.name] =
		  input.type === "number"
			? parseFloat(event.target[input.name].value)
			: event.target[input.name].value;
	  });
	  result = selectedMeasurement.calculate(inputs);
	}
  </script>
  
  <link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />
  
  {#if selectedMeasurement}
  <button
  on:click={goBack}
  class="flex items-center gap-2 border-0 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
  >
  <i class="fas fa-arrow-left"></i> <!-- Font Awesome icon for back arrow -->
  <span>Go back</span>
  </button>
  
	<div class="calculation bg-gray-800 text-white mt-4 p-4 border-0 rounded-lg">
	  <h2 class="font-bold text-xl">{selectedMeasurement.name}</h2>
	  <hr />
	  <p class="mt-2 text-lg">{selectedMeasurement.description}</p>
	  <form on:submit={handleSubmit} class="flex flex-col gap-4 mt-4">
		{#each selectedMeasurement.inputs as input}
		  <div class="ml-4">
			<label for={input.name}>{input.label} : </label>
			<input
			  class="mt-2 border-0 rounded-lg text-black p-1 font-bold"
			  type={input.type}
			  id={input.name}
			  name={input.name}
			  required
			/>
		  </div>
		{/each}
		<button
		  type="submit"
		  class="border-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-min"
		  >Calculate</button
		>
	  </form>
	  {#if result}
		<div
		  id="result"
		  class="mt-4 p-4 bg-green-500 text-white font-bold rounded-lg shadow-lg"
		>
		  {selectedMeasurement.result(result)}
		</div>
		{#if selectedMeasurement.additional_details}
		  <div
			class="mt-4 p-4 bg-gray-700 text-white font-bold rounded-lg shadow-lg"
		  >
			<pre
			  class="whitespace-pre-line">{selectedMeasurement.additional_details}</pre>
		  </div>
		{/if}
	  {/if}
	</div>
  {:else}
	<div class="card-container flex flex-wrap gap-4">
	  {#each measurements as measurement}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
		  class="card bg-gray-800 text-white hover:bg-gray-900 border-blue-500 h-40 w-60 flex flex-col items-center gap-1 p-4 rounded-lg cursor-pointer transition-colors duration-300 relative"
		  on:click={() => handleSelect(measurement.id)}
		  data-id={measurement.id}
		>
		  <i class="{measurement.icon_class} m-0 p-0 text-5xl"></i><br />
		  <span class="font-bold">{measurement.name}</span>
		  <span
			class="tooltip bg-white text-black text-sm rounded px-2 py-1 bottom bottom-full mb-2 hidden group-hover:block"
			>{measurement.tooltip}</span
		  >
		</div>
  
		<style>
		  .card:hover .tooltip {
			display: block;
		  }
		</style>
	  {/each}
	</div>
  {/if}
  
  <style>
  </style>
  