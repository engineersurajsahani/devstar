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
  id: 10,
  name: "Daily Caloric Needs",
  description: "Estimates your daily caloric needs based on your Basal Metabolic Rate (BMR) and activity level. Acitivy Levels are: Sedentary, Lightly active, Moderately active, Very active, Super active.",
  tooltip: "Estimates your daily caloric needs based on your Basal Metabolic Rate (BMR) and activity level. ",
  icon_class: "fas fa-utensils",
  additional_details: 
    "Activity Level Multipliers:\n\n" +
    "Sedentary (little or no exercise): BMR x 1.2\n" +
    "Lightly active (light exercise/sports 1-3 days/week): BMR x 1.375\n" +
    "Moderately active (moderate exercise/sports 3-5 days/week): BMR x 1.55\n" +
    "Very active (hard exercise/sports 6-7 days a week): BMR x 1.725\n" +
    "Super active (very hard exercise/sports & a physical job): BMR x 1.9\n\n" +
    "Your BMR is calculated using the Harris-Benedict equation:\n" +
    "For males: BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age in years)\n" +
    "For females: BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age in years)",
  inputs: [
    { name: "age", label: "Age (years)", type: "number" },
    { name: "gender", label: "Gender (M/F)", type: "select", options: ["Male", "Female"] },
    { name: "weight", label: "Weight (kg)", type: "number" },
    { name: "height", label: "Height (cm)", type: "number" },
    { 
      name: "activity_level", 
      label: "Activity Level", 
      type: "select", 
      options: ["Sedentary", "Lightly active", "Moderately active", "Very active", "Super active"] 
    },
  ],
  calculate: function (inputs) {
    const age = inputs.age;
    const weight = inputs.weight;
    const height = inputs.height;
    const gender = inputs.gender.toUpperCase();
    const activityLevel = inputs.activity_level;

    let bmr;

    if (gender === "M") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === "F") {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
      return "Invalid gender";
    }

    let caloricNeeds;
    switch (activityLevel) {
      case "Sedentary":
        caloricNeeds = bmr * 1.2;
        break;
      case "Lightly active":
        caloricNeeds = bmr * 1.375;
        break;
      case "Moderately active":
        caloricNeeds = bmr * 1.55;
        break;
      case "Very active":
        caloricNeeds = bmr * 1.725;
        break;
      case "Super active":
        caloricNeeds = bmr * 1.9;
        break;
      default:
        return "Invalid activity level";
    }

    return caloricNeeds.toFixed(2);
  },
  result: function (value) {
    return `Your daily caloric needs are ${value} calories`;
  },
},
	{
		id: 13,
		name: "Waist to Hip Ratio (WHR)",
		description:
		  "The waist-to-hip ratio (WHR) is the ratio of the circumference of the waist to that of the hips (a quick measure of fat distribution).",
		tooltip:
		  "The waist-hip ratio is generally a measure of health and the risk of developing serious health conditions, such as diabetes, asthma or cardiovascular disease.",
		icon_class: "fas fa-ruler",
		additional_details:
		  "A Waist-Hip Ratio of 0.9 or less in men and 0.85 or less in women is considered low risk. A WHR above 1.0 in men and 0.85 in women indicates high risk.",
		inputs: [
		  { name: "waist", label: "Waist Circumference (cm)", type: "number" },
		  { name: "hip", label: "Hip Circumference (cm)", type: "number" },
		],
		calculate: function (inputs) {
		  const waist = inputs.waist;
		  const hip = inputs.hip;
		  return (waist / hip).toFixed(2);
		},
		result: function (value) {
		  return `Your Waist-Hip Ratio is ${value}`;
		},
	  },
	  {
		id: 14,
		name: "Resting Metabolic Rate (RMR)",
		description:
		  "Resting Metabolic Rate (RMR) is the rate at which your body burns energy when it is at complete rest.",
		tooltip: "RMR is similar to BMR but can be slightly higher as it accounts for the calories burned by activities such as eating and small movements.",
		icon_class: "fas fa-heartbeat",
		additional_details:
		  "RMR is the abbreviation of resting metabolic rate. This parameter tells how many calories your body requires to perform the most basic functions (to keep itself alive) while resting.",
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
		  let rmr;
		  if (gender === "M") {
			rmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
		  } else if (gender === "F") {
			rmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
		  } else {
			rmr = "Invalid gender";
		  }
		  return (rmr * 1.1).toFixed(2); // Slightly higher than BMR to account for calories utilized for food digestion. 
		},
		result: function (value) {
		  return `Your RMR is ${value} calories/day`;
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
  