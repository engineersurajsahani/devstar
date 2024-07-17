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
  id: 3,
  name: "Harris-Benedict",
  description: "The Harris-Benedict equation estimates your basal metabolic rate (BMR) and daily caloric needs.",
  tooltip: "The Harris-Benedict equation estimates your basal metabolic rate (BMR) and daily caloric needs.",
  icon_class: "fas fa-calculator",
  additional_details: "Range:\n\nVery-Low: BMR is less than 1200\nLow: BMR is 1200 to 1500\nModerate: BMR is 1500 to 1800\nHigh: BMR is 1800 to 2200\nVery-High: BMR is 2200 or more",
  inputs: [
    { name: "age", label: "Age (years)", type: "number" },
    { name: "gender", label: "Gender(M/F)", type: "select", options: ["Male", "Female","male","female"] },
    { name: "weight", label: "Weight (kg)", type: "number" },
    { name: "height", label: "Height (cm)", type: "number" },
  ],
  calculate: function (inputs) {
    const age = inputs.age;
    const weight = inputs.weight;
    const height = inputs.height;
    if (inputs.gender === "Male" ||inputs.gender === "male" ) {
      return (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)).toFixed(2);
    } else {
      return (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)).toFixed(2);
    }
  },
  result: function (value) {
    return `Your Harris-Benedict BMR is ${value} calories/day`;
  },
},
{
  id: 4,
  name: "Pregnancy Due Date",
  description: "The Pregnancy Due Date Calculator estimates the due date based on the last menstrual period.",
  tooltip: "The Pregnancy Due Date Calculator estimates the due date based on the last menstrual period.",
  icon_class: "fas fa-baby",
  additional_details: "Due date is calculated as 280 days (40 weeks) from the first day of the last menstrual period.",
  inputs: [
    { name: "lmp", label: "Last Menstrual Period", type: "date" },
  ],
  calculate: function (inputs) {
    const lmp = new Date(inputs.lmp);
    const dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    return dueDate.toDateString();
  },
  result: function (value) {
    return `Your estimated due date is ${value}`;
  },
  
},
{
  id: 5,
  name: "Caloric Deficit",
  description: "Estimates the caloric deficit needed to lose weight.",
  tooltip: "Estimates the caloric deficit needed to lose weight.",
  icon_class: "fas fa-weight",
  additional_details: "A caloric deficit of 500 calories per day typically results in a weight loss of about 0.5 kg (1 lb) per week.",
  inputs: [
    { name: "weight_loss_goal", label: "Weight loss goal (kg)", type: "number" },
    { name: "time_frame", label: "Time frame (weeks)", type: "number" },
  ],
  calculate: function (inputs) {
    const weightLossGoal = inputs.weight_loss_goal;
    const timeFrame = inputs.time_frame;
    return (weightLossGoal * 7700 / timeFrame).toFixed(2);
  },
  result: function (value) {
    return `Your daily caloric deficit should be ${value} calories to meet your goal`;
  },
},
{
	id: 16,
	name: "Water Intake",
	description: "Estimates the daily water intake based on weight.",
	tooltip: "Estimates the daily water intake based on weight.",
	icon_class: "fas fa-tint",
	additional_details: "It is recommended to drink 35 ml of water per kg of body weight daily.",
	inputs: [{ name: "weight", label: "Weight (kg)", type: "number" }],
	calculate: function (inputs) {
		const weight = inputs.weight;
		const intakeInMl = weight * 35;
		const intakeInLiters = (intakeInMl / 1000).toFixed(2);
		return intakeInLiters;
	},
	result: function (value) {
		return `Your recommended daily water intake is ${value} liters`;
	},
}
,
		{
			id: 17,
			name: "Protein Intake",
			description:
				"Estimates the daily protein intake based on weight and activity level.",
			tooltip:
				"Estimates the daily protein intake based on weight and activity level.",
			icon_class: "fas fa-dumbbell",
			additional_details:
				"Protein intake recommendations:\n\n- Sedentary: 0.8 g per kg of body weight\n- Light Activity: 1.0 g per kg of body weight\n- Moderate Activity: 1.2 g per kg of body weight\n- High Activity: 1.5 g per kg of body weight",
			inputs: [
				{ name: "weight", label: "Weight (kg)", type: "number" },
				{
					name: "activity_level",
					label: "Activity Level",
					type: "select",
					options: ["Sedentary", "Light Activity", "Moderate Activity", "High Activity"],
				},
			],
			calculate: function (inputs) {
				const weight = inputs.weight;
				let multiplier;
				switch (inputs.activity_level) {
					case "Sedentary":
						multiplier = 0.8;
						break;
					case "Light Activity":
						multiplier = 1.0;
						break;
					case "Moderate Activity":
						multiplier = 1.2;
						break;
					case "High Activity":
						multiplier = 1.5;
						break;
					default:
						multiplier = 1.0;
				}
				return (weight * multiplier).toFixed(2);
			},
			result: function (value) {
				return `Your recommended daily protein intake is ${value} g`;
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
  