lucide.createIcons();

// Motor de Partículas Neon Intensificado
window.onload = function() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#B89650" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.8, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 140, "color": "#B89650", "opacity": 0.6, "width": 1.5 },
            "move": { "enable": true, "speed": 2.5 }
        },
        "interactivity": {
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }
        }
    });
};

// Navegação Infalível
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if(target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Controle do Chat
function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function enviarChat() {
    const input = document.getElementById('chatInput');
    const box = document.getElementById('chatMessages');
    if(!input.value.trim()) return;
    box.innerHTML += `<div style="align-self:flex-end; background:var(--accent); color:black; padding:8px; border-radius:4px; max-width:80%;">${input.value}</div>`;
    input.value = "";
    setTimeout(() => {
        box.innerHTML += `<div style="align-self:flex-start; background:var(--secondary); padding:8px; border-radius:4px; border-left:3px solid var(--accent); max-width:80%;">Protocolo de segurança ativo. Como posso ajudar?</div>`;
        box.scrollTop = box.scrollHeight;
    }, 600);
}

// Lógica de Relatos
function enviarRelato() {
    const texto = document.getElementById('relatoTexto').value.trim();
    const iniciais = document.getElementById('iniciais').value.trim();
    if(!texto) return alert("Por favor, descreva o relato.");

    const feed = document.getElementById('feed-relatos');
    const relato = document.createElement('div');
    relato.className = 'card';
    relato.style.marginTop = '15px';
    relato.innerHTML = `<p>"${texto}"</p><small style="color:var(--accent); margin-top:10px; display:block;">Iniciais: ${iniciais || 'Anónimo'}</small>`;
    feed.prepend(relato);

    document.getElementById('relatoTexto').value = "";
    document.getElementById('iniciais').value = "";
    alert("Relato registado com sucesso.");
}

// Lógica de Quiz
let step = 0;
const questions = [
    "Sente que as suas opiniões são ignoradas sistematicamente?",
    "Recebe críticas humilhantes à frente de outros colegas?",
    "A sua carga de trabalho é alterada sem explicação lógica?"
];

function nextQuestion() {
    const qText = document.getElementById('question-text');
    if(step < questions.length) {
        qText.innerText = questions[step];
        step++;
    } else {
        document.getElementById('quiz').innerHTML = `
            <div class='card' style='text-align:center'>
                <h2>Análise Finalizada</h2>
                <p style='margin:20px 0'>Os indicadores sugerem atenção. Recomendamos utilizar o canal de denúncia sigiloso.</p>
                <button class='btn btn-main' onclick='location.reload()'>Reiniciar Quiz</button>
            </div>`;
    }
}
