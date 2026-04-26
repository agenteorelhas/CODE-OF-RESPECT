lucide.createIcons();

// Partículas Neon
window.onload = function() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 100 },
            "color": { "value": "#B89650" },
            "opacity": { "value": 0.8 },
            "size": { "value": 3 },
            "line_linked": { "enable": true, "distance": 150, "color": "#B89650", "opacity": 0.5, "width": 1.5 },
            "move": { "enable": true, "speed": 3 }
        }
    });
};

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function enviarChat() {
    const box = document.getElementById('chatMessages');
    const input = document.getElementById('chatInput');
    if(!input.value) return;
    box.innerHTML += `<p style="text-align:right; color:var(--accent)">${input.value}</p>`;
    input.value = "";
    setTimeout(() => { box.innerHTML += `<p style="color:white">Segurança ativa. Como podemos ajudar?</p>`; }, 600);
}

function enviarRelato() {
    const texto = document.getElementById('relatoTexto').value;
    if(!texto) return alert("Descreva o fato.");
    const feed = document.getElementById('feed-relatos');
    const item = document.createElement('div');
    item.className = 'card';
    item.style.marginTop = '10px';
    item.innerHTML = `<p>"${texto}"</p>`;
    feed.prepend(item);
    document.getElementById('relatoTexto').value = "";
    alert("Relato registrado.");
}

let step = 0;
function nextQuestion() {
    const q = ["Você é isolado na equipe?", "Recebe ordens humilhantes?", "Isso afetou sua saúde?"];
    if(step < q.length) {
        document.getElementById('question-text').innerText = q[step];
        step++;
    } else {
        document.getElementById('quiz').innerHTML = "<div class='card'><h2>Concluído. Busque ajuda.</h2></div>";
    }
}
