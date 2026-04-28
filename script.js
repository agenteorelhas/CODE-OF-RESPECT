document.addEventListener('DOMContentLoaded', () => {
    // Ativa ícones Lucide
    if (window.lucide) lucide.createIcons();
    
    // Configuração de Partículas Neon Amarelas
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#FFD700" }, // Amarelo Vibrante
                "shape": { "type": "circle" },
                "opacity": { 
                    "value": 1, // Opacidade total para brilhar
                    "random": true, 
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.4, "sync": false } 
                },
                "size": { "value": 3, "random": true },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#FFD700", // Linhas Amarelas
                    "opacity": 0.6, 
                    "width": 1 
                },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 1 } } }
            },
            "retina_detect": true
        });
    }
});
