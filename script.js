document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    initParticles();
    renderizarDenuncias();
});

// Partículas de Alta Visibilidade
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 110, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#FFD700" }, 
                "opacity": { "value": 0.8, "random": true },
                "size": { "value": 3 },
                "line_linked": { "enable": true, "color": "#FFD700", "opacity": 0.5, "width": 1.5 },
                "move": { "enable": true, "speed": 1.5 }
            },
            "interactivity": { "events": { "onhover": { "enable": true, "mode": "grab" } } }
        });
    }
}

// Navegação entre abas
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');
    if (viewId === 'quiz') startQuiz();
}

// Controle do Chat
function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function handleKeyPress(e) { if (e.key === 'Enter') enviarChat(); }

// --- LIGAÇÃO COM SERVER / IA (CORRIGIDA) ---
async function enviarChat() {
    const input = document.getElementById('chatInput');
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage(userText, 'user-msg');
    input.value = '';

    const loadingId = 'loading-' + Date.now();
    appendMessage('Processando...', 'bot-msg', loadingId);

    try {
        const RENDER_API_URL = "https://code-of-respect.onrender.com/chat"; 
        const response = await fetch(RENDER_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });
        
        const data = await response.json();
        
        if (data.text) {
            document.getElementById(loadingId).innerText = data.text;
        } else {
            document.getElementById(loadingId).innerText = "A IA não retornou um texto.";
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        document.getElementById(loadingId).innerText = "Erro na conexão segura.";
    }
} // <--- ESTA CHAVE ESTAVA FALTANDO PARA FECHAR A FUNÇÃO enviarChat

function appendMessage(text, className, id = '') {
    const messages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${className}`;
    if (id) msgDiv.id = id;
    msgDiv.innerText = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}
// Funções de Denúncia (Registro em Cards)
function salvarDenuncia() {
    const texto = document.getElementById('relatoTexto').value.trim();
    if (!texto) return alert("Escreva seu relato.");
    const denuncias = JSON.parse(localStorage.getItem('denuncias') || "[]");
    denuncias.unshift({ texto: texto, data: new Date().toLocaleDateString('pt-BR') });
    localStorage.setItem('denuncias', JSON.stringify(denuncias));
    document.getElementById('relatoTexto').value = "";
    renderizarDenuncias();
}

function renderizarDenuncias() {
    const container = document.getElementById('listaDenuncias');
    if (!container) return;
    const denuncias = JSON.parse(localStorage.getItem('denuncias') || "[]");
    container.innerHTML = denuncias.map(d => `
        <div class="card denuncia-card card-glow">
            <p>"${d.texto}"</p>
            <small style="color:var(--accent-muted); font-size:10px; margin-top:10px; display:block;">REGISTRO: ${d.data}</small>
        </div>`).join('');
}

// Lógica do Quiz (MANTIDA)
const questions = ["Críticas humilhantes?", "Tarefas boicotadas?", "Agressões verbais?", "Danos à saúde mental?"];
let currentQ = 0, score = 0;
function startQuiz() { currentQ = 0; score = 0; document.getElementById('quiz-result').style.display = 'none'; document.getElementById('quiz-content').style.display = 'block'; nextQuestion(); }
function nextQuestion() {
    if (currentQ < questions.length) {
        document.getElementById('quiz-question').innerText = questions[currentQ];
        document.getElementById('quiz-options').innerHTML = `<button class="btn btn-main" onclick="handleQuiz(true)">Sim</button><button class="btn btn-accent" onclick="handleQuiz(false)">Não</button>`;
    } else {
        document.getElementById('quiz-content').style.display = 'none';
        document.getElementById('quiz-result').style.display = 'block';
        document.getElementById('result-text').innerText = score >= 3 ? "Alerta de assédio." : "Continue monitorando.";
    }
}
function handleQuiz(isYes) { if (isYes) score++; currentQ++; nextQuestion(); }
function resetQuiz() { startQuiz(); }
