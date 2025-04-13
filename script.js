document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const preloader = document.getElementById("preloader");
  const logoContainer = document.querySelector(".logo-container");
  const snackIcons = document.querySelectorAll(".snack-icon");
  const loadingMessage = document.querySelector(".loading-message");
  const progressContainer = document.querySelector(".progress-container");
  const progressBar = document.querySelector(".progress-bar");
  const percentage = document.querySelector(".percentage");
  const crunchMarks = document.querySelector(".crunch-marks");

  // Loading messages
  const loadingMessages = [
    "Summoning snack realms...",
    "Crunching flavors...",
    "Sprinkling cosmic salt...",
    "Heating up spicy world...",
    "Adding sour zaps...",
    "Sweetening the galaxy...",
  ];

  // Initial animations
  setTimeout(() => {
    logoContainer.style.transform = "scale(1)";
    logoContainer.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    snackIcons.forEach((icon, index) => {
      setTimeout(() => {
        icon.style.opacity = "1";
      }, index * 150);
    });
  }, 800);

  setTimeout(() => {
    loadingMessage.style.opacity = "1";
    loadingMessage.style.transform = "translateY(0)";

    // Change loading message every 1.5 seconds
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      loadingMessage.style.opacity = "0";
      loadingMessage.style.transform = "translateY(10px)";

      setTimeout(() => {
        loadingMessage.textContent = loadingMessages[messageIndex];
        loadingMessage.style.opacity = "1";
        loadingMessage.style.transform = "translateY(0)";
      }, 300);
    }, 2000);

    // Clear interval when preloader is removed
    setTimeout(() => {
      clearInterval(messageInterval);
    }, 7000);
  }, 1200);

  // Show progress bar
  setTimeout(() => {
    progressContainer.style.opacity = "1";
    progressContainer.style.transform = "scaleX(1)";
    percentage.style.opacity = "1";
    progressBar.classList.add("animate");

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 3; // Random increment between 3-10

      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);

        // Fade out preloader after 100%
        setTimeout(() => {
          document.body.classList.add("loaded");

          // Remove preloader after animation
          setTimeout(() => {
            preloader.classList.add("hidden");
          }, 800);
        }, 800);
      }

      // Update progress bar and percentage
      progressBar.style.width = progress + "%";
      percentage.textContent = progress + "%";

      // Add crunch mark at current position
      if (progress < 100) {
        createCrunchMark(progress);
      }
    }, 200);
  }, 1500);

  // Create crunch mark at a specific position
  function createCrunchMark(progress) {
    const crunchMark = document.createElement("div");
    crunchMark.className = "crunch-mark";

    // Position based on progress
    const xPos = (progress / 100) * progressContainer.offsetWidth;
    const yPos = Math.random() * progressContainer.offsetHeight;

    crunchMark.style.left = xPos + "px";
    crunchMark.style.top = yPos + "px";

    // Random size
    const size = Math.random() * 10 + 5;
    crunchMark.style.width = size + "px";
    crunchMark.style.height = size + "px";

    // Add to container
    crunchMarks.appendChild(crunchMark);

    // Animate and remove
    crunchMark.style.animation = "crunch 0.5s forwards";

    setTimeout(() => {
      crunchMark.remove();
    }, 500);
  }

  // Animate logo letters
  const logoLetters = document.querySelectorAll(".logo span");
  logoLetters.forEach((letter, index) => {
    letter.style.animation = `pulse 1.5s infinite ${index * 0.2}s`;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const flavorButton = document.getElementById("flavor-finder-button");
  const modalOverlay = document.getElementById("flavor-modal-overlay");
  const closeButton = document.querySelector(".close-button");
  const moodSelector = document.getElementById("mood-selector");
  const loadingScreen = document.getElementById("loading-screen");
  const moodButtons = document.querySelectorAll(".mood-button");

  // Open modal when floating button is clicked
  flavorButton.addEventListener("click", function () {
    modalOverlay.style.display = "flex";
    // Slight fade-in effect
    setTimeout(() => {
      modalOverlay.style.opacity = 1;
    }, 10);
  });

  // Close modal functions
  function closeModal() {
    modalOverlay.style.opacity = 0;
    setTimeout(() => {
      modalOverlay.style.display = "none";
      // Reset modal state
      moodSelector.classList.remove("hidden");
      loadingScreen.classList.add("hidden");
    }, 300);
  }

  // Close modal when X button is clicked
  closeButton.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  // Handle mood button clicks
  moodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get target section
      const targetSectionId = this.getAttribute("data-target");

      // Hide mood selector, show loading
      moodSelector.classList.add("hidden");
      loadingScreen.classList.remove("hidden");

      // Wait for "analysis" (fake loading)
      setTimeout(() => {
        // Close modal
        closeModal();

        // After modal closes, scroll to the appropriate section
        setTimeout(() => {
          const targetSection = document.getElementById(targetSectionId);
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 300);
      }, 2000); // 2 seconds loading time
    });
  });

  // Add fancy loading messages for more engagement
  const loadingMessages = [
    "Analyzing your flavor aura...",
    "Sensing your snack wavelength...",
    "Matching your mood molecules...",
    "Calculating crunch compatibility...",
    "Determining taste tendencies...",
  ];

  // Randomly change loading text every 500ms
  let messageInterval;

  function startLoadingMessages() {
    const loadingText = document.querySelector(".loading-text");
    messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      loadingText.textContent = loadingMessages[randomIndex];

      // Add a little animation
      loadingText.style.transform = "scale(1.05)";
      setTimeout(() => {
        loadingText.style.transform = "scale(1)";
      }, 150);
    }, 500);
  }

  function stopLoadingMessages() {
    clearInterval(messageInterval);
  }

  // Start and stop message cycling when loading screen appears/disappears
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target === loadingScreen) {
        if (loadingScreen.classList.contains("hidden")) {
          stopLoadingMessages();
        } else {
          startLoadingMessages();
        }
      }
    });
  });

  observer.observe(loadingScreen, { attributes: true });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const flavorButton = document.getElementById("flavor-finder-button");
  const modalOverlay = document.getElementById("flavor-modal-overlay");
  const closeButton = document.querySelector(".close-button");
  const moodSelector = document.getElementById("mood-selector");
  const loadingScreen = document.getElementById("loading-screen");
  const moodButtons = document.querySelectorAll(".mood-button");

  // Open modal when floating button is clicked
  flavorButton.addEventListener("click", function () {
    modalOverlay.style.display = "flex";
    // Slight fade-in effect
    setTimeout(() => {
      modalOverlay.style.opacity = 1;
    }, 10);
  });

  // Close modal functions
  function closeModal() {
    modalOverlay.style.opacity = 0;
    setTimeout(() => {
      modalOverlay.style.display = "none";
      // Reset modal state
      moodSelector.classList.remove("hidden");
      loadingScreen.classList.add("hidden");
    }, 300);
  }

  // Close modal when X button is clicked
  closeButton.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  // Handle mood button clicks
  moodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get target section
      const targetSectionId = this.getAttribute("data-target");

      // Hide mood selector, show loading
      moodSelector.classList.add("hidden");
      loadingScreen.classList.remove("hidden");

      // Wait for "analysis" (fake loading)
      setTimeout(() => {
        // Close modal
        closeModal();

        // After modal closes, scroll to the appropriate section
        setTimeout(() => {
          const targetSection = document.getElementById(targetSectionId);
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 300);
      }, 2000); // 2 seconds loading time
    });
  });

  // Add fancy loading messages for more engagement
  const loadingMessages = [
    "Analyzing your flavor aura...",
    "Sensing your snack wavelength...",
    "Matching your mood molecules...",
    "Calculating crunch compatibility...",
    "Determining taste tendencies...",
  ];

  // Randomly change loading text every 500ms
  let messageInterval;

  function startLoadingMessages() {
    const loadingText = document.querySelector(".loading-text");
    messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      loadingText.textContent = loadingMessages[randomIndex];

      // Add a little animation
      loadingText.style.transform = "scale(1.05)";
      setTimeout(() => {
        loadingText.style.transform = "scale(1)";
      }, 150);
    }, 500);
  }

  function stopLoadingMessages() {
    clearInterval(messageInterval);
  }

  // Start and stop message cycling when loading screen appears/disappears
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target === loadingScreen) {
        if (loadingScreen.classList.contains("hidden")) {
          stopLoadingMessages();
        } else {
          startLoadingMessages();
        }
      }
    });
  });

  observer.observe(loadingScreen, { attributes: true });
});
// Create stars in the background
const starsContainer = document.getElementById("stars");
const numberOfStars = 200;

for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  // Random size between 1 and 4 pixels
  const size = Math.random() * 3 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  // Random position
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;

  // Random twinkle delay
  star.style.animationDelay = `${Math.random() * 4}s`;

  starsContainer.appendChild(star);
}

// Create snack planets
const hero = document.querySelector(".hero");
const snackEmojis = [
  "🍪",
  "🍩",
  "🍕",
  "🍫",
  "🍿",
  "🥨",
  "🍦",
  "🥐",
  "🧁",
  "🍰",
];
const numberOfPlanets = 8;

for (let i = 0; i < numberOfPlanets; i++) {
  const planet = document.createElement("div");
  planet.classList.add("snack-planet");

  // Random size between 40 and 100 pixels
  const size = Math.random() * 60 + 40;
  planet.style.width = `${size}px`;
  planet.style.height = `${size}px`;

  // Random position
  planet.style.top = `${Math.random() * 80 + 10}%`;
  planet.style.left = `${Math.random() * 80 + 10}%`;

  // Random animation delay
  planet.style.animationDelay = `${Math.random() * 5}s`;

  // Random emoji as snack
  const randomEmoji =
    snackEmojis[Math.floor(Math.random() * snackEmojis.length)];
  planet.textContent = randomEmoji;

  // Set z-index based on size for depth perception
  planet.style.zIndex = Math.floor(size) % 2 === 0 ? 0 : 3;

  hero.appendChild(planet);
}

// Create floating snack planets
const spicyWorld = document.getElementById("spicy-world");
const spicySnacks = ["🌮", "🌭", "🌶️", "🍗", "🥓", "🍕", "🔥", "🌯"];
numberOfPlanets = 6;

for (let i = 0; i < numberOfPlanets; i++) {
  const planet = document.createElement("div");
  planet.classList.add("snack-planet");

  // Random size between 30 and 70 pixels
  const size = Math.random() * 40 + 30;
  planet.style.width = `${size}px`;
  planet.style.height = `${size}px`;

  // Random position
  planet.style.top = `${Math.random() * 80 + 10}%`;
  planet.style.left = `${Math.random() * 80 + 10}%`;

  // Random animation delay
  planet.style.animationDelay = `${Math.random() * 5}s`;

  // Random emoji as snack
  const randomEmoji =
    spicySnacks[Math.floor(Math.random() * spicySnacks.length)];
  planet.textContent = randomEmoji;

  spicyWorld.appendChild(planet);
}

// Animate cards when they come into view
const cards = document.querySelectorAll(".snack-card");

// Option 1: Animate cards on page load
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    cards.forEach((card) => {
      const delay = parseInt(card.dataset.delay) || 0;
      setTimeout(() => {
        card.classList.add("card-animated");
      }, delay);
    });
  }, 500);
});

// Option 2: Animate cards when scrolled into view
const animateOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.8;

  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      const delay = parseInt(card.dataset.delay) || 0;
      setTimeout(() => {
        card.classList.add("card-animated");
      }, delay);
    }
  });
};

window.addEventListener("scroll", animateOnScroll);

// For smooth scroll when CTA is clicked from hero section
document.addEventListener("DOMContentLoaded", () => {
  // Check if there's a hash in the URL
  if (window.location.hash === "#spicy-world") {
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("spicy-world").offsetTop,
        behavior: "smooth",
      });
    }, 100);
  }

  // Also initialize animation check on load
  animateOnScroll();
});

// Create glowing stars
starsContainer = document.getElementById("stars-container");
numberOfStars = 150;

for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  // Random size between 2 and 5 pixels
  const size = Math.random() * 3 + 2;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  // Random position
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;

  // Random twinkle delay
  star.style.animationDelay = `${Math.random() * 4}s`;

  starsContainer.appendChild(star);
}

// Create floating candy elements
const sweetGalaxy = document.getElementById("sweet-galaxy");
const candyEmojis = [
  "🍭",
  "🍬",
  "🍦",
  "🧁",
  "🍰",
  "🍫",
  "🍪",
  "🍩",
  "🍮",
  "🍨",
];
const numberOfCandies = 12;

for (let i = 0; i < numberOfCandies; i++) {
  const candy = document.createElement("div");
  candy.classList.add("candy-element");

  // Some candies will orbit, others will float
  if (i % 3 === 0) {
    candy.classList.add("orbit");
    // Set orbit center at different positions
    candy.style.top = `${30 + Math.random() * 40}%`;
    candy.style.left = `${30 + Math.random() * 40}%`;
    // Adjust orbit animation duration
    candy.style.animationDuration = `${20 + Math.random() * 20}s`;
  } else {
    // Random position for floating candies
    candy.style.top = `${Math.random() * 80 + 10}%`;
    candy.style.left = `${Math.random() * 80 + 10}%`;
    // Adjust floating animation duration
    candy.style.animationDuration = `${10 + Math.random() * 10}s`;
    candy.style.animationDelay = `${Math.random() * 5}s`;
  }

  // Random emoji as candy
  const randomEmoji =
    candyEmojis[Math.floor(Math.random() * candyEmojis.length)];
  candy.textContent = randomEmoji;

  // Random size
  const size = 1 + Math.random() * 1.5;
  candy.style.fontSize = `${size}rem`;

  sweetGalaxy.appendChild(candy);
}

// Create star trails that appear on scroll
const starTrailsContainer = document.getElementById("star-trails-container");
const numberOfTrails = 30;

for (let i = 0; i < numberOfTrails; i++) {
  const trail = document.createElement("div");
  trail.classList.add("star-trail");

  // Random position
  trail.style.top = `${Math.random() * 90 + 5}%`;
  trail.style.left = `${Math.random() * 80}%`;

  // Random angle for the trail
  const angle = Math.random() * 60 - 30;
  trail.style.transform = `rotate(${angle}deg)`;

  // Random size
  trail.style.width = `${30 + Math.random() * 50}px`;
  trail.style.height = `${1 + Math.random() * 2}px`;

  starTrailsContainer.appendChild(trail);
}

// Animate star trails on scroll
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const sweetGalaxyPosition = document.getElementById("sweet-galaxy").offsetTop;
  const sweetGalaxyHeight =
    document.getElementById("sweet-galaxy").offsetHeight;

  // Check if we're scrolling through the sweet galaxy section
  if (
    scrollPosition >= sweetGalaxyPosition - 200 &&
    scrollPosition <= sweetGalaxyPosition + sweetGalaxyHeight
  ) {
    // Activate a random star trail
    const trails = document.querySelectorAll(".star-trail");
    const randomIndex = Math.floor(Math.random() * trails.length);

    if (!trails[randomIndex].classList.contains("visible")) {
      trails[randomIndex].classList.add("visible");

      // Remove the visible class after animation completes
      setTimeout(() => {
        trails[randomIndex].classList.remove("visible");
      }, 1500);
    }
  }
});

// Animate candy cards when they come into view
cards = document.querySelectorAll(".candy-card");

animateOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.8;

  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom && !card.classList.contains("card-animated")) {
      const delay = parseInt(card.dataset.delay) || 0;
      setTimeout(() => {
        card.classList.add("card-animated");
      }, delay);
    }
  });
};

window.addEventListener("scroll", animateOnScroll);

// For smooth scroll when navigating from previous section
document.addEventListener("DOMContentLoaded", () => {
  // Check if there's a hash in the URL
  if (window.location.hash === "#sweet-galaxy") {
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("sweet-galaxy").offsetTop,
        behavior: "smooth",
      });
    }, 100);
  }

  // Also initialize animation check on load
  animateOnScroll();
});
// Animate cards when they come into view
cards = document.querySelectorAll(".snack-card");

// Function to check if an element is in viewport
const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
};

// Function to reveal cards when scrolled into view
const revealCards = () => {
  cards.forEach((card) => {
    if (isInViewport(card) && !card.classList.contains("revealed")) {
      const delay = parseInt(card.dataset.delay) || 0;
      setTimeout(() => {
        card.classList.add("revealed");
      }, delay);
    }
  });
};

// Create sand particles for each card
cards.forEach((card, index) => {
  const particlesContainer = document.getElementById(`particles-${index + 1}`);
  const numberOfParticles = 20;

  for (let i = 0; i < numberOfParticles; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Random size
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Set random direction for animation
    const angle = Math.random() * Math.PI * 2;
    particle.style.setProperty("--x", Math.cos(angle));
    particle.style.setProperty("--y", Math.sin(angle));

    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 0.2}s`;

    particlesContainer.appendChild(particle);
  }
});

// Add additional snack elements dynamically
const saltDesert = document.getElementById("salty-desert");
const extraSnackEmojis = ["🥨", "🍘", "🧂", "🌽"];
const numberOfExtraSnacks = 6;

for (let i = 0; i < numberOfExtraSnacks; i++) {
  const snack = document.createElement("div");
  snack.classList.add("snack-element");

  // Random position
  snack.style.top = `${Math.random() * 80 + 10}%`;
  snack.style.left = `${Math.random() * 80 + 10}%`;

  // Random rotation
  snack.style.transform = `rotate(${Math.random() * 360}deg)`;

  // Random emoji
  const randomEmoji =
    extraSnackEmojis[Math.floor(Math.random() * extraSnackEmojis.length)];
  snack.textContent = randomEmoji;

  // Random size
  const size = 0.8 + Math.random() * 0.8;
  snack.style.fontSize = `${size}rem`;

  // Add to section with a slight delay
  setTimeout(() => {
    saltDesert.appendChild(snack);
  }, i * 300);
}

// Listen for scroll events
window.addEventListener("scroll", revealCards);

// Also check on page load
window.addEventListener("DOMContentLoaded", () => {
  revealCards();

  // Check if there's a hash in the URL
  if (window.location.hash === "#salty-desert") {
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("salty-desert").offsetTop,
        behavior: "smooth",
      });
    }, 100);
  }
});
