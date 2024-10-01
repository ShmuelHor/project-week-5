const socket = io("http://localhost:3000", {
  withCredentials: false,
  transports: ["websocket"],
});

let currentPlayer = "X";
let gameHistory = [];
let board = ["", "", "", "", "", "", "", "", ""];

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const gamePage = document.getElementById("game-page");

const registerFormElement = document.getElementById("register-form-element");
const loginFormElement = document.getElementById("login-form-element");

const showLoginElement = document.getElementById("show-login");
const showRegisterElement = document.getElementById("show-register");

// Event listeners for form submission and page switching
registerFormElement.addEventListener("submit", function (e) {
  e.preventDefault();
  register();
});

loginFormElement.addEventListener("submit", function (e) {
  e.preventDefault();
  login();
});

showLoginElement.addEventListener("click", showLogin);
showRegisterElement.addEventListener("click", showRegister);

// Show the registration form
function showRegister() {
  registerForm.style.display = "block";
  loginForm.style.display = "none";
  gamePage.style.display = "none";
}

// Show the login form
function showLogin() {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  gamePage.style.display = "none";
}

// Register the user with Axios
function register() {
  let username = document.getElementById("register-username").value;
  let password = document.getElementById("register-password").value;

  axios
    .post("https://your-backend-url.com/api/register", {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.data.success) {
        alert("Registration successful!");
        showLogin();
      } else {
        alert("Registration failed: " + response.data.message);
      }
    })
    .catch((error) => {
      console.error("Error during registration:", error);
    });
}

// Login the user with Axios
function login() {
  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;

  axios
    .post("https://your-backend-url.com/api/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.data.success) {
        document.getElementById("player-name").innerText = username;
        showGame();
      } else {
        alert("Login failed: " + response.data.message);
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
}

// Show the game page
function showGame() {
  gamePage.style.display = "block";
  registerForm.style.display = "none";
  loginForm.style.display = "none";
}

// Make a move on the game board
document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", function () {
    let index = this.getAttribute("data-index");
    makeMove(index);
  });
});

function makeMove(index) {
  if (board[index] === "") {
    board[index] = currentPlayer;
    document.querySelectorAll(".cell")[index].innerText = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkWinner();
  }
}

// Check if there's a winner or tie
function checkWinner() {
  let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    let [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      alert(`${board[a]} wins!`);
      gameHistory.push(`Game: ${board.join("")}`);
      resetGame();
      updateHistory();
      return;
    }
  }

  if (board.every((cell) => cell !== "")) {
    alert("It's a tie!");
    gameHistory.push(`Game: ${board.join("")}`);
    resetGame();
    updateHistory();
  }
}

// Reset the game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerText = "";
  });
}

// Update the game history
function updateHistory() {
  let historyList = document.getElementById("game-history");
  historyList.innerHTML = "";
  for (let game of gameHistory) {
    let listItem = document.createElement("li");
    listItem.innerText = game;
    historyList.appendChild(listItem);
  }
}
