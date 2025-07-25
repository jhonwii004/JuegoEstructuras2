//Contraseñas para cada nivel
const niveles = [
  { nombre: "Nivel 1", password: "12345", image: "images/Arbol1.png", Indice: "1,2,3,4,5"},
  { nombre: "Nivel 2", password: "43654", image: "images/Arbol2.png", Indice: "3,5,6,4,3" },
  { nombre: "Nivel 3", password: "55501624", image: "images/Arbol3.png", Indice: "3,3,1,2,5" },
  { nombre: "Nivel 4", password: "253551025", image: "images/Arbol4.png", Indice: "5,7,1,2,5" },
  { nombre: "Nivel 5", password: "1212332", image: "images/Arbol5.png", Indice: "2,2,1,1,5" },

];

// Game state
let PasswordActual = "";
let input = "";
let currentIndex = 0;
let timeLeft = 30;
let timerInterval;
const penalty = 3;

// Element references
const levelList = document.getElementById('levelList');
const timerDisplay = document.getElementById('timer');
const inputDisplay = document.getElementById('inputDisplay');
const message = document.getElementById('message');
const keypad = document.getElementById('keypad');
const restart = document.getElementById('Restart');
const instrucciones = document.getElementById('instrucciones');
const Help = document.getElementById('Help');
const indexClue = document.getElementById('indices');
// Generate level buttons
niveles.forEach(nivel => {
  const btn = document.createElement('button');
  btn.textContent = nivel.nombre;
  btn.className = "bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray -600";
  btn.onclick = () => startGame(nivel.password, nivel.image, nivel.Indice);
  levelList.appendChild(btn);
});

// Start a new game
function startGame(password, imageurl, indices) {
  PasswordActual = password;
  userInput = "";
  currentIndex = 0;
  timeLeft = 30;
  message.textContent = "";
  levelList.classList.add('hidden');
  instrucciones.classList.add('hidden');
  Help.classList.add('hidden');
  indexClue.classList.remove('hidden');

  // Show the level image
  const levelImage = document.getElementById('levelImage');
  levelImage.src = imageurl;
  levelImage.classList.remove('hidden');
  inputDisplay.textContent = "";
  indexClue.textContent = indices;
  keypad.style.display = 'grid';
  timerDisplay.style.display = 'block';
  restart.classList.remove('hidden');
  generateKeypad();
  updateTimerDisplay();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      message.textContent = "Se acabó el tiempo!";
      keypad.style.display = 'none';
    }
  }, 1000);
}

// Update timer UI
function updateTimerDisplay() {
  timerDisplay.textContent = `Tiempo restante: ${timeLeft}`;
}

// Build number keypad
function generateKeypad() {
  keypad.innerHTML = "";
  for (let i = 1; i <= 9; i++) addKey(i);
  addKey(0);
}

// Add a keypad button
function addKey(number) {
  const btn = document.createElement('button');
  btn.textContent = number;
  btn.className = "bg-blue-500 text-xl text-white font-bold px-2 py-1 rounded hover:bg-gray-400";
  btn.onclick = () => handleInput(number);
  keypad.appendChild(btn);
}

// Handle user input
function handleInput(number) {
  if (PasswordActual[currentIndex] == number) {
    userInput += number;
    inputDisplay.textContent = " * ".repeat(userInput.length);
    currentIndex++;

    if (userInput === PasswordActual) {
      clearInterval(timerInterval);
      message.textContent = "Adivinaste la contraseña! 🎉";
      keypad.style.display = 'none';
    }
  } else {
    timeLeft -= penalty;
    if (timeLeft <= 0) {
      timeLeft = 0;
      updateTimerDisplay();
      clearInterval(timerInterval);
      message.textContent = "¡Dígito incorrecto! ¡Se acabó el tiempo!";
      keypad.style.display = 'none';
    } else {
      updateTimerDisplay();
      message.textContent = `¡Dígito incorrecto! -${penalty}s`;
    }
  }
}
restart.onclick = () => {
  levelImage.classList.add('hidden');
  keypad.style.display = 'none';
  timerDisplay.style.display = 'none';
  inputDisplay.textContent = "";
  message.textContent = "";
  levelList.classList.remove('hidden');
  clearInterval(timerInterval);
  restart.classList.add('hidden');
  Help.classList.remove('hidden');
  indexClue.classList.add('hidden');
};

Help.onclick = () => {
    if (instrucciones.classList.contains('hidden')) {
      instrucciones.classList.remove('hidden');
    } else {
      instrucciones.classList.add('hidden');
    }
};