// Garante a criação de ícones
lucide.createIcons();

// Configuração Segura e VISÍVEL das Partículas (Visual Neon)
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                // Aumentei o número de partículas para serem mais visíveis
                "number": { "value": 110, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#B89650" }, // Cor dourada selecionada (--accent)
                "shape": { "type": "circle" },
                // Aumentei a opacidade base
                "opacity": { 
                    "value": 0.8, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.4, "sync": false }
                },
                // Aumentei o tamanho para dar mais impacto visual
                "size": { 
                    "value": 3.5, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 4, "size_min": 0.3, "sync": false }
                },
                // Aumentei a opacidade e a espessura das linhas para ficarem visíveis
                "line_linked": { 
                    "enable": true, 
                    "distance": 140, 
                    "color": "#B89650", 
                    "opacity": 0.4, 
                    "width": 1.2 
                },
                // Aumentei um pouco a velocidade para dar mais dinamismo
                "move": { 
                    "enable": true, 
                    "speed": 2.5, 
                    "direction": "none", 
                    "random": true, 
                    "straight": false, 
                    "out_mode": "out", 
                    "bounce": false,
                    "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { 
                    "onhover": { "enable": true, "mode": "grab" }, 
                    "onclick": { "enable": true, "mode": "push" }, 
                    "resize": true 
                },
                "modes": {
                    "grab": { "distance": 180, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
        console.log("Protocolo de Partículas Neon: ATIVO e VISÍVEL");
    }
}

// Inicializa quando tudo estiver carregado
window.addEventListener('load', initParticles);

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
        document.getElementById('quiz').innerHTML = `<div class='card' style='text-align:center'><h2>Diagnóstico Concluído</h2><p style='margin:15px 0'>Recomendamos buscar apoio no canal oficial.</p></div>`;
    }
}
