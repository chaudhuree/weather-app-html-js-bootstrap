// Create an array of day names
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Create an array of month names
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Get the current date
const currentDate = new Date();

// Get the day, month, and year from the current date
const day = dayNames[currentDate.getDay()];
const date = currentDate.getDate();
const month = monthNames[currentDate.getMonth()];

// Create the desired date format
const formattedDate = `${day} ${date} ${month}`;

// Log the formatted date
console.log(formattedDate);
