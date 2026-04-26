// 1. Inicializa Ícones
lucide.createIcons();

// 2. Motor de Partículas NEON
window.onload = function() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#B89650" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.9, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#B89650", "opacity": 0.5, "width": 1.5 },
            "move": { "enable": true, "speed": 3 }
        },
        "interactivity": {
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }
        }
    });
};

// 3. Troca de Views (Navegação)
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if(target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 4. Controle do Chat (Fix de Cliques)
const chatWindow = document.getElementById('chatWindow');
const chatBtn = document.getElementById('chatBtn');
const closeChat = document.getElementById('closeChat');

chatBtn.onclick = () => chatWindow.style.display = 'flex';
closeChat.onclick = () => chatWindow.style.display = 'none';

document.getElementById('sendChatBtn').onclick = function() {
    const input = document.getElementById('chatInput');
    const box = document.getElementById('chatMessages');
    if(!input.value.trim()) return;
    box.innerHTML += `<div style="align-self:flex-end; background:var(--accent); color:black; padding:8px; border-radius:4px;">${input.value}</div>`;
    input.value = "";
    setTimeout(() => {
        box.innerHTML += `<div style="align-self:flex-start; background:var(--secondary); padding:8px; border-radius:4px; border-left:3px solid var(--accent);">Protocolo de segurança iniciado.</div>`;
        box.scrollTop = box.scrollHeight;
    }, 600);
};

// 5. Envio de Relato
document.getElementById('btnEnviarRelato').onclick = function() {
    const iniciais = document.getElementById('iniciais').value;
    const texto = document.getElementById('relatoTexto').value;
    if(!texto) return alert("Por favor, descreva o ocorrido.");

    const feed = document.getElementById('feed-relatos');
    const div = document.createElement('div');
    div.className = 'card';
    div.style.marginTop = "15px";
    div.innerHTML = `<p>"${texto}"</p><small style="color:var(--accent)">Ref: ${iniciais || 'Anônimo'}</small>`;
    feed.prepend(div);

    document.getElementById('iniciais').value = "";
    document.getElementById('relatoTexto').value = "";
    alert("Relato enviado com sucesso!");
};

// 6. Lógica do Quiz
let step = 0;
const questions = [
    "Você recebe metas impossíveis de serem atingidas?",
    "É ignorado ou isolado pelos colegas propositalmente?",
    "Sua saúde física ou mental foi afetada pelo trabalho?"
];

function nextQuestion() {
    const qText = document.getElementById('question-text');
    if(step < questions.length) {
        qText.innerText = questions[step];
        step++;
    } else {
        document.getElementById('quiz').innerHTML = `<div class='card'><h2>Análise Concluída</h2><p>Recomendamos contatar o RH ou MPT.</p><button class='btn btn-main' onclick='location.reload()'>Reiniciar</button></div>`;
    }
}
