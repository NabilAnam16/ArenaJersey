const products = [
    {
        id: 1,
        title: "Jersey Arsenal 2000-2001 Away",
        price: 1600000,
        image: "arsenal_dreamcast.jpg",
        images: ["arsenal_dreamcast.jpg", "arsenal_bergkamp_back.jpg"],
        description: "Jersey klasik Arsenal musim 2000-2001 Away. Dikenal dengan sponsor Dreamcast. Terdapat sablon nama BERGKAMP dan nomor punggung 10 di bagian belakang."
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

        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image" onclick="openProductDetail(${product.id})" style="cursor: pointer;">
            <div class="product-info">
                <div class="product-title" onclick="openProductDetail(${product.id})" style="cursor: pointer;">${product.title}</div>
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

    // Smooth scroll to top slightly for feedback or just alert
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

// Checkout Modal Logic
const checkoutModal = document.getElementById('checkout-page-modal');
const closeCheckoutBtn = document.querySelector('.close-checkout-btn');
const placeOrderBtn = document.getElementById('place-order-btn-new');

// Product Detail Logic
const detailModal = document.getElementById('product-detail-modal');
const closeDetailBtn = document.querySelector('.close-detail-btn');
let currentDetailProductId = null;

const openProductDetail = (productId) => {
    const product = products.find(p => p.id === productId);
    currentDetailProductId = productId;
    
    document.getElementById('detail-title').innerText = product.title;
    document.getElementById('detail-price').innerText = formatRupiah(product.price);
    document.getElementById('detail-desc-text').innerText = product.description || "Tidak ada deskripsi detail untuk produk ini.";
    
    const mainImg = document.getElementById('detail-main-img');
    mainImg.src = product.image;
    
    const thumbnailsContainer = document.getElementById('detail-thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    // Setup thumbnails
    const allImages = product.images || [product.image];
    allImages.forEach((imgSrc) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.style.cssText = "width: 70px; height: 70px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid transparent; transition: 0.2s;";
        if (imgSrc === product.image) thumb.style.borderColor = "var(--green-accent)";
        
        thumb.onclick = () => {
            mainImg.src = imgSrc;
            Array.from(thumbnailsContainer.children).forEach(t => t.style.borderColor = "transparent");
            thumb.style.borderColor = "var(--green-accent)";
        };
        thumbnailsContainer.appendChild(thumb);
    });
    
    detailModal.style.display = 'block';
};

document.getElementById('detail-add-to-cart').addEventListener('click', () => {
    if (currentDetailProductId !== null) {
        addToCart(currentDetailProductId);
        detailModal.style.display = 'none';
    }
});

closeDetailBtn.addEventListener('click', () => {
    detailModal.style.display = 'none';
});

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
    const checkoutOrderItemsContainer = document.getElementById('checkout-order-items-new');
    const checkoutSubtotalEl = document.getElementById('checkout-subtotal-new');
    const checkoutTotalEl = document.getElementById('checkout-total-new');

    checkoutOrderItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const row = document.createElement('div');
        row.classList.add('summary-item-row');
        row.innerHTML = `
            <div class="summary-item-left">
                <img src="${item.image}" class="summary-item-img" alt="${item.title}">
                <div class="summary-item-details">
                    <span class="summary-item-title">${item.title}</span>
                    <span class="summary-item-qty">x 1</span>
                </div>
            </div>
            <div class="summary-item-price">${formatRupiah(item.price)}</div>
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
    if (event.target === detailModal) {
        detailModal.style.display = 'none';
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        modal.style.display = 'none';
        renderCheckoutItems();
        checkoutModal.style.display = 'block';
        loadSavedAddress(); // Load address when opening checkout
    } else {
        alert('Keranjang belanja masih kosong!');
    }
});

// ============================================
// MIDTRANS PAYMENT INTEGRATION
// ============================================

let currentSnapToken = null;
let currentOrderId = null;
let paymentPollingInterval = null;

// Fungsi membuat Order ID unik
const generateOrderId = () => {
    const now = new Date();
    const ts = now.getFullYear().toString() +
        String(now.getMonth()+1).padStart(2,'0') +
        String(now.getDate()).padStart(2,'0') +
        String(now.getHours()).padStart(2,'0') +
        String(now.getMinutes()).padStart(2,'0') +
        String(now.getSeconds()).padStart(2,'0');
    return `ARENA-${ts}-${Math.floor(Math.random()*1000)}`;
};

// Fungsi tampilkan overlay menunggu pembayaran
const showPaymentWaiting = (orderId, total) => {
    document.getElementById('waiting-order-id').innerText = orderId;
    document.getElementById('waiting-total').innerText = formatRupiah(total);
    document.getElementById('payment-waiting-overlay').style.display = 'flex';
    checkoutModal.style.display = 'none';
};

// Fungsi tampilkan overlay sukses
const showPaymentSuccess = (orderId) => {
    stopPolling();
    document.getElementById('payment-waiting-overlay').style.display = 'none';
    document.getElementById('success-order-id').innerText = `Order ID: ${orderId}`;
    document.getElementById('payment-success-overlay').style.display = 'flex';
    cart = [];
    updateCartBadge();
};

// Fungsi mulai polling status pembayaran (cek setiap 4 detik)
const startPolling = (orderId) => {
    stopPolling(); // Pastikan tidak ada polling ganda
    paymentPollingInterval = setInterval(async () => {
        try {
            const res = await fetch(`/api/check-status?order_id=${orderId}`);
            const data = await res.json();
            if (data.isPaid) {
                showPaymentSuccess(orderId);
            } else if (data.isFailed) {
                stopPolling();
                document.getElementById('payment-waiting-overlay').style.display = 'none';
                alert('Pembayaran dibatalkan atau gagal. Silakan coba lagi.');
                checkoutModal.style.display = 'block';
            }
        } catch (err) {
            console.warn('Polling error (akan coba lagi):', err.message);
        }
    }, 4000); // Cek setiap 4 detik
};

// Fungsi hentikan polling
const stopPolling = () => {
    if (paymentPollingInterval) {
        clearInterval(paymentPollingInterval);
        paymentPollingInterval = null;
    }
};

// Tombol Buka Ulang Pembayaran
document.getElementById('btn-reopen-payment').addEventListener('click', () => {
    if (currentSnapToken) {
        window.snap.pay(currentSnapToken, {
            onSuccess: (result) => showPaymentSuccess(result.order_id || currentOrderId),
            onPending: () => console.log('Menunggu pembayaran...'),
            onError: () => alert('Terjadi kesalahan pada pembayaran.'),
            onClose: () => console.log('Popup ditutup, polling tetap berjalan.')
        });
    }
});

// Tombol Batalkan Pembayaran
document.getElementById('btn-cancel-payment').addEventListener('click', () => {
    stopPolling();
    document.getElementById('payment-waiting-overlay').style.display = 'none';
    checkoutModal.style.display = 'block';
    placeOrderBtn.innerText = '🔒 Bayar Sekarang';
    placeOrderBtn.disabled = false;
});

// Tombol Kembali ke Beranda (setelah sukses)
document.getElementById('btn-back-home').addEventListener('click', () => {
    document.getElementById('payment-success-overlay').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== TOMBOL BAYAR SEKARANG =====
placeOrderBtn.addEventListener('click', async () => {
    // 1. Ambil data dari form
    const firstName = document.getElementById('checkout-firstname').value.trim();
    const lastName = document.getElementById('checkout-lastname').value.trim();
    const address = document.getElementById('checkout-address1').value.trim();
    const city = document.getElementById('checkout-city').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const email = document.getElementById('checkout-email').value.trim();
    const notes = document.getElementById('checkout-notes').value.trim();

    const emailInputEl = document.getElementById('checkout-email');
    const phoneInputEl = document.getElementById('checkout-phone');

    // Cek validasi error merah
    if (emailInputEl.classList.contains('error-input') || phoneInputEl.classList.contains('error-input')) {
        alert('Mohon perbaiki format Email atau Telepon yang masih salah (ditandai merah).');
        return;
    }

    // Validasi field wajib
    if (!firstName || !address || !city || !phone || !email) {
        alert('Mohon lengkapi semua data yang bertanda bintang (*) terlebih dahulu!');
        return;
    }

    // Simpan alamat jika dicentang
    const saveAddressCheckbox = document.getElementById('checkout-save-address');
    if (saveAddressCheckbox && saveAddressCheckbox.checked) {
        localStorage.setItem('savedCheckoutAddress', JSON.stringify({
            firstname: firstName, lastname: lastName, email, phone,
            address1: address,
            address2: document.getElementById('checkout-address2').value.trim(),
            city, province: document.getElementById('checkout-province').value,
            zip: document.getElementById('checkout-zip').value.trim(),
            company: document.getElementById('checkout-company').value.trim()
        }));
    } else {
        localStorage.removeItem('savedCheckoutAddress');
    }

    // 2. Hitung total & siapkan item
    let total = 0;
    const items = cart.map(item => {
        total += item.price;
        return { id: String(item.id), price: item.price, quantity: 1, name: item.title };
    });

    // 3. Buat Order ID unik
    const orderId = generateOrderId();
    currentOrderId = orderId;

    // 4. Ubah tombol jadi loading
    placeOrderBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
    placeOrderBtn.disabled = true;

    try {
        // 5. Kirim request ke Vercel Serverless Function
        const response = await fetch('/api/create-transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order_id: orderId,
                gross_amount: total,
                customer: { firstName, lastName, email, phone, address, city },
                items: items
            })
        });

        const data = await response.json();

        if (!data.snap_token) {
            throw new Error(data.error || 'Gagal mendapatkan token pembayaran.');
        }

        currentSnapToken = data.snap_token;

        // 6. Tampilkan popup pembayaran Midtrans
        window.snap.pay(currentSnapToken, {
            onSuccess: (result) => {
                // Pembayaran berhasil langsung dari callback Snap
                showPaymentSuccess(result.order_id || orderId);
            },
            onPending: () => {
                // Pembayaran pending (transfer bank, dll) — mulai polling
                showPaymentWaiting(orderId, total);
                startPolling(orderId);
            },
            onError: (result) => {
                console.error('Payment error:', result);
                alert('Terjadi kesalahan saat pembayaran. Silakan coba lagi.');
                placeOrderBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Bayar Sekarang';
                placeOrderBtn.disabled = false;
            },
            onClose: () => {
                // User tutup popup, tapi mungkin sudah bayar — tetap polling
                if (currentOrderId) {
                    showPaymentWaiting(orderId, total);
                    startPolling(orderId);
                }
                placeOrderBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Bayar Sekarang';
                placeOrderBtn.disabled = false;
            }
        });

    } catch (error) {
        console.error('Checkout error:', error);
        alert(`Error: ${error.message}\n\nPastikan Server Key dan Client Key Midtrans sudah diisi dengan benar.`);
        placeOrderBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Bayar Sekarang';
        placeOrderBtn.disabled = false;
    }
});

// Payment Method Toggle (New Logic)
function selectPayment(element) {
    document.querySelectorAll('.payment-method-new').forEach(method => method.classList.remove('active'));
    element.classList.add('active');
    element.querySelector('input[type="radio"]').checked = true;
}

// === NEW FEATURES LOGIC ===

// 1. Auto-fill Postal Code Mockup
const postalLookup = {
    '12345': { province: 'DKI Jakarta', city: 'Jakarta Selatan' },
    '54321': { province: 'Jawa Barat', city: 'Bandung' },
    '50123': { province: 'Jawa Tengah', city: 'Semarang' }
};

const zipInput = document.getElementById('checkout-zip');
const provinceSelect = document.getElementById('checkout-province');
const cityInput = document.getElementById('checkout-city');

if (zipInput) {
    zipInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if(val.length === 5 && postalLookup[val]) {
            provinceSelect.value = postalLookup[val].province;
            cityInput.value = postalLookup[val].city;
            
            cityInput.style.backgroundColor = '#e8f5e9';
            provinceSelect.style.backgroundColor = '#e8f5e9';
            setTimeout(() => {
                cityInput.style.backgroundColor = '';
                provinceSelect.style.backgroundColor = '';
            }, 800);
        }
    });
}

// 2. Real-time Validation
const emailInput = document.getElementById('checkout-email');
const phoneInput = document.getElementById('checkout-phone');

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

if (emailInput) {
    emailInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (val.length > 0 && !validateEmail(val)) {
            emailInput.classList.add('error-input');
            emailInput.parentElement.classList.add('show-error');
        } else {
            emailInput.classList.remove('error-input');
            emailInput.parentElement.classList.remove('show-error');
        }
    });
}

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        const isValid = /^\d+$/.test(val) && val.length >= 10;
        if (val.length > 0 && !isValid) {
            phoneInput.classList.add('error-input');
            phoneInput.parentElement.classList.add('show-error');
        } else {
            phoneInput.classList.remove('error-input');
            phoneInput.parentElement.classList.remove('show-error');
        }
    });
}

// 3. Simpan Alamat (Local Storage)
const loadSavedAddress = () => {
    const saved = JSON.parse(localStorage.getItem('savedCheckoutAddress'));
    if (saved) {
        if(document.getElementById('checkout-firstname')) document.getElementById('checkout-firstname').value = saved.firstname || '';
        if(document.getElementById('checkout-lastname')) document.getElementById('checkout-lastname').value = saved.lastname || '';
        if(document.getElementById('checkout-email')) document.getElementById('checkout-email').value = saved.email || '';
        if(document.getElementById('checkout-phone')) document.getElementById('checkout-phone').value = saved.phone || '';
        if(document.getElementById('checkout-address1')) document.getElementById('checkout-address1').value = saved.address1 || '';
        if(document.getElementById('checkout-address2')) document.getElementById('checkout-address2').value = saved.address2 || '';
        if(document.getElementById('checkout-city')) document.getElementById('checkout-city').value = saved.city || '';
        if(document.getElementById('checkout-province')) document.getElementById('checkout-province').value = saved.province || '';
        if(document.getElementById('checkout-zip')) document.getElementById('checkout-zip').value = saved.zip || '';
        if(document.getElementById('checkout-company')) document.getElementById('checkout-company').value = saved.company || '';
        
        const cb = document.getElementById('checkout-save-address');
        if(cb) cb.checked = true;
    }
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
