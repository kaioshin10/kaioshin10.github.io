   // script.js (PHIÊN BẢN HOÀN CHỈNH)

// Dữ liệu bí mật để đăng nhập
const USERNAME_BIMAT = "Baongoc";
const PASSWORD_BIMAT = "ngoc2011"; 

// --- LOGIC ĐĂNG NHẬP ---
function xuLyDangNhap(event) {
    event.preventDefault(); 

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput === USERNAME_BIMAT && passwordInput === PASSWORD_BIMAT) {
        sessionStorage.setItem('loggedIn', 'true');
        // Chuyển hướng đến dashboard trong thư mục baongoc
        window.location.href = "baongoc/dashboard.html"; 
    } else {
        alert("⚠️ Tên đăng nhập hoặc Mật khẩu không đúng. Vui lòng thử lại!");
        document.getElementById('password').value = ''; 
    }
}

// Hàm Logout
function logout() {
    sessionStorage.removeItem('loggedIn');
    // Trở về trang index.html ở thư mục gốc
    window.location.href = "../index.html"; 
}

// --- LOGIC KIỂM TRA ĐĂNG NHẬP VÀ MENU ---
function kiemTraDangNhap() {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    // Chỉ kiểm tra nếu KHÔNG phải trang index
    if (isLoggedIn !== 'true' && window.location.href.indexOf('index.html') === -1) {
        alert("Bạn cần đăng nhập để truy cập trang này!");
        // Đường dẫn đã sửa: trỏ ra thư mục gốc
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
                // Đóng menu sau khi click (trừ khi là nút Đăng Xuất)
                if (link.classList.contains('logout-btn')) {
                    // Xử lý nút Đăng Xuất
                    logout();
                    return; 
                } 
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}

// --- LOGIC CHUYỂN ĐỘNG MASCOT BƯỚM 🦋 ---
function setupMascotAnimation() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const eyes = document.querySelectorAll('.eye');

    if (!usernameInput || !passwordInput) return;

    // 1. Logic che mắt khi nhập mật khẩu
    passwordInput.addEventListener('focus', () => {
        eyes.forEach(eye => {
            eye.classList.add('closed-eye'); 
        });
    });

    passwordInput.addEventListener('blur', () => {
        eyes.forEach(eye => {
            eye.classList.remove('closed-eye');
        });
    });

    // 2. Logic nhìn theo khi nhập Username
    usernameInput.addEventListener('input', (e) => {
        const targetElement = e.target;
        
        // Lấy tâm input (vị trí cần nhìn vào)
        const inputRect = targetElement.getBoundingClientRect();
        const inputCenter = { x: inputRect.left + inputRect.width / 2, y: inputRect.top + inputRect.height / 2 };

        eyes.forEach(eye => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenter = { x: eyeRect.left + eyeRect.width / 2, y: eyeRect.top + eyeRect.height / 2 };

            // Tính góc (Angle) giữa mắt và tâm input
            const angle = Math.atan2(inputCenter.y - eyeCenter.y, inputCenter.x - eyeCenter.x);
            
            // Giới hạn khoảng cách di chuyển (6px cho mắt bướm)
            const x = Math.cos(angle) * 6; 
            const y = Math.sin(angle) * 6; 

            // Di chuyển con ngươi bằng cách thiết lập biến CSS
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
        setupMascotAnimation(); 
    } else {
        // Các Trang Nội dung
        kiemTraDangNhap();
        setupHamburgerMenu(); 
    }
});
      
