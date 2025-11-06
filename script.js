// Dữ liệu và cấu hình
const LOVE_DATE = new Date('2025-03-14T00:00:00').getTime(); // Ngày kỷ niệm: 14/03/2025

// --- LOVE TIMER FUNCTION (Đồng hồ đếm ngày yêu nhau) ---
function updateLoveTimer() {
    const now = new Date().getTime();
    const distance = now - LOVE_DATE;

    // Tính toán thời gian
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timerElement = document.getElementById('love-timer');
    if (timerElement) {
        timerElement.innerHTML = `
            ${days} Ngày &nbsp;|&nbsp; 
            ${hours.toString().padStart(2, '0')} Giờ &nbsp;|&nbsp; 
            ${minutes.toString().padStart(2, '0')} Phút &nbsp;|&nbsp; 
            ${seconds.toString().padStart(2, '0')} Giây
        `;
    }
}
setInterval(updateLoveTimer, 1000); // Cập nhật mỗi giây


document.addEventListener('DOMContentLoaded', () => {
    // 1. Logic Đăng nhập
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Kiểm tra mật khẩu mô phỏng
        if (username === 'Ngoc' && password === '1403') {
            document.getElementById('login-page').classList.remove('active');
            document.getElementById('dashboard-page').classList.add('active');
            updateLoveTimer(); 
        } else {
            alert('Mật khẩu bí mật không đúng. Vui lòng thử lại!');
        }
    });

    // 2. Logic Chuyển trang (Navigation)
    const navLinks = document.querySelectorAll('.nav-links a, .cta-button[data-page]');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            const targetId = targetPage + '-section';

            contentSections.forEach(section => section.classList.remove('active'));
            navLinks.forEach(nav => nav.classList.remove('active'));

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                if (this.closest('.nav-links')) {
                    this.classList.add('active');
                }
            }
        });
    });

    // 3. Logic Nhật Ký (Journal - Lưu tạm bằng LocalStorage)
    const journalFormContainer = document.getElementById('journal-form-container');
    const journalList = document.getElementById('journal-list');
    const addJournalButton = document.getElementById('add-journal');
    const saveJournalButton = document.getElementById('save-journal');

    addJournalButton.addEventListener('click', () => {
        journalFormContainer.style.display = (journalFormContainer.style.display === 'none' || journalFormContainer.style.display === '') ? 'block' : 'none';
        document.getElementById('journal-title').value = '';
        document.getElementById('journal-content').value = '';
    });

    saveJournalButton.addEventListener('click', () => {
        const title = document.getElementById('journal-title').value.trim();
        const content = document.getElementById('journal-content').value.trim();
        
        if (title && content) {
            const newEntry = {
                title: title,
                content: content,
                date: new Date().toLocaleDateString('vi-VN')
            };

            let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            entries.unshift(newEntry);
            localStorage.setItem('journalEntries', JSON.stringify(entries));

            alert('Bài nhật ký đã được lưu thành công!');
            journalFormContainer.style.display = 'none';
            renderJournalEntries();
        } else {
            alert('Vui lòng điền đầy đủ Tiêu đề và Nội dung!');
        }
    });

    function renderJournalEntries() {
        let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        journalList.innerHTML = '';

        if (entries.length === 0) {
            journalList.innerHTML = '<p class="placeholder-text">Chưa có bài viết nào được lưu. Hãy viết bài đầu tiên nhé!</p>';
        } else {
            entries.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('journal-entry');
                entryDiv.innerHTML = `
                    <h3 class="entry-title">${entry.title}</h3>
                    <span class="entry-date">Ngày: ${entry.date}</span>
                    <p>${entry.content.substring(0, 300)}...</p>
                `;
                journalList.appendChild(entryDiv);
            });
        }
    }
    renderJournalEntries(); 
    
    // 4. Logic Wishlist & Goals (Lưu tạm bằng LocalStorage)
    const addWishlistButton = document.getElementById('add-wishlist');
    const wishlistInput = document.getElementById('wishlist-item');
    const wishlistList = document.getElementById('wishlist-list');

    addWishlistButton.addEventListener('click', () => {
        const itemText = wishlistInput.value.trim();
        if (itemText) {
            let items = JSON.parse(localStorage.getItem('wishlistItems')) || [];
            
            const newItem = {
                id: Date.now(),
                text: itemText,
                completed: false
            };
            
            items.push(newItem);
            localStorage.setItem('wishlistItems', JSON.stringify(items));
            wishlistInput.value = '';
            renderWishlist();
        } else {
            alert('Vui lòng nhập mục tiêu!');
        }
    });

    function renderWishlist() {
        let items = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        wishlistList.innerHTML = '';
        
        if (items.length === 0) {
            wishlistList.innerHTML = '<p class="placeholder-text">Chưa có mục tiêu nào được thêm. Hãy cùng nhau lập kế hoạch nhé!</p>';
        } else {
            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('wishlist-item-entry');
                if (item.completed) {
                    itemDiv.classList.add('completed');
                }
                
                itemDiv.innerHTML = `
                    <span class="wishlist-text">${item.text}</span>
                    <div class="wishlist-actions">
                        <button class="btn-complete" data-id="${item.id}">✅ Hoàn thành</button>
                        <button class="btn-delete" data-id="${item.id}">❌ Xóa</button>
                    </div>
                `;
                wishlistList.appendChild(itemDiv);
            });
        }
    }

    wishlistList.addEventListener('click', function(e) {
        const target = e.target;
        const itemId = target.getAttribute('data-id');

        if (itemId) {
            let items = JSON.parse(localStorage.getItem('wishlistItems')) || [];
            const index = items.findIndex(item => item.id == itemId);

            if (target.classList.contains('btn-complete')) {
                if (index !== -1) {
                    items[index].completed = !items[index].completed;
                }
            } else if (target.classList.contains('btn-delete')) {
                if (index !== -1) {
                    items.splice(index, 1);
                }
            }
            
            localStorage.setItem('wishlistItems', JSON.stringify(items));
            renderWishlist();
        }
    });
    renderWishlist(); 
});
