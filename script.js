

// Feature states
let featureStates = {
  darkMode: false,
  hearts: false,
  flowers: false,
  moths: false,
  music: false,
  sparkles: false
};

// Active intervals for cleanup
let activeIntervals = {
  flowers: null,
  moths: null,
  sparkles: null
};

// Theme colors and settings
const themes = {
  light: "#fff0f3ff",
  dark: "#000000",
  default: "#ffdee5"
};

const numHearts = 20;

// Get button elements
const darkModeBtn = document.querySelector("#darkModeBtn");
const heartsBtn = document.querySelector("#heartsBtn");
const flowersBtn = document.querySelector("#flowersBtn");
const mothsBtn = document.querySelector("#mothsBtn");
const musicBtn = document.querySelector("#musicBtn");
const sparklesBtn = document.querySelector("#sparklesBtn");

// Toggle Functions
function toggleDarkMode() {
  featureStates.darkMode = !featureStates.darkMode;
  
  if (featureStates.darkMode) {
    document.body.style.backgroundColor = themes.dark;
    darkModeBtn.innerText = "☀️ Light Mode";
    darkModeBtn.style.backgroundColor = "#444";
    darkModeBtn.style.color = "#fff";
  } else {
    document.body.style.backgroundColor = themes.light;
    darkModeBtn.innerText = "🌙 Dark Mode";
    darkModeBtn.style.backgroundColor = "#ffb6c1";
    darkModeBtn.style.color = "#333";
  }
  saveFeatureStates();
}

function toggleHearts() {
  featureStates.hearts = !featureStates.hearts;
  
  if (featureStates.hearts) {
    createHeart();
    heartsBtn.innerText = "💔 Stop Hearts";
    heartsBtn.style.backgroundColor = "#ff6b9d";
  } else {
    // Remove existing hearts
    document.querySelectorAll('.floating-heart').forEach(heart => {
      heart.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => heart.remove(), 500);
    });
    heartsBtn.innerText = "💖 Add Hearts";
    heartsBtn.style.backgroundColor = "#ffb6c1";
  }
  saveFeatureStates();
}

function toggleFlowers() {
  featureStates.flowers = !featureStates.flowers;
  
  if (featureStates.flowers) {
    // Start flower generation
    activeIntervals.flowers = setInterval(generateFlower, 300);
    flowersBtn.innerText = "🚫 Stop Flowers";
    flowersBtn.style.backgroundColor = "#98fb98";
  } else {
    // Stop flower generation
    if (activeIntervals.flowers) {
      clearInterval(activeIntervals.flowers);
      activeIntervals.flowers = null;
    }
    // Remove existing flowers
    document.querySelectorAll('.falling-flower').forEach(flower => {
      flower.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => flower.remove(), 500);
    });
    flowersBtn.innerText = "🌸 Add Flowers";
    flowersBtn.style.backgroundColor = "#ffb6c1";
  }
  saveFeatureStates();
}

function toggleMoths() {
  featureStates.moths = !featureStates.moths;
  
  if (featureStates.moths) {
    // Start continuous moth generation
    moths();
    activeIntervals.moths = setInterval(() => {
      if (featureStates.moths) {
        generateSingleMoth();
      }
    }, 1000);
    mothsBtn.innerText = "🚫 Stop Moths";
    mothsBtn.style.backgroundColor = "#8b4513";
    mothsBtn.style.color = "#fff";
  } else {
    // Stop moth generation
    if (activeIntervals.moths) {
      clearInterval(activeIntervals.moths);
      activeIntervals.moths = null;
    }
    // Remove existing moths
    document.querySelectorAll('.moths_movement').forEach(moth => {
      moth.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => moth.remove(), 500);
    });
    mothsBtn.innerText = "🦋 Add Moths";
    mothsBtn.style.backgroundColor = "#ffb6c1";
    mothsBtn.style.color = "#333";
  }
  saveFeatureStates();
}


const audio = new Audio('/assets/sound/Queen of Fire ext v7.mp3'); 
audio.loop = true; 

function toggleMusic() {
  featureStates.music = !featureStates.music;
  
  if (featureStates.music) {
    // Start music
    audio.currentTime = 0; // start from beginning
    audio.play().catch((error) => {
      console.error('Error playing audio:', error);
      // Reset state if play fails
      featureStates.music = false;
      musicBtn.innerText = "🎵 Play Music";
      musicBtn.style.backgroundColor = "#ffb6c1";
      return;
    });
    console.log("Music started!");
    musicBtn.innerText = "🔇 Stop Music";
    musicBtn.style.backgroundColor = "#ffd700";
  } else {
    // Stop music
    audio.pause();
    audio.currentTime = 0; // Reset to beginning
    console.log("Music stopped!");
    musicBtn.innerText = "🎵 Play Music";
    musicBtn.style.backgroundColor = "#ffb6c1";
  }
  saveFeatureStates();
}

function toggleSparkles() {
  featureStates.sparkles = !featureStates.sparkles;
  
  if (featureStates.sparkles) {
    // Start sparkle generation
    activeIntervals.sparkles = setInterval(generateSparkle, 200);
    sparklesBtn.innerText = "🚫 Stop Sparkles";
    sparklesBtn.style.backgroundColor = "#dda0dd";
  } else {
    // Stop sparkle generation
    if (activeIntervals.sparkles) {
      clearInterval(activeIntervals.sparkles);
      activeIntervals.sparkles = null;
    }
    // Remove existing sparkles
    document.querySelectorAll('.sparkle').forEach(sparkle => {
      sparkle.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => sparkle.remove(), 300);
    });
    sparklesBtn.innerText = "✨ Add Sparkles";
    sparklesBtn.style.backgroundColor = "#ffb6c1";
  }
  saveFeatureStates();
}

// Effect Generation Functions
function createHeart() {
  for (let i = 0; i < numHearts; i++) {
    const heart = document.createElement("img");
    heart.classList.add("floating-heart");
    heart.src = "/Birthday-Box/assets/images/heart.png";

    const size = Math.random() * 20 + 20;
    const left = Math.random() * 100;
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 5;

    heart.style.width = `${size}px`;
    heart.style.left = `${left}%`;
    heart.style.bottom = "-50px";
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;

    document.getElementById("heart-container").appendChild(heart);
    
    // Auto-remove after animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.remove();
      }
    }, (duration + delay) * 1000);
  }
}

function generateFlower() {
  if (!featureStates.flowers) return;
  
  const flower = document.createElement("img");
  flower.src = "/assets/images/flower.png";
  flower.classList.add("falling-flower");

  flower.style.left = Math.random() * 100 + "vw";
  const size = Math.random() * 30 + 20;
  flower.style.width = size + "px";
  flower.style.animationDuration = (Math.random() * 5 + 6) + "s";

  document.getElementById("flower-container").appendChild(flower);

  setTimeout(() => flower.remove(), 12000);
}

function moths() {
  let i = 0;
  while (featureStates.moths && i < numHearts) {
    generateSingleMoth();
    i++;
  }
}

function generateSingleMoth() {
  if (!featureStates.moths) return;
  
  const marsh = document.createElement("img");
  marsh.src = "/assets/images/moth.png";
  marsh.classList.add("moths_movement");

  const size_marsh = Math.random() * 140 + 20;
  const left_marsh = Math.random() * 100;
  const duration_marsh = Math.random() * 5 + 5;
  const delay_marsh = Math.random() * 5;

  marsh.style.width = `${size_marsh}px`;
  marsh.style.left = `${left_marsh}%`;
  marsh.style.bottom = "-100px";
  marsh.style.animationDuration = `${duration_marsh}s`;
  marsh.style.animationDelay = `${delay_marsh}s`;

  document.getElementById("moth-container").appendChild(marsh);
  
  // Auto-remove after animation
  setTimeout(() => {
    if (marsh.parentNode) {
      marsh.remove();
    }
  }, (duration_marsh + delay_marsh) * 1000);
}

function generateSparkle() {
  if (!featureStates.sparkles) return;
  
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.innerHTML = "✨";
  
  sparkle.style.position = "fixed";
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.top = Math.random() * 100 + "vh";
  sparkle.style.fontSize = (Math.random() * 20 + 10) + "px";
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "1000";
  sparkle.style.animation = "sparkleFloat 2s ease-out forwards";
  
  document.getElementById("sparkle-container").appendChild(sparkle);
  
  setTimeout(() => sparkle.remove(), 2000);
}

// Utility function to reset all features
function resetAllFeatures() {
  // Stop all intervals
  Object.keys(activeIntervals).forEach(key => {
    if (activeIntervals[key]) {
      clearInterval(activeIntervals[key]);
      activeIntervals[key] = null;
    }
  });
  
  // Reset all states
  Object.keys(featureStates).forEach(key => {
    featureStates[key] = false;
  });
  
  // Reset background
  document.body.style.backgroundColor = themes.default;
  
  // Remove all effects
  document.querySelectorAll('.floating-heart, .falling-flower, .moths_movement, .sparkle').forEach(element => {
    element.remove();
  });
  audio.pause();
  audio.currentTime = 0; // Reset to beginning
  console.log("Music stopped!");
  // Reset button texts and styles
  resetButtonStyles();
}

function resetButtonStyles() {
  darkModeBtn.innerText = "🌙 Dark Mode";
  heartsBtn.innerText = "💖 Add Hearts";
  flowersBtn.innerText = "🌸 Add Flowers";
  mothsBtn.innerText = "🦋 Add Moths";
  musicBtn.innerText = "🎵 Play Music";
  sparklesBtn.innerText = "✨ Add Sparkles";
  
  // Reset all button colors
  const buttons = [darkModeBtn, heartsBtn, flowersBtn, mothsBtn, musicBtn, sparklesBtn];
  buttons.forEach(btn => {
    btn.style.backgroundColor = "#ffb6c1";
    btn.style.color = "#333";
  });
}

// Page navigation
function goToGifts() {
  window.location.href = "gifts.html";
}



// 1. side nav
function toggleMenu() {
  const nav = document.getElementById("sideNav");
  const isOpen = nav.style.left === "0px";
  
  // Toggle with animation
  nav.style.transition = "left 0.3s ease";
  nav.style.left = isOpen ? "-200px" : "0px";
  
  // Add overlay when open
  if (!isOpen) {
    createOverlay();
  } else {
    removeOverlay();
  }
  
}

// 2. Create Clickable Overlay
function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "navOverlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.zIndex = "998";
  overlay.onclick = toggleMenu;
  document.body.appendChild(overlay);
}

function removeOverlay() {
  const overlay = document.getElementById("navOverlay");
  if (overlay) overlay.remove();
}

// 3. Close with Escape Key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const nav = document.getElementById("sideNav");
    if (nav.style.left === "0px") {
      toggleMenu();
    }
  }
});

// 4. Initialize in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Your existing initialization code...
  
  // Make sure sidebar starts closed
  document.getElementById("sideNav").style.left = "-200px";
});


// 1. Save states to storage 
// Save state (call this after ANY toggle changes)
function saveFeatureStates() {
  localStorage.setItem('featureStates', JSON.stringify(featureStates));
  console.log("Saved:", featureStates); // Debug
}

// Load state (call on page load)
function loadFeatureStates() {
  const saved = localStorage.getItem('featureStates');
  if (saved) {
    featureStates = JSON.parse(saved);
    console.log("📂 Loaded:", featureStates); // Debug
    applyFeatureStates();
  }
  
}

// Apply loaded states
function applyFeatureStates() {
  // Dark Mode
  document.body.classList.toggle('dark-mode', featureStates.darkMode);
  
  // Effects
  if (featureStates.hearts) createHeart();
  if (featureStates.flowers) activeIntervals.flowers = setInterval(generateFlower, 300);;
  if (featureStates.moths) moths();
        activeIntervals.moths = setInterval(() => {
        if (featureStates.moths) {
            generateSingleMoth();
        }
    }, 1000);;
  if (featureStates.sparkles) activeIntervals.sparkles = setInterval(generateSparkle, 200);
  if (featureStates.music) audio.play();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadFeatureStates);

const videoOverlay = document.getElementById('videoOverlay');
const introVideo = document.getElementById('introVideo');
const skipBtn = document.getElementById('skipBtn');

function endIntro() {
    videoOverlay.classList.add('fade-out');
    introVideo.pause();
    introVideo.currentTime = 0; // Reset to beginning
    setTimeout(() => {
        videoOverlay.style.display = 'none';
    }, 500);
}

introVideo.addEventListener('ended', endIntro);

skipBtn.addEventListener('click', endIntro);
