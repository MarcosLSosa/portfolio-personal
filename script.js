// ── PARTICLES ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedY = Math.random() * 0.4 + 0.1;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.4 + 0.05;
    this.color = Math.random() > 0.5 ? '0,180,255' : '124,58,237';
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > H) { this.reset(); this.y = -10; }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── TYPEWRITER ──
const names = [
  'Marcos Sosa',
  'Infrastructure & DevOps',
  'Proxmox • Docker • Ansible'
];
let ni = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-name');

function type() {
  const current = names[ni];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --ci);
    if (ci === 0) { deleting = false; ni = (ni + 1) % names.length; }
  }
  setTimeout(type, deleting ? 60 : 110);
}
type();

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── NAV ACTIVE ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// ── SEND BUTTON ──
function handleSend(btn) {
  btn.textContent = '✓ Mensaje enviado';
  btn.style.background = 'linear-gradient(135deg, #00ff88, #00b4ff)';
  setTimeout(() => {
    btn.textContent = 'Enviar Mensaje →';
    btn.style.background = '';
  }, 3000);
}
