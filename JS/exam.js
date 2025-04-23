
var examName = "Mathematics";

var examsFileData;

var ipWithPortAddress="http://127.0.0.1:5500"

var submitAnswerButton = document.getElementById("submit-answer");
var headerSubjectName = document.getElementById("subjectName");



var queryString = window.location.search; 
var subjectName = queryString.split('=')[1];

headerSubjectName.textContent=subjectName;

loadExamsJsonFile();


function loadExamsJsonFile(){
    var xhrUsers = new XMLHttpRequest();

    xhrUsers.open("GET", ipWithPortAddress+"/JSON/exams.json");
    xhrUsers.send();


    xhrUsers.addEventListener("readystatechange", function () {

        if (xhrUsers.readyState === 4 && xhrUsers.status === 200) {

            examsFileData = JSON.parse(xhrUsers.responseText);


             startTimer();

        }
    })
}

function getExamTime() {
    for (var i = 0; i < examsFileData.exams.length; i++) {
        if (examsFileData.exams[i].title === examName) {
            return examsFileData.exams[i].time;
        }
    }
    return 0; 
}

function startTimer(duration, timerDisplay) {

    var time=getExamTime();

    var duration = time * 60;

    var timerDisplay = document.getElementById("navTimer");
    var progressBar = document.getElementById("navProgressBar");
    
    var timer = duration;
    var interval = setInterval(() => {
        var minutes = Math.floor(timer / 60);
        var seconds = timer % 60;


        timerDisplay.textContent = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);


        var percent = (timer / duration) * 100;
        progressBar.style.width = percent + "%";

        if (percent > 66) {
            progressBar.style.backgroundColor = "#007bff";
        } else if (percent > 33) {
            progressBar.style.backgroundColor = "orange";
        } else {
            progressBar.style.backgroundColor = "red";
        }

        --timer;
        if (timer < 0) {
            clearInterval(interval);
            timerDisplay.textContent = "Time's up!";
            submitAnswerButton.click();
        }
    }, 1000);
}

//replace with function submitAnswer()
function tempSubmitButtonAlert() {
    alert("Time's up")
}
