document.addEventListener('DOMContentLoaded', () => {
    const loveMessageElement = document.getElementById('love-message');
    const loveButton = document.getElementById('love-button');
    const surpriseMessage = document.getElementById('surprise-message');
    const sections = document.querySelectorAll('.section-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const sidebarToggleButton = document.getElementById('sidebar-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const cursorPet = document.getElementById('cursor-pet');
    const playMusicButton = document.getElementById('play-music-button');
    const backgroundMusic = document.getElementById('background-music');
    const scrollDownButton = document.querySelector('.scroll-down-button');

    // 1. Mensagem de amor (SEM EFEITO DE DIGITAÇÃO)
    // A mensagem já estará completa no HTML
    // Removida a função typeWriter() e sua chamada aqui.

    // 2. Botão "Clique aqui se você me ama 🥺"
    loveButton.addEventListener('click', () => {
        surpriseMessage.classList.remove('hidden');
        surpriseMessage.style.display = 'block';
        surpriseMessage.style.animation = 'fadeInUp 0.5s ease-out forwards';
    });

    const fadeInUpKeyframes = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = fadeInUpKeyframes;
    document.head.appendChild(styleSheet);


    // 3. Navegação entre Seções
    function showSection(targetId) {
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        const activeSection = document.getElementById(targetId);
        if (activeSection) {
            activeSection.style.display = 'block';
            setTimeout(() => activeSection.classList.add('active'), 10);
            activeSection.scrollIntoView({ behavior: 'smooth' });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            }
        });

        if (window.innerWidth <= 768) {
            sidebarMenu.classList.remove('active');
        }
    }

    // Event listeners para os links de navegação da sidebar
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;
            showSection(targetId);
        });
    });

    // Event listener para o botão "Ver Nossos Momentos" na página inicial
    scrollDownButton.addEventListener('click', () => {
        const targetId = scrollDownButton.dataset.target;
        showSection(targetId);
    });

    showSection('home');

    // 4. Toggle da Sidebar (coração flutuante)
    sidebarToggleButton.addEventListener('click', () => {
        sidebarMenu.classList.toggle('active');
    });

    // 5. Modo Dia/Noite
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
    });

    // 6. Virtual Pet (segue o cursor)
    document.addEventListener('mousemove', (e) => {
        cursorPet.style.left = `${e.clientX}px`;
        cursorPet.style.top = `${e.clientY}px`;
    });

    // 7. Animação de elementos caindo (corações)
    function createFallingElement() {
        const element = document.createElement('div');
        element.classList.add('falling-element');
        element.innerHTML = '🤍';
        element.style.left = `${Math.random() * 100}vw`;
        element.style.animationDuration = `${Math.random() * 3 + 2}s`;
        element.style.opacity = Math.random();
        element.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
        document.body.appendChild(element);

        element.addEventListener('animationend', () => {
            element.remove();
        });
    }

    setInterval(createFallingElement, 500);

    // 8. Botão Mágico (muda cores e toca música)
    const magicButton = document.getElementById('magic-button');
    const magicMusic = new Audio('audio/magic_sound.mp3');

    magicButton.addEventListener('click', () => {
        magicMusic.play().catch(e => console.error("Erro ao tocar som mágico:", e));

        const randomPastelColor = () => {
            const hue = Math.floor(Math.random() * 360);
            return `hsl(${hue}, 80%, 90%)`;
        };

        document.documentElement.style.setProperty('--primary-bg-day', randomPastelColor());
        document.documentElement.style.setProperty('--secondary-bg-day', randomPastelColor());
        document.documentElement.style.setProperty('--accent-color-day', randomPastelColor());
        document.documentElement.style.setProperty('--text-color-day', '#424242');
        document.documentElement.style.setProperty('--button-bg-day', randomPastelColor());
        document.documentElement.style.setProperty('--button-hover-day', randomPastelColor());
        document.documentElement.style.setProperty('--sidebar-bg-day', randomPastelColor());
        document.documentElement.style.setProperty('--link-color-day', randomPastelColor());

        setTimeout(() => {
            location.reload();
        }, 5000);
    });

    // Controle da música de fundo
    playMusicButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => playMusicButton.textContent = 'Pausar Música ⏸️')
                .catch(e => console.error("Erro ao tocar música:", e));
        } else {
            backgroundMusic.pause();
            playMusicButton.textContent = 'Tocar Nossa Música 🎶';
        }
    });

});