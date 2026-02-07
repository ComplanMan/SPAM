const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const image = document.getElementById("mainImage");
const text = document.getElementById("mainText");
const song = document.getElementById("song");
const countdownSection = document.getElementById("countdownSection");

// Move NO button + grow YES button
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 400 - 100;
  const y = Math.random() * 400 - 100;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  const currentScale = yesBtn.style.transform.match(/scale\(([^)]+)\)/);
  let scale = currentScale ? parseFloat(currentScale[1]) : 1;
  scale += 0.8;

  yesBtn.style.transform = `scale(${scale})`;
});

// YES button click
yesBtn.addEventListener("click", () => {
  image.style.opacity = 0;

  setTimeout(() => {
    image.src = "image2.jpg"; // Make sure this file exists!
    image.style.opacity = 1;
  }, 1000);

  text.style.display = "none";
  document.querySelector(".buttons").style.display = "none";

  song.play();
  countdownSection.classList.remove("hidden");

  startCountdown();
  startHearts(); // Added this so hearts actually start on click
  triggerConfetti(); // Added this so confetti starts on click
});

// Countdown timer
function startCountdown() {
  const targetDate = new Date("2026-02-14T00:00:00").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").innerHTML =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000); // Fixed syntax here
}

/* Heart particles */
const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");
// Fixed window variables below
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function startHearts() {
  const hearts = [];

  function Heart() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 10 + 10;
    this.speed = Math.random() * 2 + 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;

    this.draw = function() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    };

    this.update = function() {
      this.y -= this.speed;
      if (this.y < -10) {
        this.y = canvas.height + 10;
        this.x = Math.random() * canvas.width;
      }
    };
  }

  for (let i = 0; i < 50; i++) hearts.push(new Heart());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
      h.update();
      h.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

}