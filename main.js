
let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let laps = [];


const timerDisplay = document.getElementById('timerDisplay')
const startStopBtn = document.getElementById('startStopBtn')
const resetBt = document.getElementById('resetBtn')
const lapBtn = document.getElementById('lapBtn')
const lapsContainer = document.getElementById('laps')


startStopBtn.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timerInterval)
        startStopBtn.style.background = '#007bff'
        startStopBtn.textContent = 'Start'
    } else {
        const startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay()
        })
        startStopBtn.style.background = '#f00'
        startStopBtn.textContent = 'Stop'
    }

    isRunning = !isRunning
})

resetBt.addEventListener('click', function() {
    clearInterval(timerInterval)
    elapsedTime = 0
    isRunning = false
    startStopBtn.textContent = 'Start'
    updateDisplay()
    laps = []
    updateLaps()
})

lapBtn.addEventListener('click', function() {
    if (isRunning) {
        laps.push(formatTime(elapsedTime))
        updateLaps()
    }
})

function updateDisplay() {
    timerDisplay.textContent = formatTime(elapsedTime)
}

function formatTime(time) {
    const milliseconds = time % 100
    const second = Math.floor((time / 1000) % 60)
    const minute = Math.floor((time / (1000 * 60)) % 60)
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    return `${String(hours).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`
}

function updateLaps() {
    lapsContainer.innerHTML = ''

    laps.forEach((lap, index) => {
        const lapsElement = document.createElement('div')
        lapsElement.textContent = `Lap ${index + 1}: ${lap}`
        lapsContainer.appendChild(lapsElement)
    })
}