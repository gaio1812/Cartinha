document.body.setAttribute("data-tema", "claro");

let escala = 1.0;

function diminuirBotao() {
  const botao = document.getElementById("naoBtn");
  escala -= 0.2;

  if (escala <= 0) {
    botao.classList.add("balancando");

    setTimeout(() => {
      botao.style.opacity = "0";
      setTimeout(() => {
        botao.style.display = "none";
      }, 300);
    }, 500); // espera o balanço antes de sumir
  } else {
    botao.style.transform = `scale(${escala})`;
  }
}



function aceitarAmor() {
  alert("Siiiiim! Já somos o casal mais lindo do mundo! 💕");
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}

const texto = "Desde que te conheci, tudo ficou mais bonito...\nE agora, com o coração batendo forte, eu só quero te perguntar:";
const p = document.getElementById("typing");
let i = 0;
function digitar() {
  if (i < texto.length) {
    p.innerHTML += texto.charAt(i) === "\n" ? "<br>" : texto.charAt(i);
    i++;
    setTimeout(digitar, 50);
  }
}
digitar();

function alternarTema() {
  const atual = document.body.getAttribute("data-tema");
  document.body.setAttribute("data-tema", atual === "escuro" ? "claro" : "escuro");
}

// Corações vetoriais
const canvas = document.getElementById("chuvaCoracoesCanvas");
const ctx = canvas.getContext("2d");

function redimensionarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", redimensionarCanvas);
redimensionarCanvas();

const coracoes = [];

function criarCoracao() {
  return {
    x: Math.random() * canvas.width,
    y: -20,
    size: Math.random() * 1.2 + 0.8, // aumentei o mínimo e o máximo
    speed: Math.random() * 1.5 + 0.5,
    drift: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.5 + 0.4
  };
}


function desenharCoracao(ctx, x, y, scale, color, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
  ctx.bezierCurveTo(-5, 3, 0, 5, 0, 7);
  ctx.bezierCurveTo(0, 5, 5, 3, 5, 0);
  ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
  ctx.closePath();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}
// Balões fixos que flutuam usando a mesma forma da chuva
const baloesFixos = [
  { x: 100, y: 150, size: 1.2, color: "#ff4d88", delay: 0 },
  { x: 250, y: 250, size: 1.1, color: "#ff6699", delay: 0.3 },
  { x: 400, y: 180, size: 1.3, color: "#ff3366", delay: 0.6 },
  { x: 600, y: 100, size: 1.4, color: "#ff5e8b", delay: 0.9 },
  { x: canvas.width - 100, y: canvas.height - 150, size: 1.0, color: "#ff678a", delay: 1.2 },
  { x: canvas.width / 2, y: 80, size: 1.2, color: "#ff4d88", delay: 1.5 }
];

function animarBaloesFixos(tempo) {
  baloesFixos.forEach(b => {
    const yOffset = Math.sin((tempo / 1000 + b.delay) * 2) * 10;
    desenharCoracao(ctx, b.x, b.y + yOffset, b.size, b.color, 0.8);
  });
}


function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.3) coracoes.push(criarCoracao());
  for (let i = 0; i < coracoes.length; i++) {
    const c = coracoes[i];
    c.y += c.speed;
    c.x += c.drift;
    desenharCoracao(ctx, c.x, c.y, c.size, "#ff3366", c.opacity);
    if (c.y > canvas.height) {
      coracoes.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animar);
}

animar();
animarBaloesFixos(performance.now());
function abrirCartinha() {
  confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
  setTimeout(() => {
    window.location.href = "cartinha.html";
  }, 800); // confetes antes da troca
}

