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

function handleKeyPress(e) { 
    if (e.key === 'Enter') enviarChat(); 
}

// --- LIGAÇÃO COM SERVER / IA (CORRIGIDA E BLINDADA) ---
async function enviarChat() {
    const input = document.getElementById('chatInput');
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage(userText, 'user-msg');
    input.value = '';

    const loadingId = 'loading-' + Date.now();
    appendMessage('Processando...', 'bot-msg', loadingId);

    try {
        const response = await fetch("https://code-of-respect.onrender.com/chat", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });
        
        const data = await response.json();
        const loadingElement = document.getElementById(loadingId);

        if (!response.ok) {
            throw new Error(data.text || "Erro no servidor");
        }
        
        if (data.text) {
            loadingElement.innerText = data.text;
        } else {
            loadingElement.innerText = "A IA não retornou um texto.";
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            loadingElement.innerText = "Erro: " + error.message;
        }
    }
} 

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

// --- MODIFICAÇÃO EXCLUSIVA: LÓGICA DO QUIZ ATUALIZADA ---
const questions = [
    "1. Você já recebeu críticas sobre o seu trabalho de forma gritante, agressiva ou na frente de outros colegas?",
    "2. Você sente que recebe tarefas impossíveis de cumprir ou que é deixado(a) 'sem nada para fazer' propositalmente?",
    "3. Algum superior ou colega já fez piadas recorrentes sobre suas características pessoais (físico, orientação, religião)?",
    "4. Você é excluído(a) de reuniões ou comunicações essenciais para o seu dia a dia?",
    "5. Alguém já insistiu em convites para sair, mesmo depois de você ter dito 'não' ou ignorado?",
    "6. Você já recebeu fotos, vídeos ou mensagens de cunho sexual sem consentimento?",
    "7. Alguém já tocou em você (costas, mãos, cabelo) de forma a deixar você desconfortável ou 'travado(a)'?",
    "8. Já te ofereceram benefícios (promoção, notas, presentes) em troca de algum 'favor' ou contato físico?",
    "9. Você sente medo, ansiedade ou vontade de chorar só de pensar em encontrar essa pessoa específica?",
    "10. Você já mudou sua rotina, caminho ou roupas para evitar comentários ou olhares de uma pessoa específica?"
];

let currentQ = 0;
let scoreFrequenciaAlta = 0;
let scoreOcorrenciaUnica = 0;

function startQuiz() { 
    currentQ = 0; 
    scoreFrequenciaAlta = 0;
    scoreOcorrenciaUnica = 0;
    document.getElementById('quiz-result').style.display = 'none'; 
    document.getElementById('quiz-content').style.display = 'block'; 
    nextQuestion(); 
}

function nextQuestion() {
    if (currentQ < questions.length) {
        document.getElementById('quiz-question').innerText = questions[currentQ];
        document.getElementById('quiz-options').innerHTML = `
            <button class="btn btn-main" onclick="handleQuiz(2)">Acontece sempre</button>
            <button class="btn btn-accent" onclick="handleQuiz(1)">Aconteceu uma vez</button>
            <button class="btn btn-accent" onclick="handleQuiz(0)">Nunca</button>
        `;
    } else {
        document.getElementById('quiz-content').style.display = 'none';
        document.getElementById('quiz-result').style.display = 'block';
        
        let resultText = "";
        if (scoreFrequenciaAlta > 0) {
            resultText = "Isso que você descreveu não é normal e a culpa não é sua. Os sinais indicam uma situação crítica de abuso. Procure canais oficiais como o Disque 180 ou 100.";
        } else if (scoreOcorrenciaUnica >= 2) {
            resultText = "Você relatou episódios que podem configurar assédio. O ambiente de trabalho deve ser pautado pelo respeito. Monitore essas situações e busque apoio.";
        } else {
            resultText = "Continue monitorando. Caso sinta que sua integridade ou saúde mental está em risco, não hesite em procurar ajuda.";
        }
        document.getElementById('result-text').innerText = resultText;
    }
}

function handleQuiz(valor) { 
    if (valor === 2) scoreFrequenciaAlta++;
    if (valor === 1) scoreOcorrenciaUnica++;
    currentQ++; 
    nextQuestion(); 
}

function resetQuiz() { 
    startQuiz(); 
}
