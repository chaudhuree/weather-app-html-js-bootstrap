function updateClock() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  var formattedMinutes = minutes.toString().padStart(2, "0");
  var timeString = hours + ":" + formattedMinutes + " " + ampm;
  console.log("timeString: " + timeString);

  document.querySelector(".time-data").innerHTML = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);
