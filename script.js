function openTodo() {
  let allElems = document.querySelectorAll(".elem");
  let allFullPages = document.querySelectorAll(".fullElem");
  let allFullPagesBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allFullPages[elem.id].style.display = "block";
    });
  });

  allFullPagesBackBtn.forEach(function (back, index) {
    back.addEventListener("click", function () {
      allFullPages[back.id].style.display = "none";
    });
  });
}
openTodo();

// ToDoList
function ToDoList() {
  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("LocalStorage is Empty !");
  }

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");
  let allTask = document.querySelector(".allTask");
  let message = document.querySelector(".addTask form #message");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent reloadation

    taskInput.value = taskInput.value.trim();
    if (taskInput.value == "") {
      message.classList.remove("mess");
      message.classList.add("show-mess");
    } else {
      currentTask.push({
        task: taskInput.value,
        detail: taskDetailInput.value,
        imp: taskCheckbox.checked,
      });
      message.classList.remove("show-mess");
      message.classList.add("mess");
    }
    taskInput.value = "";
    taskDetailInput.value = "";
    taskCheckbox.checked = false;

    renderTask();
  });

  function renderTask() {
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    let sum = "";
    currentTask.forEach(function (task, idx) {
      sum += `<div class="task">
              <h3>${task.task} <span class=${task.imp}>Imp</span></h3>
              <button id=${idx}>Mark as Complited</button>
            </div>`;
    });

    allTask.innerHTML = sum;

    let complitedTaskBtn = document.querySelectorAll(".task button");
    complitedTaskBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();
}
ToDoList();


// Daily Planner
function DailyPlanner() {
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  //   console.log(dayPlanData);

  //   let dayPlannerTime = document.querySelector(".day-planner-time");

  let hours = Array.from({ length: 24 }, (elem, idx) => {
    if (idx < 12) {
      return `${idx}:00 - ${idx + 1}:00`;
    } else if (idx >= 12) {
      return `${idx - 12}:00 - ${idx - 11}:00`;
    }
  });
  // console.log(hours);

  let dayPlanner = document.querySelector(".day-planner");

  let wholeDaySum = "";
  hours.forEach(function (hour, idx) {
    let showData = dayPlanData[idx] || "";

    let term = true,
      text = true;

    if (idx >= 12) term = false;
    if (hour == "0:00 - 1:00") text = false; // for (12:00 - 1:00)

    wholeDaySum += `<div class="day-planner-time">
                              <p>${text ? hour : "12:00 - 1:00"}<small >${
      term ? "AM" : "PM"
    }</small></p>
                              <input id=${idx} value="${showData}" type="text" placeholder="......"
                  }>
                        </div>`;
    text = true;
  });
  dayPlanner.innerHTML = wholeDaySum;

  let DayPlannerInputs = document.querySelectorAll(".day-planner input");

  DayPlannerInputs.forEach(function (inpt) {
    inpt.addEventListener("input", function () {
      dayPlanData[inpt.id] = inpt.value.trim();

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
DailyPlanner(); // call to DailyPalnner Function


// Motivational Quotes
function motivationalQuote() {
  const quotes = [
    { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { quote: "Less is more.", author: "Ludwig Mies van der Rohe" },
    {
      quote: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci",
    },
    {
      quote: "Do what you can, with what you have.",
      author: "Theodore Roosevelt",
    },
    { quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { quote: "Happiness depends upon ourselves.", author: "Aristotle" },
    { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
    {
      quote: "Action is the foundational key to success.",
      author: "Pablo Picasso",
    },
    { quote: "What you think, you become.", author: "Buddha" },
    {
      quote: "Be yourself; everyone else is taken.",
      author: "Oscar Wilde",
    },
    {
      quote: "The best way out is always through.",
      author: "Robert Frost",
    },
    {
      quote: "Life is short, and it is up to you to make it sweet.",
      author: "Sarah Louise Delany",
    },
    {
      quote: "Fall seven times and stand up eight.",
      author: "Japanese Proverb",
    },
    {
      quote: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      quote: "Everything you can imagine is real.",
      author: "Pablo Picasso",
    },
    {
      quote: "In the middle of every difficulty lies opportunity.",
      author: "Albert Einstein",
    },
    { quote: "Do small things with great love.", author: "Mother Teresa" },
    { quote: "Keep going. Be all in.", author: "Bryan Hutchinson" },
    {
      quote: "The secret of getting ahead is getting started.",
      author: "Mark Twain",
    },
    {
      quote: "Act as if what you do makes a difference. It does.",
      author: "William James",
    },
  ];

  let date = document.querySelector(".motivational-fullpage .date");
  let back = document.querySelector(".back#\\32");

    back.addEventListener("click", function () {
            window.location.reload();
    });

  let motivationQuote = document.querySelector(
    ".quote-Container .motivation-quote1"
  );
  let author = document.querySelector(".quote-Container .author");

  function randomNo() {
    let random = Math.floor(Math.random() * 20);
    return random;
  }

  function fetchQuote() {
    let random = randomNo();
    // console.log(random);

    let data = quotes[random];

    motivationQuote.innerHTML = data.quote;
    author.innerHTML = "- " + data.author;

    const today = new Date();
    const Todaydate = today.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    date.innerHTML = Todaydate;

  }

  fetchQuote();

}
motivationalQuote();


// Pomodoro Timer
function pomodoroTimer() {
            
      let totalSeconds = 25 * 60;

      let timeIntervalid = null;

      let timer = document.querySelector(".pomodoro-fullpage .pomo-timer h2");
      let startbtn = document.querySelector(".pomo-timer .start-timer");
      let pausebtn = document.querySelector(".pomo-timer .pause-timer");
      let reset = document.querySelector(".pomo-timer .reset-timer");
      let session = document.querySelector(".pomo-timer .session");

      let isWorkSession = true;

      function updateTimer() {
      let minites = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      // console.log(minites, seconds);

      timer.innerHTML = `${String(minites).padStart(2, "0")}:${String(
      seconds
      ).padStart(2, "0")}`;
      }

      function startTimer() {
      clearInterval(timeIntervalid);

      if (isWorkSession) {
      timeIntervalid = setInterval(function () {
            if (totalSeconds > 0) {
            totalSeconds--;
            updateTimer();
            } else {
            isWorkSession = false;
            clearInterval(timeIntervalid);

            timer.innerHTML = "05:00";
            session.innerHTML = "Break Session";
            session.style.color = "#9fc612";
            session.style.backgroundColor = "#3c3d2f";

            totalSeconds = 5 * 60;
            }
      }, 1000);
      } else {
      timeIntervalid = setInterval(function () {
            if (totalSeconds > 0) {
            totalSeconds--;
            updateTimer();
            } else {
            isWorkSession = true;
            clearInterval(timeIntervalid);

            timer.innerHTML = "25:00";
            session.innerHTML = "Take a Break";
            session.style.color = "#0e9664";
            session.style.backgroundColor = "#2f3d3c";

            totalSeconds = 25 * 60;
            }
      }, 1000);
      }
      }

      function pauseTimer() {
      clearInterval(timeIntervalid);
      }

      function resetTimer() {
      if (isWorkSession) {
      totalSeconds = 25 * 60;
      } else {
      totalSeconds = 5 * 60;
      }
      clearInterval(timeIntervalid); // its stop the setInterval, setInterval return unique id which we can store.
      // This ID is then passed to clearInterval() to target and stop that particular repeating action

      updateTimer();
      pauseTimer();
      }

      startbtn.addEventListener("click", startTimer);
      pausebtn.addEventListener("click", pauseTimer);
      reset.addEventListener("click", resetTimer);

}
pomodoroTimer();


//  Header Secssion
function WeatherDisplay() {
            
      let header2Temp = document.querySelector("header .header2 h2");
      let header2Info = document.querySelector("header .header2 h4");
      let header2Visibility = document.querySelector("header .header2 .visibility");
      let header2Humidity = document.querySelector("header .header2 .humidity");
      let header2Wind = document.querySelector("header .header2 .wind");
      let header1Place = document.querySelector("header .header1 h4");

      let city = "Ahmedabad";
      // API Key: 0fd10bb45e574a3cb8a163443251908  of  api = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

      async function weatherAPICall() {
      let responce = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"5b49f7dd7d71492a9cefb52bcbc3cd86"}`
      );
      let data = await responce.json();
      // console.log(data);

      header1Place.innerHTML = `Ahmedabad, Gujarat`;
      header2Temp.innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
      header2Info.innerHTML = `${data.weather[0].description}`;
      header2Visibility.innerHTML = `Visibility : ${data.visibility / 1000}  km `;
      header2Humidity.innerHTML = `Humidity : ${data.main.humidity}%`;
      header2Wind.innerHTML = `Wind : ${data.wind.speed} km/h`;
      }
      weatherAPICall();

      let header1H1 = document.querySelector("header .header1 h1");
      let header1H2 = document.querySelector("header .header1 h2");

      let date = null;

      function timeDate() {
            const now = new Date();

            const weekday = now.toLocaleString("en-US", { weekday: "long" });

            const day = now.getDate();

            const month = now.toLocaleString("en-US", { month: "long" });
            const year = now.getFullYear();

            // Time parts
            const hour = now.getHours().toString().padStart(2, "0");
            const minute = now.getMinutes().toString().padStart(2, "0");
            const second = now.getSeconds().toString().padStart(2, "0");

            header1H2.innerHTML = `${month} ${day}, ${year}`;

            if (hour <= 12) {
                  header1H1.innerHTML = `${weekday}, ${hour}:${minute}:${second} am`;
            } else {
                  header1H1.innerHTML = `${weekday}, ${hour - 12}:${minute}:${second} pm`;
            }
      }

      setInterval(() => {
      timeDate();
      }, 1000);
}
WeatherDisplay();



let rootElement =  document.documentElement

let theme = document.querySelector('.allElems nav i')

// console.log(rootElement);

theme.addEventListener('click', function() {
      // --text: #F1EFEC;
      // --black: #151515;
      // --blue: #123458;
      // --tri2: #D4C9BE ;
      // --broun: #a55102 ;
      // --gray: #252525;
      

      if (theme.classList[0] == "ri-sun-line"){
            theme.classList.remove("ri-sun-line");
            theme.classList.add("ri-moon-line");

            rootElement.style.setProperty("--text", "#000");
            rootElement.style.setProperty("--black", "#fff");
            rootElement.style.setProperty("--blue", "#D4C9BE");
            rootElement.style.setProperty("--tri2", "#123458");
            rootElement.style.setProperty("--gray", "#D4C9BE");
            rootElement.style.setProperty("--broun", "#123458");
            rootElement.style.setProperty("--gradient", "#123458, #1c4e85, #2364aa");
            rootElement.style.setProperty("--gradient2", "#123458b3, #1234586f, #bfcbd70f");
      }
      else{
            theme.classList.remove("ri-moon-line");
            theme.classList.add("ri-sun-line");

            rootElement.style.setProperty("--text", "#F1EFEC");
            rootElement.style.setProperty("--black", "#151515");
            rootElement.style.setProperty("--blue", "#123458");
            rootElement.style.setProperty("--tri2", "#D4C9BE");
            rootElement.style.setProperty("--broun", "#a55102");
            rootElement.style.setProperty("--gray", "#252525");
             rootElement.style.setProperty("--gradient", "#602f00, #7a3b00, #a55102");
            rootElement.style.setProperty("--gradient2", "#a55102ad, #a5510282, #d4c9be00 ");
      }
      
})