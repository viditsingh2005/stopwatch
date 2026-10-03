// ======================================
// GET ELEMENTS
// ======================================

const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const lapList = document.getElementById("lapList");


// ======================================
// VARIABLES
// ======================================

let startTime = 0;

let elapsedTime = 0;

let timerInterval = null;

let isRunning = false;

let lapNumber = 0;


// ======================================
// FORMAT TIME
// ======================================

function formatTime(time) {

    const hours = Math.floor(
        time / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (time % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (time % (1000 * 60)) /
        1000
    );

    const milliseconds = Math.floor(
        (time % 1000) / 10
    );


    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0") +
        "." +
        String(milliseconds).padStart(2, "0")
    );
}


// ======================================
// UPDATE TIMER
// ======================================

function updateTimer() {

    elapsedTime = Date.now() - startTime;

    display.textContent =
        formatTime(elapsedTime);
}


// ======================================
// START
// ======================================

function startStopwatch() {

    if (isRunning) {
        return;
    }


    isRunning = true;


    /*
       This allows the stopwatch
       to continue after pause.
    */

    startTime =
        Date.now() - elapsedTime;


    timerInterval = setInterval(
        updateTimer,
        10
    );
}


// ======================================
// PAUSE
// ======================================

function pauseStopwatch() {

    if (!isRunning) {
        return;
    }


    isRunning = false;


    clearInterval(timerInterval);


    elapsedTime =
        Date.now() - startTime;


    display.textContent =
        formatTime(elapsedTime);
}


// ======================================
// LAP
// ======================================

function recordLap() {

    // Don't record lap if stopwatch
    // isn't running

    if (!isRunning) {
        return;
    }


    lapNumber++;


    const lap = document.createElement("div");

    lap.className = "lap-item";


    lap.innerHTML = `
        <span class="lap-number">
            Lap ${lapNumber}
        </span>

        <span class="lap-time">
            ${formatTime(elapsedTime)}
        </span>
    `;


    lapList.prepend(lap);
}


// ======================================
// RESET
// ======================================

function resetStopwatch() {

    isRunning = false;


    clearInterval(timerInterval);


    startTime = 0;

    elapsedTime = 0;

    lapNumber = 0;


    display.textContent =
        "00:00:00.00";


    lapList.innerHTML = "";
}


// ======================================
// BUTTON EVENTS
// ======================================

startBtn.addEventListener(
    "click",
    startStopwatch
);


pauseBtn.addEventListener(
    "click",
    pauseStopwatch
);


lapBtn.addEventListener(
    "click",
    recordLap
);


resetBtn.addEventListener(
    "click",
    resetStopwatch
);