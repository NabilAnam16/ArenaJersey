const products = [
    {
        id: 1,
        title: "Jersey Arsenal 2000-2001 Away",
        price: 1600000,
        image: "arsenal_dreamcast.jpg"
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
let pollingInterval = null;

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
            <img src="${product.image}" alt="${product.title}" class="product-image">
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

// Success Modal Logic (Gaya lama fallback jika tombol diklik manual)
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
    if (event.target === document.getElementById('payment-waiting-overlay')) {
        // Jangan tutup overlay pembayaran saat klik luar demi konsistensi polling
    }
    if (event.target === document.getElementById('payment-success-overlay')) {
        document.getElementById('payment-success-overlay').style.display = 'none';
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

// Logika Pembayaran Midtrans Snap
placeOrderBtn.addEventListener('click', async () => {
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
    placeOrderBtn.innerText = 'Menghubungkan Midtrans...';
    placeOrderBtn.disabled = true;

    // 3. Hitung total harga & siapkan item pesanan
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });

    const orderId = `AJ-${Date.now()}`; // Generate Order ID unik

    const customerData = {
        firstName: firstName,
        lastName: lastName,
        email: email || `${phone}@arenajersey.com`, // Email dummy jika kosong
        phone: phone,
        address: address,
        city: city
    };

    try {
        // 4. Panggil serverless function untuk mendapatkan snap token
        const response = await fetch('/api/create-transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: orderId,
                gross_amount: total,
                customer: customerData,
                items: cart
            })
        });

        const data = await response.json();

        if (data.error) {
            alert(`Gagal membuat transaksi: ${data.error}`);
            placeOrderBtn.innerText = originalBtnText;
            placeOrderBtn.disabled = false;
            return;
        }

        const snapToken = data.snap_token;

        // 5. Jalankan popup Midtrans Snap
        window.snap.pay(snapToken, {
            onSuccess: function (result) {
                console.log('Payment success:', result);
                checkoutModal.style.display = 'none';
                showSuccessOverlay(orderId, total, result.payment_type || 'Transfer/QRIS');
            },
            onPending: function (result) {
                console.log('Payment pending:', result);
                checkoutModal.style.display = 'none';
                startPolling(orderId, total);
            },
            onError: function (result) {
                console.error('Payment error:', result);
                alert('Pembayaran gagal! Silakan coba lagi.');
                placeOrderBtn.innerText = originalBtnText;
                placeOrderBtn.disabled = false;
            },
            onClose: function () {
                console.log('Payment popup closed');
                alert('Anda menutup halaman pembayaran sebelum menyelesaikan transfer.');
                placeOrderBtn.innerText = originalBtnText;
                placeOrderBtn.disabled = false;
            }
        });

    } catch (error) {
        console.error('Checkout error:', error);
        alert('Terjadi kesalahan koneksi saat menghubungi server pembayaran.');
        placeOrderBtn.innerText = originalBtnText;
        placeOrderBtn.disabled = false;
    }
});

// Polling status pembayaran
const startPolling = (orderId, total) => {
    stopPolling(); // Hentikan polling yang berjalan sebelumnya (jika ada)
    
    document.getElementById('waiting-order-id').innerText = orderId;
    document.getElementById('waiting-total-price').innerText = formatRupiah(total);
    document.getElementById('payment-waiting-overlay').style.display = 'flex';

    pollingInterval = setInterval(async () => {
        try {
            const response = await fetch(`/api/check-status?order_id=${orderId}`);
            const data = await response.json();
            
            if (data.isPaid) {
                stopPolling();
                showSuccessOverlay(orderId, total, data.payment_type || 'Transfer/QRIS');
            } else if (data.status === 'expire' || data.status === 'cancel' || data.status === 'deny') {
                stopPolling();
                alert('Transaksi kedaluwarsa atau dibatalkan.');
                document.getElementById('payment-waiting-overlay').style.display = 'none';
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
        }
    }, 5000); // Cek status setiap 5 detik
};

const stopPolling = () => {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
};

// Menampilkan Overlay Sukses Pembayaran Otomatis
const showSuccessOverlay = (orderId, total, paymentType) => {
    // Reset keranjang belanja
    cart = [];
    updateCartBadge();
    
    document.getElementById('payment-waiting-overlay').style.display = 'none';
    
    document.getElementById('success-order-id').innerText = orderId;
    document.getElementById('success-total-price').innerText = formatRupiah(total);
    document.getElementById('success-payment-type').innerText = paymentType;
    document.getElementById('payment-success-overlay').style.display = 'flex';
};

// Event listener untuk tombol-tombol overlay pembayaran baru
document.getElementById('success-done-btn').addEventListener('click', () => {
    document.getElementById('payment-success-overlay').style.display = 'none';
});

document.getElementById('cancel-payment-btn').addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin menutup halaman pembayaran? Polling status pembayaran otomatis akan dihentikan.')) {
        stopPolling();
        document.getElementById('payment-waiting-overlay').style.display = 'none';
    }
});

document.getElementById('check-payment-btn').addEventListener('click', async () => {
    const orderId = document.getElementById('waiting-order-id').innerText;
    const totalRaw = document.getElementById('waiting-total-price').innerText;
    
    const checkBtn = document.getElementById('check-payment-btn');
    const originalHTML = checkBtn.innerHTML;
    
    checkBtn.disabled = true;
    checkBtn.innerHTML = 'Memeriksa... <i class="fa-solid fa-spinner fa-spin"></i>';
    
    try {
        const response = await fetch(`/api/check-status?order_id=${orderId}`);
        const data = await response.json();
        
        if (data.isPaid) {
            stopPolling();
            // Ekstrak angka gross_amount dari respon Midtrans
            showSuccessOverlay(orderId, Number(data.gross_amount), data.payment_type || 'Transfer/QRIS');
        } else {
            alert(`Status pembayaran saat ini: ${data.status || 'Pending'}. Silakan selesaikan pembayaran terlebih dahulu.`);
        }
    } catch (error) {
        console.error(error);
        alert('Gagal mengecek status pembayaran. Silakan coba lagi.');
    } finally {
        checkBtn.disabled = false;
        checkBtn.innerHTML = originalHTML;
    }
});

// Payment Method Toggle (Ditinggalkan untuk estetika, logika utama digantikan oleh Midtrans Snap)
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
