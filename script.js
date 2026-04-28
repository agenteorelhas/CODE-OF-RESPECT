document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    initParticles();
    renderizarDenuncias();
});

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 110, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#FFD700" }, 
                "opacity": { "value": 0.8, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "color": "#FFD700", "opacity": 0.5, "width": 1.5 },
                "move": { "enable": true, "speed": 1.5, "random": true }
            },
            "interactivity": { "events": { "onhover": { "enable": true, "mode": "grab" } } },
            "retina_detect": true
        });
    }
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');
    if (viewId === 'quiz') startQuiz();
}

function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function salvarDenuncia() {
    const texto = document.getElementById('relatoTexto').value.trim();
    if (!texto) return alert("Descreva o relato antes de enviar.");
    const denuncias = JSON.parse(localStorage.getItem('denuncias') || "[]");
    denuncias.unshift({ texto: texto, data: new Date().toLocaleDateString('pt-BR') });
    localStorage.setItem('denuncias', JSON.stringify(denuncias));
    document.getElementById('relatoTexto').value = "";
    renderizarDenuncias();
    alert("Relato registrado sigilosamente.");
}

function renderizarDenuncias() {
    const container = document.getElementById('listaDenuncias');
    if (!container) return;
    const denuncias = JSON.parse(localStorage.getItem('denuncias') || "[]");
    container.innerHTML = denuncias.map(d => `
        <div class="card denuncia-card card-glow">
            <p>"${d.texto}"</p>
            <small>ID ANÔNIMO • REGISTRADO EM ${d.data}</small>
        </div>`).join('');
}

// LÓGICA DO QUIZ
const questions = ["Críticas humilhantes frequentes?", "Tarefas boicotadas ou isolamento?", "Agressões verbais ou ameaças?", "Danos à saúde mental percebidos?"];
let currentQ = 0, score = 0;

function startQuiz() { 
    currentQ = 0; score = 0; 
    document.getElementById('quiz-result').style.display = 'none'; 
    document.getElementById('quiz-content').style.display = 'block'; 
    nextQuestion(); 
}

function nextQuestion() {
    if (currentQ < questions.length) {
        document.getElementById('quiz-question').innerText = questions[currentQ];
        document.getElementById('quiz-options').innerHTML = `
            <button class="btn btn-main" onclick="handleQuiz(true)">Sim</button>
            <button class="btn btn-accent" onclick="handleQuiz(false)">Não</button>`;
    } else { showQuizResult(); }
}
function handleQuiz(isYes) { if (isYes) score++; currentQ++; nextQuestion(); }
function showQuizResult() {
    document.getElementById('quiz-content').style.display = 'none';
    const res = document.getElementById('quiz-result');
    res.style.display = 'block';
    document.getElementById('result-text').innerText = score >= 3 ? "ALERTA: Sinais claros de assédio moral." : "Continue monitorando a situação.";
}
function resetQuiz() { startQuiz(); }
function handleKeyPress(e) { if (e.key === 'Enter') enviarChat(); }
