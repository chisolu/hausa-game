function launchFireworks() {
    const colors = ["red", "yellow", "blue", "lime", "orange", "magenta"];

    const container = document.querySelector(".container");
    if (!container) return;

    const rect = container.getBoundingClientRect();

    for (let burst = 0; burst < 3; burst ++) {
        setTimeout(() => {
           const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 36; i++) {
                const particle = document.createElement("div");

                particle.className = "firework-particle";

                particle.style.left = centerX + "px";
                particle.style.top = centerY + "px";

                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = color;
                particle.style.color = color;
                const angle = (Math.PI * 2 * i) / 36;
                const distance = 30 + Math.random() * 50;

                particle.style.setProperty(
                    "--x", Math.cos(angle) * distance + "px"
                    );

                particle.style.setProperty(
                    "--y", Math.sin(angle) * distance + "px"
                );
                    document.body.appendChild(particle);
                    setTimeout(() => particle.remove(), 1100);                
            }
        }, burst * 300);
    }
}

let currentNumber;
let score = 0;
let questionCount = 0;
let maxQuestions = 10;
let timeleft = 60;
let timer;
let gameStarted = false;
let currentType;

// NUMBER TO ENGLISH WORD 

    const  hausaNumbers = {
        1: "daya",
        2: "biyu",
        3: "uku",
        4: "hudu",
        5: "biyar",
        6: "shida",
        7: "bakwai",
        8: "takwas",
        9: "tara",
        10: "goma",
        11: "goma sha daya",
        12: "goma sha biyu",
        13: "goma sha uku",
        14: "goma sha hudu",
        15: "goma sha biyar",
        16: "goma sha shida",
        17: "goma sha bakwai",
        18: "goma sha takwas",
        19: "goma sha tara",
        20: "ashirin",
        21: "ashirin da daya",
        22: "ashirin da biyu",
        23: "ashirin da uku",
        24: "ashirin da hudu",
        25: "ashirin da biyar",
        26: "ashirin da shida",
        27: "ashirin da bakwai",
        28: "ashirin da takwas",
        29: "ashirin da tara",
        30: "talatin",
        31: "talatin da daya",
        32: "talatin da biyu",
        33: "talatin da uku",
        34: "talatin da hudu",
        35: "talatin da biyar",
        36: "talatin da shida",
        37: "talatin da bakwai",
        38: "talatin da takwa",
        39: "talatin da tara",
        40: "arba'in",
        41: "arba'in da daya",
        42: "arba'in da biyu",
        43: "arba'in da uku",
        44: "arba'in da hudu",
        45: "arba'in da biyar",
        46: "arba'in da shida",
        47: "arba'in da bakwai",
        48: "arba'in da takwas",
        49: "arba'in da tara",
        50: "hamsin",
        51: "hamsin da daya",
        52: "hamsin da biyu",
        53: "hamsin da uku",
        54: "hamsin da hudu",
        55: "hamsin da biyar",
        56: "hamsin da shida",
        57: "hamsin da bakwai",
        58: "hamsin da takwas",
        59: "hamsin da tara",
        60: "sittin ",
        61: "sittin da daya",
        62: "sittin da biyu",
        63: "sittin da uku",
        64: "sittin da hudu",
        65: "sittin da biyar",
        66: "sittin da shida",
        67: "sittin da bakwai",
        68: "sittin da takwas",
        69: "sittin da tara",
        70: "saba'in",
        71: "saba'in da daya",
        72: "saba'in da biyu",
        73: "saba'in da uku",
        74: "saba'in da hudu",
        75: "saba'in da biyar",
        76: "saba'in da shida",
        77: "saba'in da bakwai",
        78: "saba'in da takwas",
        79: "saba'in da tara",
        80: "tama'in",
        81: "tama'in da daya",
        82: "tama'in da biyu",
        83: "tama'in da uku",
        84: "tama'in da hudu",
        85: "tama'in da biyar",
        86: "tama'in da shida",
        87: "tama'in da bakwai",
        88: "tama'in da takwas",
        89: "tama'in da tara",
        90: "casa'in",
        91: "casa'in da daya",
        92: "casa'in da biyu",
        93: "casa'in da uku",
        94: "casa'in da hudu",
        95: "casa'in da biyar",
        96: "casa'in da shida",
        97: "casa'in da bakwai",
        98: "casa'in da takwas",
        99: "casa'in da tara",

        100: "dari",
    };

    // start game

function startGame () {
    score = 0;
    questionCount = 0;
    timeleft = 60;
    gameStarted  = true;
    clearInterval(timer);

    document.getElementById("score").innerText = score;
    document.getElementById("count").innerText = questionCount;
    document.getElementById("timer").innerText = timeleft;
    document.getElementById("message").innerText = "";
    document.getElementById("answer").value = "";

    // start timer
    timer = setInterval( function () {
        timeleft--;
        document.getElementById("timer").innerText = timeleft;
        if (timeleft <= 0) {
            clearInterval(timer);
            gameStarted =false
            document.getElementById("question").innerText = "Time's up!";

            document.getElementById("message").innerText = 
            "Final Score:" + score + "/" + maxQuestions;
        } 
    }, 1000);
    nextQuestion();
}
// Generate next question
function nextQuestion () {
    if (questionCount >= maxQuestions) {
        clearInterval(timer);
        gameStarted = false;

         document.getElementById("question").innerText = "Game Over!";

         document.getElementById("message").innerText = 
         "Final Score:" + score + "/" + maxQuestions;
         return;
    }

    let level = Number(document.getElementById("level").value);
    // generate random number
    currentNumber = Math.floor(Math.random() * level) + 1;

    // RANDOMLY CHOOSE QUESTION TYPE
    currentType = Math.random() < 0.5
    ? "word"
    : "number";

    if (currentType === "word") {
        // example:
        // deus -> 2
        // cinq -> 5
    document.getElementById("question").innerText =
    hausaNumbers[currentNumber];
    document.getElementById("answer").type = "number";
    document.getElementById("answer").placeholder = "enter number";
    }
    else {
         // example:
        // 10 -> dix
        // 7 -> sept
    document.getElementById("question").innerText = currentNumber
    document.getElementById("answer").type = "text";
    document.getElementById("answer").placeholder = "enter hausa number";
    }

    // display english word
    // document.getElementById("question").innerText = numberTowords(currentNumber);
    // clear anser 
    document.getElementById("answer").value = "";
    //  increase question count
    questionCount++;
    document.getElementById("count").innerText = questionCount;
    // focus count
    document.getElementById("answer").focus();
}

// check answer
function checkAnswer () {
    if (!gameStarted) {
        return;
    }

  let answer = document.getElementById("answer")
  .value
  .trim()
  .toLowerCase();

//   dont accept emty answr
if (answer ==="") {
    return;
}
let correct = false;

// word number
if (currentType === "word"){
    if (Number(answer) === currentNumber){
        correct = true;
    }
}

else{
    let correcword = hausaNumbers[currentNumber].toLowerCase();
    if (answer === correcword) {
        correct = true;
    }
}

//   correct answer
  if (correct){
    score++;
    document.getElementById("score").innerText = score;
    document.getElementById("message").innerText = "correct!";
    message.style.color = "green"
    launchFireworks();
    
  } else{
    document.getElementById("message").innerText = 
    "wrong! correct answer: " + (currentType === "word" ? currentNumber
    : hausaNumbers[currentNumber]);
    message.style.color = "red"
  }
        nextQuestion();

} 
// press enter to submit answer
    document.getElementById("answer").addEventListener(
        "keydown",
        function(event) {
            if (event.key ==="Enter") {
                checkAnswer();
            }
        }
    );


