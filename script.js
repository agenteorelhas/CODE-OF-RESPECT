// Garante a criação de ícones
lucide.createIcons();

// FIX: Inicialização Segura das Partículas
window.onload = function() {
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#B89650" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4 },
                "size": { "value": 2 },
                "line_linked": { "enable": true, "distance": 150, "color": "#B89650", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1 }
            }
        });
    }
};

// Navegação entre abas (Views)
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if(target) target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Chat Widget
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
        box.innerHTML += `<div class="msg bot-msg">Relato recebido pelo protocolo de ética. Sua identidade está segura.</div>`;
        box.scrollTop = box.scrollHeight;
    }, 800);
}

// Relato e Quiz
function enviarRelato() {
    const iniciais = document.getElementById('iniciais').value.trim();
    const texto = document.getElementById('relatoTexto').value.trim();
    if(!iniciais || !texto) return alert("Preencha todos os campos.");
    
    const feed = document.getElementById('feed-relatos');
    const card = document.createElement('div');
    card.style.cssText = "background: rgba(184,150,80,0.1); padding: 15px; border-left: 3px solid var(--accent); margin-top:10px;";
    card.innerHTML = `<p>"${texto}"</p><small style="color:var(--accent)">ID: ${iniciais.toUpperCase()} • ${new Date().toLocaleDateString()}</small>`;
    feed.prepend(card);
    
    document.getElementById('iniciais').value = "";
    document.getElementById('relatoTexto').value = "";
    alert("Protocolo registrado.");
}

let step = 0;
const questions = ["Sente-se isolado pela equipe?", "Isso afeta sua saúde mental?", "Recebe ordens humilhantes?"];
function nextQuestion() {
    const qText = document.getElementById('question-text');
    if(step < questions.length) {
        qText.innerText = questions[step];
        step++;
    } else {
        document.getElementById('quiz').innerHTML = `<div class='card'><h2>Diagnóstico Concluído</h2><p>Recomendamos buscar apoio no canal oficial.</p></div>`;
    }
}
