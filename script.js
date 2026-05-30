const products = [
    {
        id: 1,
        title: "Jersey Arsenal 2000-2001 Away",
        price: 1600000,
        image: "arsenal_dreamcast_front.png",
        hoverImage: "arsenal_dreamcast_back.png"
    },
    {
        id: 2,
        title: "Jersey Bola - Away Edition",
        price: 245000,
        image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        title: "Celana Training Premium",
        price: 150000,
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        title: "Jaket Olahraga Timnas",
        price: 350000,
        image: "https://images.unsplash.com/photo-1556822284-ce444005b5db?auto=format&fit=crop&q=80&w=400"
    }
];

let cart = [];

// Format Currency
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

// Render Products
const renderProducts = () => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productEl = document.createElement('div');
        productEl.classList.add('product-card');

        let imageHTML = `<img src="${product.image}" alt="${product.title}" class="product-image main-img">`;
        if (product.hoverImage) {
            imageHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.title}" class="product-image main-img">
                    <img src="${product.hoverImage}" alt="${product.title} Back" class="product-image hover-img">
                </div>
            `;
        }

        productEl.innerHTML = `
            ${imageHTML}
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-price-row">
                    <div class="product-price">${formatRupiah(product.price)}</div>
                    <button class="btn-yellow-cart" onclick="addToCart(${product.id})" title="Tambah ke Keranjang">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;

        productList.appendChild(productEl);
    });
};

// Add to Cart
const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartBadge();

    alert(`🛒 "${product.title}" berhasil ditambahkan ke keranjang kuning!`);
};

// Remove from Cart
const removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartBadge();
    renderCartItems();
};

// Update Cart Badge
const updateCartBadge = () => {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
};

// Modal Logic
const modal = document.getElementById('cart-modal');
const cartIcon = document.getElementById('cart-icon');
const closeBtn = document.querySelector('.close-btn');
const checkoutBtn = document.querySelector('.checkout-btn');

const checkoutModal = document.getElementById('checkout-page-modal');
const closeCheckoutBtn = document.querySelector('.close-checkout-btn');
const placeOrderBtn = document.getElementById('place-order-btn');

const renderCartItems = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 30px 0; color: #999;">Keranjang belanja kamu masih kosong.</p>';
        totalPriceEl.innerText = formatRupiah(0);
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <div style="display:flex; align-items:center; gap: 20px;">
                <span class="cart-item-price">${formatRupiah(item.price)}</span>
                <button class="remove-btn" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    totalPriceEl.innerText = formatRupiah(total);
};

const renderCheckoutItems = () => {
    const checkoutOrderItemsContainer = document.getElementById('checkout-order-items');
    const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
    const checkoutTotalEl = document.getElementById('checkout-total');

    checkoutOrderItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const row = document.createElement('div');
        row.classList.add('checkout-item-row');
        row.innerHTML = `
            <div class="checkout-item-name">${item.title} <strong style="color:#333;">× 1</strong></div>
            <div class="checkout-item-price">${formatRupiah(item.price)}</div>
        `;
        checkoutOrderItemsContainer.appendChild(row);
    });

    checkoutSubtotalEl.innerText = formatRupiah(total);
    checkoutTotalEl.innerText = formatRupiah(total);
};

cartIcon.addEventListener('click', () => {
    renderCartItems();
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

closeCheckoutBtn.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
});

// Success Modal Logic
const successModal = document.getElementById('success-modal');
const closeSuccessBtn = document.getElementById('close-success-btn');

closeSuccessBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        modal.style.display = 'none';
        renderCheckoutItems();
        checkoutModal.style.display = 'block';
    } else {
        alert('Keranjang belanja masih kosong!');
    }
});

placeOrderBtn.addEventListener('click', () => {
    // 1. Ambil data dari form
    const firstName = document.getElementById('checkout-firstname').value.trim();
    const lastName = document.getElementById('checkout-lastname').value.trim();
    const address = document.getElementById('checkout-address1').value.trim();
    const city = document.getElementById('checkout-city').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const email = document.getElementById('checkout-email') ? document.getElementById('checkout-email').value.trim() : "";
    const notes = document.getElementById('checkout-notes') ? document.getElementById('checkout-notes').value.trim() : "";

    // 2. Validasi sederhana
    if (!firstName || !address || !city || !phone) {
        alert('Mohon lengkapi data yang bertanda bintang (*)!');
        return;
    }

    const originalBtnText = placeOrderBtn.innerText;
    placeOrderBtn.innerText = 'Memproses...';
    placeOrderBtn.disabled = true;

    // 3. Siapkan daftar pesanan
    let orderDetails = '';
    let total = 0;
    cart.forEach((item, index) => {
        orderDetails += `${index + 1}. ${item.title} (Rp ${item.price.toLocaleString('id-ID')})\n`;
        total += item.price;
    });

    const selectedPayment = document.querySelector('input[name="payment"]:checked').nextElementSibling.innerText;

    const emailData = {
        _subject: `Pesanan Baru dari ${firstName} ${lastName}`,
        _captcha: "false",
        Nama: `${firstName} ${lastName}`,
        Email: email,
        Telepon: phone,
        Alamat: `${address}, ${city}`,
        Catatan: notes,
        Pesanan: orderDetails,
        Total: `Rp ${total.toLocaleString('id-ID')}`,
        Metode_Pembayaran: selectedPayment
    };

    // 6. ALAMAT EMAIL ANDA
    const targetEmail = "nabilanam090807@gmail.com"; 

    // 7. Kirim pesanan menggunakan Form
    const form = document.createElement('form');
    form.action = `https://formsubmit.co/${targetEmail}`;
    form.method = "POST";
    form.target = "_blank"; 

    for (const key in emailData) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = emailData[key];
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    placeOrderBtn.innerText = originalBtnText;
    placeOrderBtn.disabled = false;

    // 8. Tampilkan notifikasi sukses
    cart = [];
    updateCartBadge();
    checkoutModal.style.display = 'none';
    successModal.style.display = 'block';
});

// Payment Method Toggle
const paymentRadios = document.querySelectorAll('input[name="payment"]');
paymentRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        document.querySelectorAll('.payment-method').forEach(method => method.classList.remove('active'));
        if (e.target.checked) {
            e.target.closest('.payment-method').classList.add('active');
        }
    });
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
