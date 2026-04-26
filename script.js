// Inicializa ícones Lucide
lucide.createIcons();

// Configuração de Partículas Neon
window.onload = function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#B89650" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.8 },
                "size": { "value": 3 },
                "line_linked": { "enable": true, "distance": 150, "color": "#B89650", "opacity": 0.5, "width": 1.5 },
                "move": { "enable": true, "speed": 3 }
            }
        });
    }
};

// Navegação entre Views (Botões do Nav e Cards)
function showView(viewId) {
    console.log("Mudando para view:", viewId); // Para log de debug
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
        v.style.display = 'none';
    });
    
    const target = document.getElementById(viewId);
    if(target) {
        target.classList.add('active');
        target.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Widget de Chat
function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function enviarChat() {
    const box = document.getElementById('chatMessages');
    const input = document.getElementById('chatInput');
    if(!input.value.trim()) return;
    
    box.innerHTML += `<p style="text-align:right; color:var(--accent); margin-bottom:10px;">${input.value}</p>`;
    const userText = input.value;
    input.value = "";
    
    setTimeout(() => {
        box.innerHTML += `<p style="color:white; background:rgba(255,255,255,0.05); padding:8px; border-radius:4px; margin-bottom:10px;">Protocolo iniciado. Como podemos ajudar?</p>`;
        box.scrollTop = box.scrollHeight;
    }, 600);
}

// Relato de Denúncia
function enviarRelato() {
    const texto = document.getElementById('relatoTexto').value.trim();
    if(!texto) {
        alert("Por favor, descreva o fato antes de enviar.");
        return;
    }
    
    const feed = document.getElementById('feed-relatos');
    const item = document.createElement('div');
    item.className = 'card';
    item.style.marginTop = '15px';
    item.style.borderLeft = '4px solid var(--accent)';
    item.innerHTML = `<p style="font-style:italic">"${texto}"</p>`;
    feed.prepend(item);
    
    document.getElementById('relatoTexto').value = "";
    alert("Relato registrado no sistema de forma anônima.");
}

// Quiz de Auto Avaliação
let quizStep = 0;
const questions = [
    "Recebe críticas humilhantes à frente de outros colegas?",
    "Suas metas são alteradas sem aviso ou lógica?",
    "Sente-se isolado propositalmente pela gestão?"
];

function nextQuestion() {
    const textEl = document.getElementById('question-text');
    if(quizStep < questions.length) {
        textEl.innerText = questions[quizStep];
        quizStep++;
    } else {
        document.getElementById('quiz').innerHTML = `
            <div class="card" style="text-align:center">
                <h2>Avaliação Finalizada</h2>
                <p style="margin:20px 0">Os sinais indicam uma possível situação de assédio. Recomendamos abrir um relato sigiloso.</p>
                <button class="btn btn-main" onclick="location.reload()">Reiniciar</button>
            </div>`;
    }
}
