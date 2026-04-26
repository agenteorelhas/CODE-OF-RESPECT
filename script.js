lucide.createIcons();

// Configuração das Partículas
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 50 },
        "color": { "value": "#B89650" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.2 },
        "size": { "value": 2 },
        "line_linked": { "enable": true, "distance": 150, "color": "#B89650", "opacity": 0.1, "width": 1 },
        "move": { "enable": true, "speed": 1 }
    }
});

// Sanitização de Input (Segurança contra XSS)
function sanitize(text) {
    const temp = document.createElement('div');
    temp.textContent = text;
    return temp.innerHTML;
}

const quotes = [
    { text: '"O assédio moral no trabalho é a exposição dos trabalhadores a situações humilhantes."', author: "— Margarida Barreto" },
    { text: '"Respeito não tem hierarquia. Ele é a base de qualquer cultura saudável."', author: "— Ética Corporativa" },
    { text: '"O silêncio é cúmplice do abuso. Denunciar é um ato de coragem e proteção."', author: "— Canal de Ética" },
    { text: '"Um ambiente de trabalho ético é aquele onde a dignidade humana vem antes do lucro."', author: "— Código de Conduta" }
];

let currentQuote = 0;
function initQuoteCarousel() {
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    if (!textEl) return;

    setInterval(() => {
        currentQuote = (currentQuote + 1) % quotes.length;
        textEl.style.opacity = 0;
        setTimeout(() => {
            textEl.innerText = quotes[currentQuote].text;
            authorEl.innerText = quotes[currentQuote].author;
            textEl.style.opacity = 1;
        }, 500);
    }, 5000);
}
initQuoteCarousel();

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleChat() {
    const win = document.getElementById('chatWindow');
    win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
}

function enviarChat() {
    const input = document.getElementById('chatInput');
    const box = document.getElementById('chatMessages');
    if (!input.value.trim()) return;

    box.innerHTML += `<div class="msg user-msg">${sanitize(input.value)}</div>`;
    const val = input.value;
    input.value = "";

    setTimeout(() => {
        box.innerHTML += `<div class="msg bot-msg">Protocolo de segurança ativo. A sua dúvida foi enviada aos nossos analistas.</div>`;
        box.scrollTop = box.scrollHeight;
    }, 800);
}

function enviarRelato() {
    const iniciais = document.getElementById('iniciais').value.trim();
    const texto = document.getElementById('relatoTexto').value.trim();
    const feed = document.getElementById('feed-relatos');

    if (!iniciais || !texto) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const relatoCard = document.createElement('div');
    relatoCard.className = 'card';
    relatoCard.style.marginTop = '15px';
    relatoCard.innerHTML = `
        <p>"${sanitize(texto)}"</p>
        <small style="color:var(--accent); font-weight:bold; display:block; margin-top:10px;">
            — Alvo/Iniciais: ${sanitize(iniciais).toUpperCase()} • Registado em: ${new Date().toLocaleDateString('pt-BR')}
        </small>
    `;

    feed.prepend(relatoCard);
    document.getElementById('iniciais').value = "";
    document.getElementById('relatoTexto').value = "";
    alert("Relato registado no sistema local com sucesso.");
}

let step = 0;
const questions = [
    "Sente-se isolado propositalmente pela sua equipa?",
    "Recebe ordens contraditórias ou confusas para o prejudicar?",
    "Isso tem afetado a sua saúde física ou mental?"
];

function nextQuestion() {
    const qText = document.getElementById('question-text');
    if (step < questions.length) {
        qText.innerText = questions[step];
        step++;
    } else {
        document.getElementById('quiz').innerHTML = `
            <div class='card' style='text-align:center'>
                <h2 style='color:var(--accent)'>Análise Concluída</h2>
                <p style='margin:20px 0'>Os indicadores sugerem uma situação atípica. Recomendamos guardar provas e contactar o MPT.</p>
                <button class='btn btn-main' onclick='location.reload()'>Reiniciar Teste</button>
            </div>`;
    }
}
