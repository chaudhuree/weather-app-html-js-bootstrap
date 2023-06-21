function updateClock() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  // var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedMinutes = minutes.toString().padStart(2, "0");
  var timeString = hours + ":" + formattedMinutes;
  console.log("timeString: " + timeString);

  // document.getElementById("clock").innerHTML = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);
