// script.js

// Dữ liệu bí mật để đăng nhập (Client-side check)
const USERNAME_BIMAT = "huong";
const PASSWORD_BIMAT = "ngoc2011"; 

function xuLyDangNhap(event) {
    // Ngăn chặn form gửi đi theo cách truyền thống
    event.preventDefault(); 

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    // Kiểm tra đăng nhập
    if (usernameInput === USERNAME_BIMAT && passwordInput === PASSWORD_BIMAT) {
        // Lưu trạng thái đăng nhập đơn giản vào Session Storage
        sessionStorage.setItem('loggedIn', 'true');
        // Chuyển hướng đến trang tổng quan
        window.location.href = "dashboard.html";
    } else {
        alert("⚠️ Tên đăng nhập hoặc Mật khẩu không đúng. Vui lòng thử lại!");
        document.getElementById('password').value = ''; 
    }
}

// Hàm kiểm tra trạng thái đăng nhập cho các trang nội dung
function kiemTraDangNhap() {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    // Nếu chưa đăng nhập, chuyển về trang chủ
    if (isLoggedIn !== 'true' && window.location.pathname.indexOf('index.html') === -1 && window.location.pathname !== '/') {
        alert("Bạn cần đăng nhập để truy cập trang này!");
        window.location.href = "index.html"; 
    }
}

// Gắn sự kiện khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    // 1. Xử lý logic trên trang Đăng nhập
    const formDangNhap = document.getElementById('login-form');
    if (formDangNhap) {
        formDangNhap.addEventListener('submit', xuLyDangNhap);
    }
    
    // 2. Kiểm tra trên tất cả các trang nội dung (ngoại trừ trang index)
    if (!formDangNhap) {
        kiemTraDangNhap();
    }
});
