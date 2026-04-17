// Inicialização de Ícones
if (window.lucide) {
    lucide.createIcons();
}

// Configuração Partículas
if (window.particlesJS) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80 },
            "color": { "value": "#27B1A1" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": { "value": 3 },
            "line_linked": { "enable": true, "distance": 150, "color": "#27B1A1", "opacity": 0.3, "width": 1 },
            "move": { "enable": true, "speed": 1.5 }
        }
    });
}

// Frases Rotativas
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
    const container = document.getElementById('quote-container');

    if (textEl && authorEl && container) {
        setInterval(() => {
            container.style.opacity = 0;
            setTimeout(() => {
                currentQuote = (currentQuote + 1) % quotes.length;
                textEl.innerText = quotes[currentQuote].text;
                authorEl.innerText = quotes[currentQuote].author;
                container.style.opacity = 1;
            }, 600);
        }, 6000);
    }
}
initQuoteCarousel();

// Navegação entre abas
function showView(viewId) {
    const views = document.querySelectorAll('.view');
    views.forEach(v => v.classList.remove('active'));
    
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Chat Interativo
function toggleChat() {
    const win = document.getElementById('chatWindow');
    if (win) {
        const isFlex = win.style.display === 'flex';
        win.style.display = isFlex ? 'none' : 'flex';
    }
}

function enviarChat() {
    const input = document.getElementById('chatInput');
    const box = document.getElementById('chatMessages');
    
    if (!input || !box || !input.value.trim()) return;

    box.innerHTML += `<div class="msg user-msg">${input.value}</div>`;
    const userMsg = input.value;
    input.value = "";
    
    setTimeout(() => {
        box.innerHTML += `<div class="msg bot-msg">Sua mensagem foi recebida com sigilo. Como posso ajudar mais?</div>`;
        box.scrollTop = box.scrollHeight;
    }, 800);
}

// Sistema de Relatos
function enviarRelato() {
    const iniciaisInput = document.getElementById('iniciais');
    const textoInput = document.getElementById('relatoTexto');
    const feed = document.getElementById('feed-relatos');

    if (!iniciaisInput || !textoInput || !feed) return;

    const iniciais = iniciaisInput.value.trim();
    const texto = textoInput.value.trim();

    if (!iniciais || !texto) {
        alert("Por favor, preencha todos os campos do relato.");
        return;
    }

    const card = document.createElement('div');
    card.className = 'relato-card';
    card.innerHTML = `
        <p>"${texto}"</p>
        <small class="relato-meta">— Iniciais: ${iniciais.toUpperCase()} • Postado em: ${new Date().toLocaleDateString('pt-BR')}</small>
    `;
    
    feed.prepend(card);
    iniciaisInput.value = "";
    textoInput.value = "";
    alert("Relato enviado com sucesso. Seu anonimato está garantido.");
}

// Lógica do Quiz
let step = 0;
const questions = [
    "Você recebe metas impossíveis de atingir?",
    "Sente-se isolado propositalmente pela equipe?",
    "Isso tem afetado sua saúde física ou mental?"
];

function nextQuestion() {
    const qText = document.getElementById('question-text');
    const quizSection = document.getElementById('quiz');

    if (!qText || !quizSection) return;

    if (step < questions.length) {
        qText.innerText = questions[step];
        step++;
    } else {
        quizSection.innerHTML = `
            <div class='card quiz-card' style='cursor:default'>
                <h2>Concluído</h2>
                <p style='margin: 20px 0;'>Com base nas suas respostas, você pode estar em uma situação de vulnerabilidade. Considere buscar orientação nos nossos canais sigilosos.</p>
                <button class='btn btn-accent' onclick='location.reload()'>Reiniciar Quiz</button>
            </div>
        `;
    }
}
