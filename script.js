document.addEventListener('DOMContentLoaded', () => {
    // Cyber Sound Generator (Web Audio API - Sci-Fi Click)
    function playCyberClick() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        } catch (e) {
            // Audio context policy fallback
        }
    }

    // Pasang sound click ke tombol interaktif utama
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', () => {
            playCyberClick();
        });
    });

    // Hamburger Navigation Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // Tutup menu saat mengklik di luar navbar
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth Page Slide Transition
    const links = document.querySelectorAll('.nav-item, .btn-neon');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetUrl = link.getAttribute('href');
            if (targetUrl && targetUrl.includes('.html') && !targetUrl.startsWith('#')) {
                e.preventDefault();
                document.body.classList.add('page-exit');
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 450);
            }
        });
    });

    // Quick Filter Kategori Laptop
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.card[data-category]');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Modal Popup Detail Spesifikasi Produk
    const productModal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const detailButtons = document.querySelectorAll('.btn-card');

    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalSpecs = document.getElementById('modalSpecs');
    const modalActionBtn = document.getElementById('modalActionBtn');

    if (detailButtons.length > 0 && productModal) {
        detailButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.getAttribute('data-title');
                const price = btn.getAttribute('data-price');
                const specs = btn.getAttribute('data-specs');

                if (modalTitle) modalTitle.textContent = title;
                if (modalPrice) modalPrice.textContent = price;
                if (modalSpecs) modalSpecs.textContent = specs;

                // Update link WhatsApp pemesanan dinamis
                if (modalActionBtn) {
                    modalActionBtn.onclick = () => {
                        const message = encodeURIComponent(`Halo CoreLogic Technologies, saya tertarik untuk memesan unit ${title} seharga ${price}. Mohon informasi ketersediaannya.`);
                        window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
                    };
                }

                productModal.classList.add('active');
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                productModal.classList.remove('active');
            });
        }

        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                productModal.classList.remove('active');
            }
        });
    }

    // Real-Time Clock untuk Slide ke-3 (Halaman About Us)
    function updateLiveClock() {
        const clockElement = document.getElementById('liveClock');
        const statusElement = document.getElementById('storeStatus');
        if (!clockElement) return;

        const now = new Date();
        const hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        clockElement.textContent = `${now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - ${hours}:${minutes}:${seconds} WIB`;

        // Toko buka pukul 09:00 - 21:00 WIB
        if (hours >= 9 && hours < 21) {
            statusElement.textContent = "Buka (Layanan Aktif)";
            statusElement.style.color = "var(--neon-green)";
        } else {
            statusElement.textContent = "Tutup (Online Order Only)";
            statusElement.style.color = "#ff0055";
        }
    }
    
    setInterval(updateLiveClock, 1000);
    updateLiveClock();

    // Inisialisasi Canvas Hacker Background
    initHackerCanvas();
});

// Canvas Matrix / Hacker Code Stream Effect
function initHackerCanvas() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const characters = '01CORELOGIC10ASUSROG18RTX4090010101XYZA9876543210#$%*';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
    }

    function draw() {
        ctx.fillStyle = 'rgba(5, 11, 20, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            
            if (Math.random() > 0.88) {
                ctx.fillStyle = '#00ff66';
            } else {
                ctx.fillStyle = '#00f0ff';
            }

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);
}
// Slide / Tab Interaktif di Halaman About Us
const slideBtns = document.querySelectorAll('.slide-btn');
const slidePanes = document.querySelectorAll('.about-slide-pane');

if (slideBtns.length > 0) {
    slideBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus kelas aktif dari semua tombol & pane
            slideBtns.label?.forEach(b => b.classList.remove('active')); // aman
            slideBtns.forEach(b => b.classList.remove('active'));
            slidePanes.forEach(pane => pane.style.display = 'none');

            // Tambahkan kelas aktif ke tombol yang diklik & tampilkan target pane
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.style.display = 'block';
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // Navigasi Slide About Us dengan Efek Geser ke Kanan
    const slideBtns = document.querySelectorAll('.slide-btn');
    const slidePanes = document.querySelectorAll('.about-slide-pane');

    if (slideBtns.length > 0 && slidePanes.length > 0) {
        slideBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                slideBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const targetId = btn.getAttribute('data-target');
                
                slidePanes.forEach(pane => {
                    if (pane.id === targetId) {
                        pane.style.display = 'block';
                        pane.classList.add('active');
                    } else {
                        pane.style.display = 'none';
                        pane.classList.remove('active');
                    }
                });
            });
        });
    }

    // Real-Time Clock & Store Status
    function updateLiveClock() {
        const clockElement = document.getElementById('liveClock');
        const statusElement = document.getElementById('storeStatus');
        if (!clockElement) return;

        const now = new Date();
        const hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        clockElement.textContent = `${now.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} - ${hours}:${minutes}:${seconds} WIB`;

        if (hours >= 9 && hours < 21) {
            statusElement.textContent = "Buka (Layanan Aktif)";
            statusElement.style.color = "var(--neon-green)";
        } else {
            statusElement.textContent = "Tutup (Online Order Only)";
            statusElement.style.color = "#ff0055";
        }
    }
    
    setInterval(updateLiveClock, 1000);
    updateLiveClock();

    // Fungsi pendukung lainnya (Modal, Filter, Canvas, dll.) tetap aktif...
});