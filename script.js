lucide.createIcons();

particlesJS("particles-js", {
    "particles": {
        "number": { "value": 45 },
        "color": { "value": "#B89650" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.25 },
        "size": { "value": 2 },
        "line_linked": { "enable": true, "distance": 150, "color": "#B89650", "opacity": 0.15, "width": 1 },
        "move": { "enable": true, "speed": 0.8 }
    }
});

const quotes = [
    { text: '"O assédio moral no trabalho é a exposição dos trabalhadores a situações humilhantes."', author: "— Margarida Barreto" },
    { text: '"Respeito não tem hierarquia. Ele é a base de qualquer cultura saudável."', author: "— Ética Corporativa" },
    { text: '"O silêncio é cúmplice do abuso. Denunciar é um ato de coragem e proteção."', author: "— Canal de Ética" },
    { text: '"Um ambiente de trabalho ético é aquele onde a dignidade humana vem antes do lucro."', author: "— Código de Conduta" }
];

let currentQuote = 0;
function initQuoteCarousel() {
    const container = document.getElementById('quote-container');
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    setInterval(() => {
        if(container) {
            container.style.opacity = 0;
            setTimeout(() => {
                currentQuote = (currentQuote + 1) % quotes.length;
                textEl.innerText = quotes[currentQuote].text;
                authorEl.innerText = quotes[currentQuote].author;
                container.style.opacity = 1;
            }, 600);
        }
    }, 6000);
}
initQuoteCarousel();

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if(target) target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleChat() {
    const win = document.getElementById('chatWindow');
    win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
}

function enviarChat() {
    const input = document.getElementById('chatInput');
    const box = document.getElementById('chatMessages');
    if(!input.value.trim()) return;
    box.innerHTML += `<div class="msg user-msg">${input.value}</div>`;
    input.value = "";
    setTimeout(() => {
        box.innerHTML += `<div class="msg bot-msg">Sua mensagem foi recebida com total segurança.</div>`;
        box.scrollTop = box.scrollHeight;
    }, 800);
}

function enviarRelato() {
    const iniciais = document.getElementById('iniciais').value.trim();
    const texto = document.getElementById('relatoTexto').value.trim();
    const feed = document.getElementById('feed-relatos');
    if(!iniciais || !texto) { alert("Preencha todos os campos."); return; }
    const card = document.createElement('div');
    card.className = 'relato-card';
    card.innerHTML = `<p>"${texto}"</p><small style="color:var(--accent); font-weight:bold; display:block; margin-top:10px;">— Iniciais: ${iniciais.toUpperCase()} • Postado em: ${new Date().toLocaleDateString('pt-BR')}</small>`;
    feed.prepend(card);
    document.getElementById('iniciais').value = "";
    document.getElementById('relatoTexto').value = "";
    alert("Protocolo registrado.");
}

let step = 0;
const questions = ["Você recebe metas impossíveis de atingir?", "Sente-se isolado propositalmente pela equipe?", "Isso tem afetado sua saúde física ou mental?"];
function nextQuestion() {
    if(step < questions.length) {
        document.getElementById('question-text').innerText = questions[step];
        step++;
    } else {
        document.getElementById('quiz').innerHTML = `<div class='card'><h2>Diagnóstico Concluído</h2><p style='margin: 20px 0;'>Recomendamos buscar apoio oficial.</p><button class='btn btn-main' onclick='location.reload()'>Reiniciar</button></div>`;
    }
}
