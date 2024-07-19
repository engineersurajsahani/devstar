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
	id: 9,
	name: "Body Fat Percentage",
	description: "A body fat percentage calculator estimates the proportion of fat in relation to total body weight based on measurements like height, weight, and circumference of specific body parts.",
	tooltip: "The U.S. Navy method estimates body fat percentage using measurements of waist, neck, weight, height, age, and gender, with hip circumference optionally included for women.",
	icon_class: "fas fa-percent",
	additional_details: "The normal range for body fat percentage varies based on factors like age, gender, and fitness level, but generally, it's around 18-24% for women and 10-17% for men",
	inputs: [
		{ name: "weight", label: "Weight (kg)", type: "number" },
		{ name: "height", label: "Height (cm)", type: "number" },
		{ name: "waist", label: "Waist (cm)", type: "number" },
		{ name: "neck", label: "Neck (cm)", type: "number" },
		{ name: "hip", label: "Hip (cm)", type: "number" },
		{ name: "age", label: "Age (years)", type: "number" },
		{ name: "gender", label: "Gender (M/F)", type: "text" },
	],
	calculate: function (inputs) {
		const weight = inputs.weight;
		const height = inputs.height;
		const waist = inputs.waist;
  		const neck = inputs.neck;
      	const hip = inputs.hip;
		const age = inputs.age;
		const gender = inputs.gender.toUpperCase();
		let bodyFatPercentage;
		  if (gender === "M") {
			bodyFatPercentage = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
		  } else if (gender === "F") {
			bodyFatPercentage = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
		  } else {
			bodyFatPercentage = "Invalid gender";
		  }
		  return bodyFatPercentage.toFixed(2);
		},
		result: function (value) {
		  return `Your Body Fat Percentage is ${value}`;
		},
	},
  
{
  id: 10,
  name: "Daily Caloric Needs",
  description: "Estimates your daily caloric needs based on your Basal Metabolic Rate (BMR) and activity level. Activity levels can be Sedentary, Lightly active, Moderately active, Very active, Super active",
  tooltip: "Estimates your daily caloric needs based on your Basal Metabolic Rate (BMR) and activity level.",
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
		id: 7,
		name: "Ideal Body Weight (IBW)",
		description:
		  "IBW is the optimal weight associated with maximum life expectancy for a given height",
		tooltip:
		  "IBW is the optimal weight associated with maximum life expectancy for a given height",
		icon_class: "fas fa-user-check",
		additional_details:
		  "Here are some useful tips you can follow to maintain your ideal weight - 1.Stick To a Healthy Diet 2.Exercise 3.Reduce Stress",
		inputs: [
		  { name: "height", label: "Height (cm)", type: "number" },
		  { name: "gender", label: "Gender (M/F)", type: "text" },
		  { name: "weight", label: "Actual Weight (kg)", type: "number" }
		],
		calculate: function (inputs) {
		  
		  const height = (inputs.height) / 2.54; // convert cm to inches
          const gender = inputs.gender.toUpperCase();
		  let IBW;
		  if (gender === "M") {
			IBW = 50+(2.3*(height-60)); }
			else if (gender === "F") {
				IBW = 45.5+(2.3*(height-60));
			} else {
				IBW = "Invalid Gender";
			}
			return (IBW).toFixed(2);
		  },
		  result: function (value) {
		  return `Your IBW is ${value} kg`;
		},
		},
		{
		id: 8,
		name: "Lean Body Mass",
		description:
		  "Lean body mass (LBM) refers to the weight of everything in your body except for fat",
		tooltip:
		  "Lean body mass (LBM) refers to the weight of everything in your body except for fat",
		icon_class: "fas fa-dumbbell",
		additional_details:
		  "Increasing LBM often implies gaining muscle mass or losing fat, which is a common goal in fitness and bodybuilding!",
		inputs: [
		  { name: "height", label: "Height (cm)", type: "number" },
		  { name: "weight", label: "Actual Weight (kg)", type: "number" },
		  { name: "gender", label: "Gender (M/F)", type: "text" }
		  
		],
		calculate: function (inputs) {
		  
		  const height = inputs.height; 
          const gender = inputs.gender.toUpperCase();
		  const weight = inputs.weight;

		  let LBM;
		  if (gender === "M") {
			LBM = 0.407*weight+0.267*height-19.2; }
			else if (gender === "F") {
				LBM = 0.252*weight+0.473*height-48.3;
			} else {
				LBM = "Invalid Gender";
			}
			return (LBM).toFixed(2);
		  },
		  result: function (value) {
		  return `Your Lean Body Mass is ${value} kg`;
		},
		},


{
  id: 12,
  name: "Vitamin Calculator",
  description: "Estimates daily vitamin intake requirements based on age and gender.",
  tooltip: "Estimates daily vitamin intake requirements based on age and gender.",
  icon_class: "fas fa-pills",
  additional_details: 
    "Daily Recommended Intake for Vitamins:\n\n" +
    "For Males:\n" +
    "Age 1-3: Vitamin A: 300 mcg/day, Vitamin C: 15 mg/day, Vitamin D: 15 mcg/day, Vitamin E: 6 mg/day, Vitamin K: 30 mcg/day\n" +
    "Age 4-8: Vitamin A: 400 mcg/day, Vitamin C: 25 mg/day, Vitamin D: 15 mcg/day, Vitamin E: 7 mg/day, Vitamin K: 55 mcg/day\n" +
    "Age 9-13: Vitamin A: 600 mcg/day, Vitamin C: 45 mg/day, Vitamin D: 15 mcg/day, Vitamin E: 11 mg/day, Vitamin K: 60 mcg/day\n" +
    "Age 14-18: Vitamin A: 900 mcg/day, Vitamin C: 75 mg/day, Vitamin D: 15 mcg/day, Vitamin E: 15 mg/day, Vitamin K: 75 mcg/day\n" +
    "Age 19+: Vitamin A: 900 mcg/day, Vitamin C: 90 mg/day, Vitamin D: 15 mcg/day, Vitamin E: 15 mg/day, Vitamin K: 120 mcg/day\n\n" +
    "For Females:\n" +
    "Age 1-3: Vitamin A: 300 mcg/day, Vitamin C: 15 mg/day, Vitamin D: 15 mcg/day, Vitamin E: 6 mg/day, Vitamin K: 30 mcg/day\n" +
    "Age 4-8: Vitamin A: 400 mcg/day, Vitamin C: 25 mg/day, Vitamin D: 15 mcg/day, Vitamin E: 7 mg/day, Vitamin K: 55 mcg/day\n" +
    "Age 9-13: Vitamin A: 600 mcg/day, Vitamin C: 45 mg/day, Vitamin D: 15 mcg/day, Vitamin E: 11 mg/day, Vitamin K: 60 mcg/day\n" +
    "Age 14-18: Vitamin A: 700 mcg/day, Vitamin C: 65 mg/day, Vitamin D: 15 mcg/day, Vitamin E: 15 mg/day, Vitamin K: 75 mcg/day\n" +
    "Age 19+: Vitamin A: 700 mcg/day, Vitamin C: 75 mg/day, Vitamin D: 15 mcg/day, Vitamin E: 15 mg/day, Vitamin K: 90 mcg/day",
  inputs: [
    { name: "age", label: "Age (years)", type: "number" },
    { name: "gender", label: "Gender (M/F)", type: "select", options: ["Male", "Female"] },
  ],
  calculate: function (inputs) {
    const age = inputs.age;
    const gender = inputs.gender.toUpperCase();
    
    let vitaminA, vitaminC, vitaminD, vitaminE, vitaminK;

    if (gender === "M") {
      if (age <= 3) {
        vitaminA = 300; vitaminC = 15; vitaminD = 15; vitaminE = 6; vitaminK = 30;
      } else if (age <= 8) {
        vitaminA = 400; vitaminC = 25; vitaminD = 15; vitaminE = 7; vitaminK = 55;
      } else if (age <= 13) {
        vitaminA = 600; vitaminC = 45; vitaminD = 15; vitaminE = 11; vitaminK = 60;
      } else if (age <= 18) {
        vitaminA = 900; vitaminC = 75; vitaminD = 15; vitaminE = 15; vitaminK = 75;
      } else {
        vitaminA = 900; vitaminC = 90; vitaminD = 15; vitaminE = 15; vitaminK = 120;
      }
    } else if (gender === "F") {
      if (age <= 3) {
        vitaminA = 300; vitaminC = 15; vitaminD = 15; vitaminE = 6; vitaminK = 30;
      } else if (age <= 8) {
        vitaminA = 400; vitaminC = 25; vitaminD = 15; vitaminE = 7; vitaminK = 55;
      } else if (age <= 13) {
        vitaminA = 600; vitaminC = 45; vitaminD = 15; vitaminE = 11; vitaminK = 60;
      } else if (age <= 18) {
        vitaminA = 700; vitaminC = 65; vitaminD = 15; vitaminE = 15; vitaminK = 75;
      } else {
        vitaminA = 700; vitaminC = 75; vitaminD = 15; vitaminE = 15; vitaminK = 90;
      }
    } else {
      return "Invalid gender";
    }

    return `Vitamin A: ${vitaminA} mcg/day, Vitamin C: ${vitaminC} mg/day, Vitamin D: ${vitaminD} mcg/day, Vitamin E: ${vitaminE} mg/day, Vitamin K: ${vitaminK} mcg/day`;
  },
  result: function (value) {
    return `Your daily vitamin requirements are: ${value}`;
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
	  {
  id: 11,
  name: "Menstrual Cycle",
  description: "The Menstrual Cycle Calculator estimates the next period date based on the last menstrual period and average cycle length.",
  tooltip: "The Menstrual Cycle Calculator estimates the next period date based on the last menstrual period and average cycle length.",
  icon_class: "fas fa-calendar-alt",
  additional_details: "Next period is estimated based on the average menstrual cycle length from the start date of the last period.",
  inputs: [
    { name: "lmp", label: "Last Menstrual Period", type: "date" },
    { name: "cycleLength", label: "Average Cycle Length (days)", type: "number" }
  ],
  calculate: function (inputs) {
    const lmp = new Date(inputs.lmp);
    const cycleLength = parseInt(inputs.cycleLength);
    const nextPeriodDate = new Date(lmp.getTime() + cycleLength * 24 * 60 * 60 * 1000);
    return nextPeriodDate.toDateString();
  },
  result: function (value) {
    return `Your next period is expected to start on ${value}`;
  }
},

{
  id: 15,
  name: "Heart Rate Zone",
  description:
    "Heart Rate Zone is a percentage of your maximum heart rate, which is used to determine the intensity of exercise.",
  tooltip: "The Karvonen formula is used to calculate Heart Rate Zone.",
  icon_class: "fas fa-heartbeat" ,
  additional_details:
    "",
  inputs: [
    { name: "age", label: "Age (years)", type: "number" },
    { name: "gender", label: "Gender (male/female)", type: "select", options: ["male", "female"] },
    { name: "resting_hr", label: "Resting Heart Rate (bpm)", type: "number" },
  ],
  calculate: function (inputs) {
    const age = inputs.age;
    const gender = inputs.gender;
    const resting_hr = inputs.resting_hr;

    // Calculate maximum heart rate using Karvonen formula
    let max_hr;
    if (gender === "male") {
      max_hr = 220 - age;
    } else {
      max_hr = 226 - age;
    }

    // Calculate heart rate reserve
    let heart_rate_reserve = max_hr - resting_hr;

    // Calculate targeted heart zone rates
    let warm_up_zone = (max_hr - heart_rate_reserve) * 0.5 + resting_hr;
    let fat_burn_zone = (max_hr - heart_rate_reserve) * 0.6 + resting_hr;
    let aerobic_zone = (max_hr - heart_rate_reserve) * 0.7 + resting_hr;
    let anaerobic_zone = (max_hr - heart_rate_reserve) * 0.8 + resting_hr;
    let vo2_max_zone = (max_hr - heart_rate_reserve) * 0.9 + resting_hr;

    return {
      max_hr: max_hr.toFixed(2),
      warm_up_zone: warm_up_zone.toFixed(2),
      fat_burn_zone: fat_burn_zone.toFixed(2),
      aerobic_zone: aerobic_zone.toFixed(2),
      anaerobic_zone: anaerobic_zone.toFixed(2),
      vo2_max_zone: vo2_max_zone.toFixed(2),
    };
  },
  result: function (values) {
    return `
      Heart Rate Zones:

      •Maximum Heart Rate:${values.max_hr} bpm 
      •Warm-up Zone:${values.warm_up_zone} bpm
      •Fat Burn Zone:${values.fat_burn_zone} bpm
      •Aerobic Zone:${values.aerobic_zone} bpm
      •Anaerobic Zone: ${values.anaerobic_zone} bpm
      •VO2 Max Zone: ${values.vo2_max_zone} bpm
    `;
  },
},{id: 16,
			name: "Water Intake",
			description:
				"Estimates the daily water intake based on weight.",
			tooltip:
				"Estimates the daily water intake based on weight.",
			icon_class: "fas fa-tint",
			additional_details:
				"It is recommended to drink 35 ml of water per kg of body weight daily.",
			inputs: [{ name: "weight", label: "Weight (kg)", type: "number" }],
			calculate: function (inputs) {
				const weight = inputs.weight;
				return (weight * 35).toFixed(2);
			},
			result: function (value) {
				return `Your recommended daily water intake is ${value} ml`;
			},
		},
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
		{
			id : 18,
			name: "Ideal Weight Gain",
			description: "Estimates the ideal weight gain based on the target date and weight gain rate.",
			tooltip: "Estimates the ideal weight gain based on the target date and weight gain rate.",
			icon_class: "fas fa-weight",
			additional_details: "The ideal weight gain is calculated based on the target date and weight gain rate.",
			inputs: [
				{ name: "current_weight", label: "Current Weight (kg)", type: "number" },
				{ name: "target_date", label: "Target Date", type: "date" },
				{ name: "weight_gain_rate", label: "Weight Gain Rate (kg/week)", type: "number" },
			],
			calculate: function (inputs) {
				const currentWeight = inputs.current_weight;
				const targetDate = new Date(inputs.target_date);
				const weightGainRate = inputs.weight_gain_rate;
				const daysToTarget = (targetDate - new Date()) / (1000 * 60 * 60 * 24);
				const weeksToTarget = daysToTarget / 7;
				return (currentWeight + weightGainRate * weeksToTarget).toFixed(2);
			},
			result: function (value) {
				return `Your ideal weight on the target date is ${value} kg`;
			},
		}

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
  