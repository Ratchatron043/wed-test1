// ข้อมูลเข้าสู่ระบบ
const USER_DATA = {
    user: "Nongqux",
    pass: "12345"
};

// ข้อมูลสินค้า
const products = [
    { id: 1, name: "หูฟัง Noise Cancelling", price: 3500, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
    { id: 2, name: "Smart Watch S8", price: 8900, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
    { id: 3, name: "กล้อง Mirrorless", price: 24500, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300" },
    { id: 4, name: "ลำโพง Marshall", price: 12900, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300" }
];

let cart = [];

// ฟังก์ชันเปลี่ยนหน้า
function showSection(sectionId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    if(sectionId === 'cart-page') renderCart();
}

// ระบบ Login
function login() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    const error = document.getElementById('login-error');

    if (u === USER_DATA.user && p === USER_DATA.pass) {
        showSection('home-page');
        renderProducts();
    } else {
        error.innerText = "ชื่อผู้ใช้หรือรหัสผ่านผิด!";
    }
}

function logout() {
    cart = [];
    updateCartCount();
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    showSection('login-page');
}

// แสดงสินค้า
function renderProducts() {
    const grid = document.getElementById('product-list');
    grid.innerHTML = products.map(pd => `
        <div class="product-card">
            <img src="${pd.img}">
            <h3>${pd.name}</h3>
            <p class="price">${pd.price.toLocaleString()} บาท</p>
            <button class="add-btn" onclick="addToCart(${pd.id})">เพิ่มลงตะกร้า</button>
        </div>
    `).join('');
}

// ตะกร้าสินค้า
function addToCart(id) {
    const pd = products.find(p => p.id === id);
    cart.push(pd);
    updateCartCount();
    alert("เพิ่ม " + pd.name + " ลงตะกร้าแล้ว");
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('total-price');
    
    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center; padding:50px;'>ไม่มีสินค้าในตะกร้า</p>";
        totalEl.innerText = "0";
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div style="display:flex; align-items:center; gap:20px;">
                    <img src="${item.img}" width="60" style="border-radius:8px;">
                    <strong>${item.name}</strong>
                </div>
                <div>
                    <span style="margin-right:20px;">${item.price.toLocaleString()} บาท</span>
                    <button onclick="removeFromCart(${index})" style="color:red; border:none; background:none; cursor:pointer;">ลบ</button>
                </div>
            </div>
        `;
    }).join('');
    totalEl.innerText = total.toLocaleString();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
    updateCartCount();
}

// ระบบชำระเงิน
function processCheckout() {
    if(cart.length === 0) return alert("โปรดเลือกสินค้าก่อน!");
    alert("เข้าสู่การชำระเงิน...");
    showSection('payment-page');
}

function switchPayment(method) {
    const cardF = document.getElementById('card-fields');
    const bankF = document.getElementById('bank-fields');
    const btnC = document.getElementById('method-card');
    const btnB = document.getElementById('method-bank');

    if(method === 'card') {
        cardF.style.display = 'block';
        bankF.style.display = 'none';
        btnC.classList.add('active');
        btnB.classList.remove('active');
    } else {
        cardF.style.display = 'none';
        bankF.style.display = 'block';
        btnC.classList.remove('active');
        btnB.classList.add('active');
    }
}

function completePayment() {
    alert("การชำระเงินสำเร็จ! ขอบคุณที่อุดหนุนครับ");
    cart = [];
    updateCartCount();
    showSection('home-page');
}