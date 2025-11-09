// script.js

// Dữ liệu bí mật để đăng nhập (Client-side check)
const USERNAME_BIMAT = "Baongoc";
const PASSWORD_BIMAT = "ngoc2011"; 

function xuLyDangNhap(event) {
    event.preventDefault(); 

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput === USERNAME_BIMAT && passwordInput === PASSWORD_BIMAT) {
        // Đăng nhập thành công, lưu trạng thái và chuyển hướng đến thư mục baongoc/
        sessionStorage.setItem('loggedIn', 'true');
        // Đường dẫn đã sửa để trỏ vào thư mục con baongoc/
        window.location.href = "baongoc/dashboard.html"; 
    } else {
        alert("⚠️ Tên đăng nhập hoặc Mật khẩu không đúng. Vui lòng thử lại!");
        document.getElementById('password').value = ''; 
    }
}

// Hàm kiểm tra trạng thái đăng nhập cho các trang nội dung
function kiemTraDangNhap() {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    // Kiểm tra nếu chưa đăng nhập và đang ở trang nội dung (không phải index.html)
    if (isLoggedIn !== 'true' && window.location.href.indexOf('index.html') === -1) {
        alert("Bạn cần đăng nhập để truy cập trang này!");
        // Đường dẫn về index.html ở thư mục gốc (áp dụng cho các trang trong /baongoc/)
        window.location.href = "../index.html"; 
    }
}

// Logic cho Hamburger Menu (Chỉ chạy trên các trang nội dung)
function setupHamburgerMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('main-nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Thay đổi trạng thái hiển thị của menu
            navLinks.classList.toggle('active');
            
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Tự động đóng menu khi chọn một liên kết (chỉ áp dụng trên mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Kiểm tra xem liên kết có phải nút đăng xuất không (để tránh lỗi)
                if (link.classList.contains('logout-btn')) {
                    // Nếu là nút đăng xuất, cho phép hàm đăng xuất chạy
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


// Gắn sự kiện khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    const formDangNhap = document.getElementById('login-form');
    
    if (formDangNhap) {
        // Trang Đăng nhập
        formDangNhap.addEventListener('submit', xuLyDangNhap);
    } else {
        // Các Trang Nội dung
        kiemTraDangNhap();
        setupHamburgerMenu(); 
    }
});
