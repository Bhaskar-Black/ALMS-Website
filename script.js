// Global variables for download logic
let currentDownloadUrl = '';
const modal = document.getElementById('downloadModal');
const successMessage = document.getElementById('successMessage');

// --- 3D Tilt Effect for Cards ---
// This creates the "Trading Platform" interactive feel
document.addEventListener('DOMContentLoaded', () => {
    // --- System Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            initScrambleEffect(); // Start advanced decode effect
            initSystemStatus(); // Start ping simulation
            initNetworkVisualizer(); // Start network traffic visualizer
            initDigitalClock(); // Start digital clock
            initLiveChat(); // Initialize chat widget
            initThemeToggle(); // Initialize theme switcher
        }, 1500); // Artificial delay for "System Boot" feel
    });

    // --- 3D Tilt & Holographic Shine ---
    document.querySelectorAll('.portal-brief, .team-member').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Holographic Shine Position
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // 3D Tilt Calculation
            const rotateX = ((y - rect.height / 2) / rect.height) * -10; // -10 to 10 deg
            const rotateY = ((x - rect.width / 2) / rect.width) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset position
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- Advanced Scroll Animations (Different styles for different elements) ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
            }
        });
    }, observerOptions);

    // 1. Headers slide in from Left
    document.querySelectorAll('h1, h2, h3').forEach(el => { el.classList.add('anim-hidden', 'anim-left'); observer.observe(el); });
    
    // 2. Paragraphs & Lists slide Up
    document.querySelectorAll('p, ul, .btn').forEach(el => { el.classList.add('anim-hidden', 'anim-up'); observer.observe(el); });
    
    // 3. Cards & Forms Pop in (Zoom) with Staggered Delays
    // Single items
    document.querySelectorAll('.contact-form, .about-portal').forEach(el => { el.classList.add('anim-hidden', 'anim-pop'); observer.observe(el); });

    // Staggered Grid Items (Cards & Team)
    const grids = [document.querySelector('.portal-briefs'), document.querySelector('.team')];
    grids.forEach(grid => {
        if(!grid) return;
        Array.from(grid.children).forEach((child, index) => {
            child.classList.add('anim-hidden', 'anim-pop');
            child.style.transitionDelay = `${index * 150}ms`; // 150ms delay between each item
            observer.observe(child);
        });
    });

    // 4. Images Glitch Reveal
    document.querySelectorAll('img:not(.logo-icon)').forEach(el => {
        el.classList.add('anim-hidden', 'glitch-on-scroll');
        observer.observe(el);
    });

    // --- Image Error Handling ---
    document.querySelectorAll('img').forEach(img => {
        if (img.complete && img.naturalHeight === 0) {
            handleImageError(img);
        }
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });

    // --- Advanced Custom Cursor Logic (Arrow) ---
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    
    document.body.appendChild(cursorDot);

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Main Arrow follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Generate Trail Particles
        if (Math.random() < 0.3) { // Limit density for performance
            const trail = document.createElement('div');
            trail.classList.add('cursor-trail');
            trail.style.left = `${posX}px`;
            trail.style.top = `${posY}px`;
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 500);
        }
    });
    
    // Click Burst Effect
    window.addEventListener('click', (e) => {
        createClickBurst(e.clientX, e.clientY);
    });

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .team-member');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });
    
    // Initialize Audio System on first interaction
    window.addEventListener('click', initAudioContext, { once: true });
    setupUISounds();

    // --- Magnetic Buttons Effect ---
    const magnets = document.querySelectorAll('.btn');
    magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', (e) => {
            const position = magnet.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            // Move button slightly towards mouse (Magnetic Pull)
            magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        magnet.addEventListener('mouseleave', (e) => {
            // Snap back to original position
            magnet.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- Scroll Progress Bar Logic ---
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.getElementById("scroll-progress").style.width = scrolled + "%";
    });

    // --- Scroll Spy (Active Nav Link) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Nav Link Scramble Effect ---
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            scrambleText(link);
        });
    });
});

// --- Advanced Text Scramble Effect ---
function initScrambleEffect() {
    const element = document.getElementById('welcome-text');
    if (!element) return;
    
    scrambleText(element);
}

function scrambleText(element) {
    // Store original text to prevent data loss on multiple hovers
    const originalText = element.getAttribute('data-original') || element.innerText;
    if (!element.getAttribute('data-original')) element.setAttribute('data-original', originalText);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    let iterations = 0;
    
    if (element.dataset.scrambling === "true") return; // Prevent overlap
    element.dataset.scrambling = "true";

    const interval = setInterval(() => {
        element.innerText = originalText.split("")
            .map((letter, index) => {
                if(index < iterations) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        
        if(iterations >= originalText.length) {
            clearInterval(interval);
            element.dataset.scrambling = "false";
        }
        iterations += 1/2; // Speed of decode
    }, 30);
}

// --- System Status Simulation ---
function initSystemStatus() {
    const pingEl = document.getElementById('ping-val');
    if(pingEl) {
        setInterval(() => {
            // Random ping between 12ms and 45ms
            pingEl.innerText = Math.floor(Math.random() * 33) + 12;
        }, 2000);
    }
}

// --- Digital Clock ---
function initDigitalClock() {
    const clock = document.getElementById('digital-clock');
    if (!clock) return;

    function updateClock() {
        const now = new Date();
        clock.innerText = now.toLocaleTimeString('en-US', { hour12: false });
    }
    
    setInterval(updateClock, 1000);
    updateClock();
}

// --- Theme Toggle ---
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('alert-mode');
        if (typeof playSound === 'function') playSound(150, 'sawtooth', 0.2); // Alert sound
    });
}

// --- Live Chat Widget ---
function initLiveChat() {
    const widget = document.getElementById('chat-widget');
    const toggleBtn = document.getElementById('chat-toggle-btn');
    const closeBtn = document.getElementById('close-chat');
    const clearBtn = document.getElementById('clear-chat');
    const sendBtn = document.getElementById('send-chat');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('chat-typing');
    const quickReplies = document.querySelectorAll('.quick-reply');

    if (!widget) return;

    toggleBtn.addEventListener('click', () => {
        widget.style.display = widget.style.display === 'flex' ? 'none' : 'flex';
    });

    closeBtn.addEventListener('click', () => {
        widget.style.display = 'none';
    });

    clearBtn.addEventListener('click', () => {
        messages.innerHTML = '';
        addBotMessage("Chat history cleared. System ready.");
    });

    // Quick Reply Listeners
    quickReplies.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.getAttribute('data-msg');
            sendMessage(text);
        });
    });

    function sendMessage(text = null) {
        text = text || input.value.trim();
        if (text) {
            // Add User Message
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const msgHTML = `<div class="msg-content">${text}</div><div class="msg-time">${time}</div>`;
            
            const userDiv = document.createElement('div');
            userDiv.className = 'chat-msg user';
            userDiv.innerHTML = msgHTML;
            messages.appendChild(userDiv);
            
            input.value = '';
            messages.scrollTop = messages.scrollHeight;
            
            // Show Typing Indicator
            typingIndicator.style.display = 'block';
            messages.scrollTop = messages.scrollHeight;

            // Simulate processing delay
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                const response = getBotResponse(text);
                addBotMessage(response);
            }, 1500);
        }
    }

    function addBotMessage(text) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const msgHTML = `<div class="msg-content">${text}</div><div class="msg-time">${time}</div>`;
        
        const botDiv = document.createElement('div');
        botDiv.className = 'chat-msg bot';
        botDiv.innerHTML = msgHTML;
        messages.appendChild(botDiv);
        messages.scrollTop = messages.scrollHeight;
        
        if (typeof playSound === 'function') playSound(800, 'sine', 0.1); // Notification sound
    }

    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();
        
        if (lowerInput.includes('download') || lowerInput.includes('link')) return "You can download the Admin and User portals from the 'Home' section. Click the 'Download' buttons on the cards.";
        if (lowerInput.includes('requirement') || lowerInput.includes('spec')) return "System Requirements: Windows 10+, macOS 10.14+, or Linux. 4GB RAM and JRE 8+ required.";
        if (lowerInput.includes('admin')) return "The Admin Portal allows inventory tracking, user management, and reporting. Check the 'Admin Portal' card for details.";
        if (lowerInput.includes('contact') || lowerInput.includes('support') || lowerInput.includes('email')) return "You can reach us at autolib.69@gmail.com or via WhatsApp at +91 8755139453.";
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) return "Greetings, User. How may I assist you with the ALMS system today?";
        
        return "Command not recognized. Please try asking about 'Downloads', 'Requirements', or 'Contact'.";
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// --- Network Traffic Visualizer ---
function initNetworkVisualizer() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let activeConnections = new Map();
    
    // Mouse tracking for repel effect
    let mouse = { x: null, y: null, radius: 120 };
    let isMouseDown = false;

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mousedown', () => isMouseDown = true);
    window.addEventListener('mouseup', () => isMouseDown = false);
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    // Create particles
    const particleCount = Math.min(window.innerWidth / 20, 50); // OPTIMIZED: Reduced count for performance
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            baseSize: Math.random() * 2 + 1,
            pulseSpeed: Math.random() * 2 + 1,
            pulseOffset: Math.random() * Math.PI * 2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach((p, index) => {
            // Mouse Interaction Logic
            if (mouse.x != null) {
                let dx = p.x - mouse.x;
                let dy = p.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (isMouseDown) {
                    // Gravity Well (Attraction)
                    const gravityRadius = 400;
                    if (distance < gravityRadius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (gravityRadius - distance) / gravityRadius;
                        p.x -= forceDirectionX * force * 5;
                        p.y -= forceDirectionY * force * 5;
                    }
                } else if (distance < mouse.radius) {
                    // Repel
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    p.x += forceDirectionX * force * 3;
                    p.y += forceDirectionY * force * 3;
                }
            }

            p.x += p.vx;
            p.y += p.vy;
            
            // Pulse Effect
            const currentSize = p.baseSize + Math.sin(Date.now() * 0.003 * p.pulseSpeed + p.pulseOffset) * 0.5;

            // Bounce off edges
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            // Draw particle
            ctx.fillStyle = 'rgba(0, 255, 157, 0.5)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.5, currentSize), 0, Math.PI * 2);
            ctx.fill();
            
            // Connect lines
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const key = `${index}-${j}`;
                
                if (dist < 150) {
                    // Connection Snap Logic
                    let snap = activeConnections.get(key);
                    if (snap === undefined) {
                        snap = 1.0;
                        activeConnections.set(key, snap);
                    } else {
                        snap *= 0.92;
                        if (snap < 0.01) snap = 0;
                        activeConnections.set(key, snap);
                    }

                    ctx.strokeStyle = `rgba(0, 255, 157, ${Math.min(1, 0.15 * (1 - dist / 150) + snap * 0.6)})`;
                    ctx.lineWidth = 1 + snap;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();

                    // Data Packet Animation
                    const packetT = (Date.now() / 1000 + (index + j)) % 1;
                    const px = p.x + (p2.x - p.x) * packetT;
                    const py = p.y + (p2.y - p.y) * packetT;

                    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                    ctx.beginPath();
                    ctx.arc(px, py, 1.0, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    activeConnections.delete(key);
                }
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// --- Particle Burst System ---
function createClickBurst(x, y) {
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('click-particle');
        document.body.appendChild(particle);
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        // Cleanup
        setTimeout(() => particle.remove(), 800);
    }
}

// --- Sci-Fi Audio System ---
let audioCtx;

function initAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSound(freq, type = 'sine', duration = 0.1) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function setupUISounds() {
    const elements = document.querySelectorAll('a, button, .portal-brief');
    elements.forEach(el => {
        el.addEventListener('mouseenter', () => playSound(600, 'sine', 0.05)); // High blip
        el.addEventListener('click', () => playSound(300, 'square', 0.1)); // Low click
    });
}

// --- Download Logic ---
function confirmDownload(url) {
    currentDownloadUrl = url;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
    currentDownloadUrl = '';
}

function proceedDownload() {
    if (currentDownloadUrl) {
        // Simulate download
        const link = document.createElement('a');
        link.href = currentDownloadUrl;
        link.setAttribute('download', ''); // Force download behavior
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        closeModal();
        showToast("Download Started Successfully!");
    }
}

// Close modal if clicking outside content
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// --- PDF Viewers ---
function openPDF() {
    // Placeholder for opening Admin Manual
    alert("Opening Admin Portal Documentation (PDF)...");
    // window.open('docs/admin-manual.pdf', '_blank');
}

function openUserPDF() {
    // Placeholder for opening User Manual
    alert("Opening User Portal Documentation (PDF)...");
    // window.open('docs/user-manual.pdf', '_blank');
}

// --- Contact Actions ---
function sendEmail() {
    window.location.href = "mailto:autolib.69@gmail.com";
}

function sendWhatsApp() {
    // Format phone number for WhatsApp API
    window.open("https://wa.me/918755139453", "_blank");
}

// --- Form Handling ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = "Sending...";
        
        setTimeout(() => {
            successMessage.style.display = 'block';
            contactForm.reset();
            btn.innerText = originalText;
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

// --- Hyper-Real Liquid Background (Three.js + GLSL) ---
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false }); // False for performance style
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-2';
    document.body.appendChild(renderer.domElement);

    const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uScroll: { value: 0 },
    };

    // Custom Shader Material for Classic Luxury
    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            uniform vec2 uResolution;
            uniform vec2 uMouse;
            uniform float uScroll;
            varying vec2 vUv;

            // Rotation matrix
            mat2 rot(float a) {
                float s = sin(a), c = cos(a);
                return mat2(c, -s, s, c);
            }

            // Random Noise
            float random(vec2 p) {
                return fract(sin(dot(p.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            // 7D Fractal Gyroid Function
            float gyroid(vec3 p, float scale) {
                p *= scale;
                return abs(dot(sin(p), cos(p.zxy)));
            }

            // Scene Mapping
            float map(vec3 p) {
                float t = uTime * 0.08; 
                
                p.z += t;
                p.z += uScroll * 1.5;
                
                vec2 m = (uMouse - 0.5) * 0.5;
                p.xy *= rot(m.x);
                p.yz *= rot(m.y);

                // Hyper-Real: Complex layering
                float d = gyroid(p, 1.4) - 0.02;
                
                // Subtle texture layer
                float d2 = gyroid(p * 3.0 + vec3(t * 1.5), 2.5);
                d += d2 * 0.10;
                
                return d * 0.5;
            }

            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                uv.x *= uResolution.x / uResolution.y;
                
                vec3 ro = vec3(0.0, 0.0, -2.5); // Ray Origin
                vec3 rd = normalize(vec3(uv, 1.0)); // Ray Direction
                
                float t = 0.0;
                float glow = 0.0;
                
                // Raymarching
                for(int i=0; i<40; i++) { // OPTIMIZED: Reduced iterations from 80 to 40
                    vec3 p = ro + rd * t;
                    float d = map(p);
                    
                    // Sharp, metallic sheen
                    glow += 0.001 / (0.002 + abs(d));
                    
                    t += max(abs(d), 0.01);
                    if(t > 20.0) break;
                }
                
                vec3 col = vec3(0.0);
                
                // Platinum/Chrome tint
                col += glow * vec3(0.12, 0.13, 0.15);
                
                // Vignette for cinematic feel
                float vig = 1.0 - length(uv * 0.6);
                col *= clamp(vig, 0.0, 1.0);
                
                // Film Grain for realism
                float noise = random(uv + uTime);
                col += (noise - 0.5) * 0.03;
                
                col = mix(col, vec3(0.0), smoothstep(0.0, 15.0, t));
                
                gl_FragColor = vec4(col, 1.0);
            }
        `
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        uniforms.uTime.value = clock.getElapsedTime();
        
        // Smooth scroll interpolation
        const targetScroll = window.scrollY / window.innerHeight;
        uniforms.uScroll.value += (targetScroll - uniforms.uScroll.value) * 0.05;

        renderer.render(scene, camera);
    }
    animate();

    // Interaction Listeners
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = 1.0 - e.clientY / window.innerHeight;
        uniforms.uMouse.value.set(x, y);
    });
});

// --- UI Enhancements ---

// Toast Notification
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

// Smooth Scroll for Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function handleImageError(img) {
    // If it's the logo, just hide it to preserve layout
    if (img.classList.contains('logo-icon')) {
        console.warn("Logo file 'Icon.ico' not found. Using fallback neon icon. Check if file is named 'Icon.ico.ico'.");
        // Use a neon book icon as fallback
        img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ff9d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/%3E%3Cpath d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/%3E%3C/svg%3E";
        img.onerror = null;
        return;
    }
    // For team members or others, show a fallback avatar
    // Simple SVG placeholder encoded as Data URI
    img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23333' stroke='%2300ff9d' stroke-width='1'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23111' /%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2300ff9d'/%3E%3C/svg%3E";
    img.onerror = null; // Prevent infinite loop
}