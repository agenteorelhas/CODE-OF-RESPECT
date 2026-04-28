document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    initParticles();
});

// 1. CHATBOT TOGGLE
function toggleChat() {
    const chat = document.getElementById('chatWindow');
    if (!chat) return;
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

// 2. INTERAÇÃO COM A IA (SERVER-READY)
async function enviarChat() {
    const input = document.getElementById('chatInput');
    const userText = input.value?.trim();
    if (!userText) return;

    appendMessage(userText, 'user-msg');
    input.value = '';

    const loadingId = 'loading-' + Date.now();
    appendMessage('Analisando ética do relato...', 'bot-msg', loadingId);

    try {
        // COLOQUE SEU LINK DO RENDER AQUI
        const API_URL = "https://SUA-URL-AQUI.onrender.com/chat"; 
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });
        const data = await response.json();
        document.getElementById(loadingId).innerText = data.response || "IA offline.";
    } catch (e) {
        document.getElementById(loadingId).innerText = "Conexão interrompida. Tente novamente.";
    }
}

// 3. QUIZ FUNCIONAL
const questions = [
    "Você é criticado(a) de forma humilhante publicamente?",
    "Recebe tarefas impossíveis de cumprir com prazos irreais?",
    "Sente-se isolado(a) propositalmente pela equipe ou chefia?",
    "Sua saúde mental está sendo prejudicada pelo trabalho?"
];
let currentQ = 0;
let score = 0;

function startQuiz() {
    currentQ = 0; score = 0;
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    nextQuestion();
}

function nextQuestion() {
    if (currentQ < questions.length) {
        document.getElementById('quiz-question').innerText = questions[currentQ];
        const opt = document.getElementById('quiz-options');
        opt.innerHTML = `
            <button class="btn btn-main" onclick="handleQuiz(true)">Sim</button>
            <button class="btn btn-accent" onclick="handleQuiz(false)">Não</button>
        `;
    } else {
        showQuizResult();
    }
}

function handleQuiz(isYes) {
    if (isYes) score++;
    currentQ++;
    nextQuestion();
}

function showQuizResult() {
    document.getElementById('quiz-content').style.display = 'none';
    const res = document.getElementById('quiz-result');
    const txt = document.getElementById('result-text');
    res.style.display = 'block';
    txt.innerText = score >= 3 ? "ALERTA: Fortes indícios de assédio moral." : score >= 1 ? "ATENÇÃO: Comportamentos abusivos detectados." : "Ambiente aparentemente saudável.";
}

function resetQuiz() { startQuiz(); }

// 4. NAVEGAÇÃO E AUXILIARES
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');
    if (viewId === 'quiz') startQuiz();
}

function appendMessage(text, className, id = '') {
    const messages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${className}`;
    if(id) msgDiv.id = id;
    msgDiv.innerText = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

function handleKeyPress(e) { if (e.key === 'Enter') enviarChat(); }

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80 },
                "color": { "value": "#FFD700" },
                "shape": { "type": "circle" },
                "line_linked": { "enable": true, "color": "#FFD700", "opacity": 0.4 },
                "move": { "enable": true, "speed": 2 }
            }
        });
    }
}
