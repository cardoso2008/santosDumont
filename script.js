// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initHero();
    initScrollEffects();
    initMenu();
    initTimeline();
    initDirigiveis();
    initGame();
});

// ===== SEÇÃO HERO =====
function initHero() {
    const startBtn = document.getElementById('startBtn');
    const body = document.body;
    
    // Bloquear scroll inicialmente
    body.classList.add('no-scroll');
    
    startBtn.addEventListener('click', function() {
        // Liberar scroll
        body.classList.remove('no-scroll');
        
        // Animar botão
        startBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            startBtn.style.opacity = '0';
        }, 200);
        
        // Scroll suave para a próxima seção
        setTimeout(() => {
            document.getElementById('raizes').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }, 500);
    });
}

// ===== EFEITOS DE SCROLL =====
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    
    // Observador de interseção para animações
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        if (section.id !== 'hero') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        }
    });
    
}

// ===== MENU LATERAL =====
function initMenu() {
    const menuLinks = document.querySelectorAll('.side-menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe active de todos
            menuLinks.forEach(l => l.classList.remove('active'));
            
            // Adicionar classe active ao clicado
            this.classList.add('active');
            
            // Scroll suave para a seção
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Atualizar menu ativo baseado no scroll
    window.addEventListener('scroll', updateActiveMenu);
}

function updateActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.side-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== LINHA DO TEMPO =====
function initTimeline() {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;
        
        timelinePoints.forEach(point => {
            const sectionId = point.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                    point.classList.add('active');
                } else {
                    point.classList.remove('active');
                }
            }
        });
    });
    
    // Clique nos pontos da timeline
    timelinePoints.forEach(point => {
        point.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                section.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== DIRIGÍVEIS =====
function initDirigiveis() {
    const dirigivelItems = document.querySelectorAll('.dirigivel-item');
    const modal = document.getElementById('dirigivelModal');
    const closeBtn = document.querySelector('.close-modal');
    
     // Dados dos dirigíveis
    const dirigiveisData = {
        '1': {
            title: 'Dirigível Nº 1',
            date: '20 de setembro de 1898',
            description: 'O primeiro dirigível de Santos Dumont. Tinha 25 metros de comprimento e foi testado no Jardim da Aclimação em Paris. Embora tenha tido problemas técnicos, marcou o início de sua jornada aeronáutica.',
            image: 'img/dirigivel1.jpg'
        },
        '2': {
            title: 'Dirigível Nº 2',
            date: 'Maio de 1899',
            description: 'Menor e mais manobrável que o primeiro, com 20 metros de comprimento. Demonstrou melhor controle direcional, mas ainda enfrentava desafios com o motor.',
            image: 'img/dirigivel2.jpg'
        },
        '3': {
            title: 'Dirigível Nº 3',
            date: 'Novembro de 1899',
            description: 'Com 20 metros de comprimento e formato mais alongado, apresentou melhorias significativas na estabilidade e controle. Foi o primeiro a ter sucesso consistente nos voos.',
            image: 'img/dirigivel3.jpg'
        },
        '4': {
            title: 'Dirigível Nº 4',
            date: 'Agosto de 1900',
            description: 'Projetado especificamente para voos mais longos, tinha 29 metros de comprimento. Foi usado para passeios sobre Paris, demonstrando a viabilidade prática dos dirigíveis.',
            image: 'img/digirivel4.jpg'
        },
        '5': {
            title: 'Dirigível Nº 5',
            date: 'Julho de 1901',
            description: 'Construído para competir pelo Prêmio Deutsch, tinha 33 metros de comprimento. Embora não tenha vencido na primeira tentativa, demonstrou grande potencial.',
            image: 'img/dirigivel5.jpg'
        },
        '6': {
            title: 'Dirigível Nº 6',
            date: '19 de outubro de 1901',
            description: 'O mais famoso de seus dirigíveis! Com 33 metros de comprimento, venceu o Prêmio Deutsch ao contornar a Torre Eiffel em menos de 30 minutos, consolidando Santos Dumont como pioneiro da aviação.',
            image: 'img/dirigivel6.jpg'
        }
    };
    
    dirigivelItems.forEach(item => {
        item.addEventListener('click', function() {
            const dirigivelNum = this.getAttribute('data-dirigivel');
            const data = dirigiveisData[dirigivelNum];
            
            if (data) {
                document.getElementById('modalTitle').textContent = data.title;
                document.getElementById('modalDate').textContent = data.date;
                document.getElementById('modalDescription').textContent = data.description;
                document.getElementById('modalImg').src = data.image;
                document.getElementById('modalImg').alt = data.title;
                
                modal.style.display = 'block';
            }
        });
    });
    // Fechar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}


// ===== FLIP CARDS =====
// As flip cards funcionam apenas com CSS, mas podemos adicionar som ou efeitos extras
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function() {
        // Adicionar pequeno feedback tátil
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// ===== TOOLTIPS DOS ÍCONES =====
// Os tooltips já funcionam com CSS, mas podemos adicionar comportamento mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.icon-item').forEach(item => {
        item.addEventListener('touchstart', function(e) {
            // Remover active de outros
            document.querySelectorAll('.icon-item').forEach(i => {
                if (i !== this) i.classList.remove('touch-active');
            });
            
            // Toggle active neste
            this.classList.toggle('touch-active');
        });
    });
}

// ===== HOTSPOTS DO 14-BIS =====
// Melhorar interação mobile para os hotspots
if ('ontouchstart' in window) {
    document.querySelectorAll('.bis14-hotspot').forEach(hotspot => {
        hotspot.addEventListener('touchstart', function(e) {
            e.preventDefault();
            
            // Remover active de outros
            document.querySelectorAll('.bis14-hotspot').forEach(h => {
                if (h !== this) h.classList.remove('touch-active');
            });
            
            // Toggle active neste
            this.classList.toggle('touch-active');
        });
    });
}

// ===== SMOOTH SCROLL POLYFILL =====
// Para navegadores mais antigos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== PERFORMANCE: DEBOUNCE PARA SCROLL =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos eventos de scroll pesados
const debouncedMenuUpdate = debounce(updateActiveMenu, 100);
window.addEventListener('scroll', debouncedMenuUpdate);

// ===== LOG DE INICIALIZAÇÃO =====
console.log('%c🛩️ Site Santos Dumont carregado com sucesso!', 'color: #b87333; font-size: 16px; font-weight: bold;');
console.log('%cDesenvolvido com HTML, CSS, JavaScript e Bootstrap', 'color: #7c6a55; font-size: 12px;');

