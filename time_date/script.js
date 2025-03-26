// alert("test")
function updateClock(){
const timeElement = document.getElementById("time")
const dateElement = document.getElementById("date")

const now = new Date()
const hours = now.getHours() % 12 || 12  //truthy value
const minutes = now.getMinutes().toString().padStart(2, "0")
const seconds = now.getSeconds().toString().padStart(2, "0")
const ampm = now.getHours() <= 12 ? "AM" : "PM"

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
}

timeElement.textContent = `${hours}:${minutes}:${seconds}:${ampm}`

// update the date
dateElement.textContent = now.toLocaleDateString(undefined, options)
}

//// Update every second
setInterval(updateClock, 1000)

//call the unction immediately to set the initial time
 updateClock()

//window.onload = () => updateClock()  // line 16 and line 18 are doing same thing
