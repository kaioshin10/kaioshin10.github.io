// script.js

// Dữ liệu bí mật để đăng nhập (Client-side check)
const USERNAME_BIMAT = "Baongoc";
const PASSWORD_BIMAT = "ngoc2011"; // script.js (PHIÊN BẢN CÓ HIỆU ỨNG  

// --- LOGIC ĐĂNG NHẬP ---
function xuLyDangNhap(event) {
    event.preventDefault(); 

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput === USERNAME_BIMAT && passwordInput === PASSWORD_BIMAT) {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = "baongoc/dashboard.html"; 
    } else {
        alert("⚠️ Tên đăng nhập hoặc Mật khẩu không đúng. Vui lòng thử lại!");
        document.getElementById('password').value = ''; 
    }
}

// --- LOGIC KIỂM TRA ĐĂNG NHẬP VÀ MENU (GIỮ NGUYÊN) ---
function kiemTraDangNhap() {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    if (isLoggedIn !== 'true' && window.location.href.indexOf('index.html') === -1) {
        alert("Bạn cần đăng nhập để truy cập trang này!");
        window.location.href = "../index.html"; 
    }
}

function setupHamburgerMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('main-nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (link.classList.contains('logout-btn')) return; 
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}

// --- LOGIC CHUYỂN ĐỘNG MASCOT (MỚI) ---
function setupMascotAnimation() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const eyes = document.querySelectorAll('.eye');

    if (!usernameInput || !passwordInput) return; // Không phải trang đăng nhập

    // 1. Logic che mắt khi nhập mật khẩu
    passwordInput.addEventListener('focus', () => {
        eyes.forEach(eye => {
            // Thêm class để che mắt
            eye.classList.add('closed-eye'); 
            eye.classList.remove('uncover');
        });
    });

    passwordInput.addEventListener('blur', () => {
        eyes.forEach(eye => {
            // Mở mắt
            eye.classList.remove('closed-eye');
            eye.classList.add('uncover');
        });
    });

    // 2. Logic nhìn theo khi nhập Username
    usernameInput.addEventListener('input', (e) => {
        // Lấy tọa độ con chuột (hoặc trung tâm input)
        const targetElement = e.target;
        
        // Tính toán vị trí tâm input để con ngươi nhìn vào
        const inputRect = targetElement.getBoundingClientRect();
        const inputCenter = { x: inputRect.left + inputRect.width / 2, y: inputRect.top + inputRect.height / 2 };

        eyes.forEach(eye => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenter = { x: eyeRect.left + eyeRect.width / 2, y: eyeRect.top + eyeRect.height / 2 };

            // Tính góc (Angle) giữa mắt và tâm input
            const angle = Math.atan2(inputCenter.y - eyeCenter.y, inputCenter.x - eyeCenter.x);
            
            // Tính toán vị trí con ngươi
            const pupil = eye.querySelector('::before');
            // Giới hạn khoảng cách di chuyển để con ngươi không ra ngoài (khoảng 8px)
            const x = Math.cos(angle) * 8; 
            const y = Math.sin(angle) * 8;

            // Di chuyển con ngươi bằng CSS transform
            eye.style.setProperty('--pupil-x', `${x}px`);
            eye.style.setProperty('--pupil-y', `${y}px`);
        });
    });

    // Đặt lại con ngươi về giữa khi blur
    usernameInput.addEventListener('blur', () => {
        eyes.forEach(eye => {
            eye.style.setProperty('--pupil-x', '0px');
            eye.style.setProperty('--pupil-y', '0px');
        });
    });
}

// --- Gắn sự kiện khi DOM đã tải xong ---
document.addEventListener('DOMContentLoaded', () => {
    const formDangNhap = document.getElementById('login-form');
    
    if (formDangNhap) {
        // Trang Đăng nhập
        formDangNhap.addEventListener('submit', xuLyDangNhap);
        setupMascotAnimation(); // Bật animation Mascot
    } else {
        // Các Trang Nội dung
        kiemTraDangNhap();
        setupHamburgerMenu(); 
    }
});
