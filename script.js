// ============================================================
//  ARENA JERSEY — script.js (Bilingual: Indonesia / English)
// ============================================================

// ---- Hero Slideshow ----
let currentSlide = 0;
const SLIDE_INTERVAL = 4000; // ganti angka (ms) untuk ubah kecepatan, default 4 detik

const goToSlide = (index) => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slide-dot');
    if (!slides.length) return;

    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
};

const startSlideshow = () => {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;
    setInterval(() => {
        goToSlide(currentSlide + 1);
    }, SLIDE_INTERVAL);
};

// ---- Terjemahan / Translations ----
const translations = {
    id: {
        // Navbar
        langBtn: "EN",
        // Hero
        heroTitle: `Beli jersey sepak bola <span class="highlight-text">ORIGINAL</span><br>dari klub favoritmu`,
        buyNow: "Beli Sekarang",
        marqueeText: "JerseyBola &nbsp;&nbsp;&nbsp;&nbsp; Diskon akhir tahun 30% &nbsp;&nbsp;&nbsp;&nbsp; JerseyBola &nbsp;&nbsp;&nbsp;&nbsp; Diskon akhir tahun 30% &nbsp;&nbsp;&nbsp;&nbsp; JerseyBola &nbsp;&nbsp;&nbsp;&nbsp; Diskon akhir tahun 30% &nbsp;&nbsp;&nbsp;&nbsp; JerseyBola &nbsp;&nbsp;&nbsp;&nbsp; Diskon akhir tahun 30%",
        // Section
        collections: "KOLEKSI KAMI",
        // Cart
        yourCart: "Keranjang Kamu",
        cartEmpty: "Keranjang belanja kamu masih kosong.",
        total: "Total:",
        checkout: "Checkout",
        addedToCart: (title) => `🛒 "${title}" berhasil ditambahkan ke keranjang!`,
        cartEmptyAlert: "Keranjang belanja masih kosong!",
        addToCartTitle: "Tambah ke Keranjang",
        // Checkout form
        billingDetails: "Detail Pengiriman",
        firstName: "Nama Depan",
        lastName: "Nama Belakang",
        companyName: "Nama Perusahaan (opsional)",
        country: "Negara / Wilayah",
        streetAddress: "Alamat Jalan",
        streetPlaceholder: "Nomor rumah dan nama jalan",
        aptPlaceholder: "Apartemen, suite, unit, dll. (opsional)",
        city: "Kota",
        province: "Provinsi",
        postcode: "Kode Pos",
        phone: "Telepon",
        email: "Alamat Email",
        orderNotes: "Catatan Pesanan (opsional)",
        orderNotesPh: "Catatan tentang pesananmu, mis. catatan khusus pengiriman.",
        // Order summary
        yourOrder: "Pesananmu",
        product: "Produk",
        subtotal: "Subtotal",
        couponText: "Punya kupon? ",
        couponLink: "Klik di sini untuk memasukkan kode kuponmu",
        paymentMethod: "Metode Pembayaran",
        payQris: "QRIS (Gopay, OVO, Dana, dll)",
        qrisDesc: "Silakan scan QR Code di bawah ini untuk melakukan pembayaran:",
        payMandiri: "Transfer Bank (Mandiri)",
        mandiriDesc: `Lakukan transfer ke rekening Mandiri berikut:<br><strong>No. Rekening: 1090022196083</strong><br>(Simpan bukti transfer Anda untuk proses konfirmasi pesanan)`,
        privacyText: `Data pribadi Anda akan digunakan untuk memproses pesanan Anda dan mendukung pengalaman Anda di situs ini, serta untuk tujuan lain yang dijelaskan dalam <a href="#">kebijakan privasi</a> kami.`,
        placeOrder: "Buat Pesanan",
        // Validation
        fillRequired: "Mohon lengkapi data yang bertanda bintang (*)!",
        processing: "Memproses...",
        // Success modal
        checkoutSuccess: "Checkout Berhasil!",
        successMsg: "Terima kasih telah berbelanja di Arena Jersey. Pesanan Anda telah kami terima dan sedang diproses.",
        backHome: "Kembali ke Beranda",
        // Payment overlays
        waitingTitle: "Menunggu Pembayaran",
        waitingSubtitle: "Selesaikan pembayaran Anda",
        orderId: "Order ID",
        totalAmount: "Total Pembayaran",
        checkPayment: "Cek Status Pembayaran",
        cancelPayment: "Batalkan",
        paymentSuccess: "Pembayaran Berhasil!",
        paymentSuccessMsg: "Pesanan Anda telah dikonfirmasi. Kami akan segera memproses pesanan Anda.",
        paymentType: "Metode Pembayaran",
        done: "Selesai",
        connectingMidtrans: "Menghubungkan Midtrans...",
        checkingStatus: "Memeriksa...",
        failedTransaction: (err) => `Gagal membuat transaksi: ${err}`,
        paymentFailed: "Pembayaran gagal! Silakan coba lagi.",
        popupClosed: "Anda menutup halaman pembayaran sebelum menyelesaikan transfer.",
        connectionError: "Terjadi kesalahan koneksi saat menghubungi server pembayaran.",
        statusPending: (status) => `Status pembayaran saat ini: ${status || 'Pending'}. Silakan selesaikan pembayaran terlebih dahulu.`,
        checkFailed: "Gagal mengecek status pembayaran. Silakan coba lagi.",
        expiredMsg: "Transaksi kedaluwarsa atau dibatalkan.",
        cancelConfirm: "Apakah Anda yakin ingin menutup halaman pembayaran? Polling status pembayaran otomatis akan dihentikan.",
    },
    en: {
        // Navbar
        langBtn: "ID",
        // Hero
        heroTitle: `Buy the <span class="highlight-text">ORIGINAL</span> soccer jersey<br>from your favorite club`,
        buyNow: "Buy Now",
        marqueeText: "JerseyBola &nbsp;&nbsp;&nbsp;&nbsp; End of year 30% discount &nbsp;&nbsp;&nbsp;&nbsp; JerseyBola &nbsp;&nbsp;&nbsp;&nbsp; End of year 30% discount &nbsp;&nbsp;&nbsp;&nbsp; JerseyBola &nbsp;&nbsp;&nbsp;&nbsp; End of year 30% discount &nbsp;&nbsp;&nbsp;&nbsp; JerseyBola &nbsp;&nbsp;&nbsp;&nbsp; End of year 30% discount",
        // Section
        collections: "OUR COLLECTIONS",
        // Cart
        yourCart: "Your Cart",
        cartEmpty: "Your shopping cart is empty.",
        total: "Total:",
        checkout: "Checkout",
        addedToCart: (title) => `🛒 "${title}" has been added to your cart!`,
        cartEmptyAlert: "Your cart is empty!",
        addToCartTitle: "Add to Cart",
        // Checkout form
        billingDetails: "Billing Details",
        firstName: "First Name",
        lastName: "Last Name",
        companyName: "Company Name (optional)",
        country: "Country / Region",
        streetAddress: "Street Address",
        streetPlaceholder: "House number and street name",
        aptPlaceholder: "Apartment, suite, unit, etc. (optional)",
        city: "Town / City",
        province: "Province",
        postcode: "Postcode / ZIP",
        phone: "Phone",
        email: "Email Address",
        orderNotes: "Order Notes (optional)",
        orderNotesPh: "Notes about your order, e.g. special notes for delivery.",
        // Order summary
        yourOrder: "Your Order",
        product: "Product",
        subtotal: "Subtotal",
        couponText: "Have a coupon? ",
        couponLink: "Click here to enter your coupon code",
        paymentMethod: "Payment Method",
        payQris: "QRIS (Gopay, OVO, Dana, etc.)",
        qrisDesc: "Please scan the QR Code below to complete your payment:",
        payMandiri: "Bank Transfer (Mandiri)",
        mandiriDesc: `Transfer to the following Mandiri account:<br><strong>Account No.: 1090022196083</strong><br>(Keep your transfer receipt for order confirmation)`,
        privacyText: `Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#">privacy policy</a>.`,
        placeOrder: "Place Order",
        // Validation
        fillRequired: "Please fill in all required fields (*)!",
        processing: "Processing...",
        // Success modal
        checkoutSuccess: "Checkout Successful!",
        successMsg: "Thank you for shopping at Arena Jersey. Your order has been received and is being processed.",
        backHome: "Back to Home",
        // Payment overlays
        waitingTitle: "Waiting for Payment",
        waitingSubtitle: "Please complete your payment",
        orderId: "Order ID",
        totalAmount: "Total Amount",
        checkPayment: "Check Payment Status",
        cancelPayment: "Cancel",
        paymentSuccess: "Payment Successful!",
        paymentSuccessMsg: "Your order has been confirmed. We will process your order shortly.",
        paymentType: "Payment Method",
        done: "Done",
        connectingMidtrans: "Connecting to Midtrans...",
        checkingStatus: "Checking...",
        failedTransaction: (err) => `Failed to create transaction: ${err}`,
        paymentFailed: "Payment failed! Please try again.",
        popupClosed: "You closed the payment page before completing the transfer.",
        connectionError: "A connection error occurred while contacting the payment server.",
        statusPending: (status) => `Current payment status: ${status || 'Pending'}. Please complete your payment first.`,
        checkFailed: "Failed to check payment status. Please try again.",
        expiredMsg: "Transaction expired or cancelled.",
        cancelConfirm: "Are you sure you want to close the payment page? Automatic payment status polling will be stopped.",
    }
};

// ---- State ----
let currentLang = 'id';
const t = () => translations[currentLang];

const products = [
    {
        id: 1,
        title: "Jersey Arsenal 2000-2001 Away",
        price: 1600000,
        image: "arsenal_dreamcast.jpg"
    },
    {
        id: 2,
        title: "Jersey Jerman 2014",
        price: 245000,
        image: "Jersey_Jerman_2014.jpg"
    },
    {
        id: 3,
        title: "Jersey Liverpool 2021-2022",
        price: 150000,
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        title: "Jersey Jepang 2002",
        price: 350000,
        image: "https://images.unsplash.com/photo-1556822284-ce444005b5db?auto=format&fit=crop&q=80&w=400"
    }
];

let cart = [];
let pollingInterval = null;

// ---- Format Currency ----
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

// ---- Apply Translations to the DOM ----
const applyTranslations = () => {
    const tr = t();

    // Lang toggle button
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) langBtn.innerText = tr.langBtn;

    // Hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.innerHTML = tr.heroTitle;

    const buyNowBtn = document.querySelector('.buy-now-btn');
    if (buyNowBtn) buyNowBtn.innerHTML = `${tr.buyNow} <i class="fa-solid fa-bag-shopping"></i>`;

    const marquee = document.querySelector('.marquee span');
    if (marquee) marquee.innerHTML = tr.marqueeText;

    // Section header
    const sectionH2 = document.querySelector('.section-header h2');
    if (sectionH2) sectionH2.innerText = tr.collections;

    // Cart modal
    const cartModalH2 = document.querySelector('#cart-modal .modal-content h2');
    if (cartModalH2) cartModalH2.innerHTML = `${tr.yourCart} <i class="fa-solid fa-bag-shopping" style="color: var(--green-accent);"></i>`;

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) checkoutBtn.innerText = tr.checkout;

    // Checkout modal
    const billingH3 = document.querySelector('.billing-details h3');
    if (billingH3) billingH3.innerText = tr.billingDetails;

    // Form labels
    const setLabel = (selector, text) => {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = text;
    };
    setLabel('label[for="checkout-firstname"]', `${tr.firstName} <span>*</span>`);
    setLabel('label[for="checkout-lastname"]', `${tr.lastName} <span>*</span>`);

    const companyLabel = document.querySelector('#checkout-company')?.closest('.form-group')?.querySelector('label');
    if (companyLabel) companyLabel.innerText = tr.companyName;

    setLabel('label[for="checkout-country"]', `${tr.country} <span>*</span>`);
    setLabel('label[for="checkout-address1"]', `${tr.streetAddress} <span>*</span>`);

    const addr1 = document.getElementById('checkout-address1');
    if (addr1) addr1.placeholder = tr.streetPlaceholder;
    const addr2 = document.getElementById('checkout-address2');
    if (addr2) addr2.placeholder = tr.aptPlaceholder;

    setLabel('label[for="checkout-city"]', `${tr.city} <span>*</span>`);
    setLabel('label[for="checkout-province"]', `${tr.province} <span>*</span>`);
    setLabel('label[for="checkout-zip"]', `${tr.postcode} <span>*</span>`);
    setLabel('label[for="checkout-phone"]', `${tr.phone} <span>*</span>`);
    setLabel('label[for="checkout-email"]', `${tr.email} <span>*</span>`);

    const notesLabel = document.querySelector('#checkout-notes')?.closest('.form-group')?.querySelector('label');
    if (notesLabel) notesLabel.innerText = tr.orderNotes;
    const notesTA = document.getElementById('checkout-notes');
    if (notesTA) notesTA.placeholder = tr.orderNotesPh;

    // Order summary
    const yourOrderH3 = document.querySelector('.order-box h3');
    if (yourOrderH3) yourOrderH3.innerText = tr.yourOrder;

    const orderTableHeader = document.querySelector('.order-table-header');
    if (orderTableHeader) orderTableHeader.innerHTML = `<span>${tr.product}</span><span>${tr.subtotal}</span>`;

    const couponBox = document.querySelector('.coupon-box');
    if (couponBox) couponBox.innerHTML = `${tr.couponText}<a href="#">${tr.couponLink}</a>`;

    const paymentBoxH3 = document.querySelector('.payment-box h3');
    if (paymentBoxH3) paymentBoxH3.innerText = tr.paymentMethod;

    const qrisLabel = document.querySelector('label[for="pay-qris"]');
    if (qrisLabel) qrisLabel.innerText = tr.payQris;

    const qrisDesc = document.querySelector('#pay-qris')?.closest('.payment-method')?.querySelector('.payment-desc');
    if (qrisDesc) qrisDesc.innerHTML = `${tr.qrisDesc}<br><img src="qris.jpg" alt="Scan QRIS" style="max-width:250px;width:100%;height:auto;margin-top:15px;border-radius:8px;border:1px solid #ccc;box-shadow:0 4px 10px rgba(0,0,0,0.1);">`;

    const mandiriLabel = document.querySelector('label[for="pay-mandiri"]');
    if (mandiriLabel) mandiriLabel.innerText = tr.payMandiri;

    const mandiriDesc = document.querySelector('#pay-mandiri')?.closest('.payment-method')?.querySelector('.payment-desc');
    if (mandiriDesc) mandiriDesc.innerHTML = tr.mandiriDesc;

    const privacyText = document.querySelector('.privacy-text');
    if (privacyText) privacyText.innerHTML = tr.privacyText;

    const placeOrderBtn = document.getElementById('place-order-btn');
    if (placeOrderBtn && !placeOrderBtn.disabled) placeOrderBtn.innerText = tr.placeOrder;

    // Success modal
    const successH2 = document.querySelector('#success-modal h2');
    if (successH2) successH2.innerText = tr.checkoutSuccess;

    const successP = document.querySelector('#success-modal p');
    if (successP) successP.innerText = tr.successMsg;

    const closeSuccessBtn = document.getElementById('close-success-btn');
    if (closeSuccessBtn) closeSuccessBtn.innerText = tr.backHome;

    // Payment overlays
    const waitingTitle = document.querySelector('.payment-waiting-box h3');
    if (waitingTitle) waitingTitle.innerText = tr.waitingTitle;

    const waitingSubtitle = document.querySelector('.payment-waiting-box p');
    if (waitingSubtitle) waitingSubtitle.innerText = tr.waitingSubtitle;

    const waitingOrderLabel = document.querySelector('[data-label="order-id"]');
    if (waitingOrderLabel) waitingOrderLabel.innerText = tr.orderId;

    const waitingTotalLabel = document.querySelector('[data-label="total-amount"]');
    if (waitingTotalLabel) waitingTotalLabel.innerText = tr.totalAmount;

    const checkPaymentBtn = document.getElementById('check-payment-btn');
    if (checkPaymentBtn && !checkPaymentBtn.disabled) checkPaymentBtn.innerHTML = `${tr.checkPayment} <i class="fa-solid fa-rotate-right"></i>`;

    const cancelPaymentBtn = document.getElementById('cancel-payment-btn');
    if (cancelPaymentBtn) cancelPaymentBtn.innerText = tr.cancelPayment;

    const successOverlayTitle = document.querySelector('.payment-success-box h3');
    if (successOverlayTitle) successOverlayTitle.innerText = tr.paymentSuccess;

    const successOverlayMsg = document.querySelector('.payment-success-box p');
    if (successOverlayMsg) successOverlayMsg.innerText = tr.paymentSuccessMsg;

    const successPayTypeLabel = document.querySelector('[data-label="payment-type"]');
    if (successPayTypeLabel) successPayTypeLabel.innerText = tr.paymentType;

    const successOrderIdLabel = document.querySelector('[data-label="success-order-id"]');
    if (successOrderIdLabel) successOrderIdLabel.innerText = tr.orderId;

    const successTotalLabel = document.querySelector('[data-label="success-total"]');
    if (successTotalLabel) successTotalLabel.innerText = tr.totalAmount;

    const successDoneBtn = document.getElementById('success-done-btn');
    if (successDoneBtn) successDoneBtn.innerText = tr.done;

    // Re-render products to update "Add to Cart" tooltip
    renderProducts();
    // Re-render cart if open
    const cartModal = document.getElementById('cart-modal');
    if (cartModal && cartModal.style.display === 'block') renderCartItems();

    // Total label in cart
    const totalLabel = document.querySelector('.cart-total h3');
    if (totalLabel) {
        const totalSpan = document.getElementById('total-price');
        if (totalSpan) totalLabel.innerHTML = `${tr.total} <span id="total-price">${totalSpan.innerText}</span>`;
    }
};

// ---- Toggle Language ----
const toggleLanguage = () => {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    document.documentElement.lang = currentLang;
    applyTranslations();
};

// ---- Render Products ----
const renderProducts = () => {
    const productList = document.getElementById('product-list');
    if (!productList) return;
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
                    <button class="btn-yellow-cart" onclick="addToCart(${product.id})" title="${t().addToCartTitle}">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;

        productList.appendChild(productEl);
    });
};

// ---- Add to Cart ----
const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartBadge();
    alert(t().addedToCart(product.title));
};

// ---- Remove from Cart ----
const removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartBadge();
    renderCartItems();
};

// ---- Update Cart Badge ----
const updateCartBadge = () => {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.innerText = cart.length;
};

// ---- Modal References ----
const modal = document.getElementById('cart-modal');
const cartIcon = document.getElementById('cart-icon');
const closeBtn = document.querySelector('.close-btn');
const checkoutBtn = document.querySelector('.checkout-btn');

const checkoutModal = document.getElementById('checkout-page-modal');
const closeCheckoutBtn = document.querySelector('.close-checkout-btn');
const placeOrderBtn = document.getElementById('place-order-btn');

// ---- Render Cart Items ----
const renderCartItems = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align:center; padding: 30px 0; color: #999;">${t().cartEmpty}</p>`;
        if (totalPriceEl) totalPriceEl.innerText = formatRupiah(0);
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

    if (totalPriceEl) totalPriceEl.innerText = formatRupiah(total);
};

// ---- Render Checkout Items ----
const renderCheckoutItems = () => {
    const checkoutOrderItemsContainer = document.getElementById('checkout-order-items');
    const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
    const checkoutTotalEl = document.getElementById('checkout-total');
    if (!checkoutOrderItemsContainer) return;

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

    if (checkoutSubtotalEl) checkoutSubtotalEl.innerText = formatRupiah(total);
    if (checkoutTotalEl) checkoutTotalEl.innerText = formatRupiah(total + ongkirAmount);
};

// ---- Event Listeners ----
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        renderCartItems();
        modal.style.display = 'block';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });
}

// Success Modal
const successModal = document.getElementById('success-modal');
const closeSuccessBtn = document.getElementById('close-success-btn');
if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
    });
}

window.addEventListener('click', (event) => {
    if (event.target === modal) modal.style.display = 'none';
    if (event.target === checkoutModal) checkoutModal.style.display = 'none';
    if (event.target === successModal) successModal.style.display = 'none';
    if (event.target === document.getElementById('payment-success-overlay')) {
        document.getElementById('payment-success-overlay').style.display = 'none';
    }
});

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            modal.style.display = 'none';
            renderCheckoutItems();
            checkoutModal.style.display = 'block';
        } else {
            alert(t().cartEmptyAlert);
        }
    });
}

// ---- Midtrans Snap Checkout ----
if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', async () => {
        const firstName = document.getElementById('checkout-firstname').value.trim();
        const lastName = document.getElementById('checkout-lastname').value.trim();
        const address = document.getElementById('checkout-address1').value.trim();
        const city = document.getElementById('checkout-city').value.trim();
        const phone = document.getElementById('checkout-phone').value.trim();
        const email = document.getElementById('checkout-email') ? document.getElementById('checkout-email').value.trim() : "";
        const notes = document.getElementById('checkout-notes') ? document.getElementById('checkout-notes').value.trim() : "";

        if (!firstName || !address || !city || !phone) {
            alert(t().fillRequired);
            return;
        }

        const originalBtnText = placeOrderBtn.innerText;
        placeOrderBtn.innerText = t().connectingMidtrans;
        placeOrderBtn.disabled = true;

        let total = 0;
        cart.forEach(item => { total += item.price; });

        const orderId = `AJ-${Date.now()}`;

        const customerData = {
            firstName,
            lastName,
            email: email || `${phone}@arenajersey.com`,
            phone,
            address,
            city
        };

        try {
            const response = await fetch('/api/create-transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    order_id: orderId,
                    gross_amount: total,
                    customer: customerData,
                    items: cart
                })
            });

            const data = await response.json();

            if (data.error) {
                alert(t().failedTransaction(data.error));
                placeOrderBtn.innerText = t().placeOrder;
                placeOrderBtn.disabled = false;
                return;
            }

            const snapToken = data.snap_token;

            window.snap.pay(snapToken, {
                onSuccess: function (result) {
                    checkoutModal.style.display = 'none';
                    showSuccessOverlay(orderId, total, result.payment_type || 'Transfer/QRIS');
                },
                onPending: function (result) {
                    checkoutModal.style.display = 'none';
                    startPolling(orderId, total);
                },
                onError: function (result) {
                    alert(t().paymentFailed);
                    placeOrderBtn.innerText = t().placeOrder;
                    placeOrderBtn.disabled = false;
                },
                onClose: function () {
                    alert(t().popupClosed);
                    placeOrderBtn.innerText = t().placeOrder;
                    placeOrderBtn.disabled = false;
                }
            });

        } catch (error) {
            console.error('Checkout error:', error);
            alert(t().connectionError);
            placeOrderBtn.innerText = t().placeOrder;
            placeOrderBtn.disabled = false;
        }
    });
}

// ---- Polling ----
const startPolling = (orderId, total) => {
    stopPolling();

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
                alert(t().expiredMsg);
                document.getElementById('payment-waiting-overlay').style.display = 'none';
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
        }
    }, 5000);
};

const stopPolling = () => {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
};

// ---- Success Overlay ----
const showSuccessOverlay = (orderId, total, paymentType) => {
    cart = [];
    updateCartBadge();

    document.getElementById('payment-waiting-overlay').style.display = 'none';
    document.getElementById('success-order-id').innerText = orderId;
    document.getElementById('success-total-price').innerText = formatRupiah(total);
    document.getElementById('success-payment-type').innerText = paymentType;
    document.getElementById('payment-success-overlay').style.display = 'flex';
};

// ---- Overlay Buttons ----
const successDoneBtn = document.getElementById('success-done-btn');
if (successDoneBtn) {
    successDoneBtn.addEventListener('click', () => {
        document.getElementById('payment-success-overlay').style.display = 'none';
    });
}

const cancelPaymentBtn = document.getElementById('cancel-payment-btn');
if (cancelPaymentBtn) {
    cancelPaymentBtn.addEventListener('click', () => {
        if (confirm(t().cancelConfirm)) {
            stopPolling();
            document.getElementById('payment-waiting-overlay').style.display = 'none';
        }
    });
}

const checkPaymentBtn = document.getElementById('check-payment-btn');
if (checkPaymentBtn) {
    checkPaymentBtn.addEventListener('click', async () => {
        const orderId = document.getElementById('waiting-order-id').innerText;
        const originalHTML = checkPaymentBtn.innerHTML;

        checkPaymentBtn.disabled = true;
        checkPaymentBtn.innerHTML = `${t().checkingStatus} <i class="fa-solid fa-spinner fa-spin"></i>`;

        try {
            const response = await fetch(`/api/check-status?order_id=${orderId}`);
            const data = await response.json();

            if (data.isPaid) {
                stopPolling();
                showSuccessOverlay(orderId, Number(data.gross_amount), data.payment_type || 'Transfer/QRIS');
            } else {
                alert(t().statusPending(data.status));
            }
        } catch (error) {
            alert(t().checkFailed);
        } finally {
            checkPaymentBtn.disabled = false;
            checkPaymentBtn.innerHTML = originalHTML;
        }
    });
}

// ---- Payment Method Toggle ----
const paymentRadios = document.querySelectorAll('input[name="payment"]');
paymentRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        document.querySelectorAll('.payment-method').forEach(method => method.classList.remove('active'));
        if (e.target.checked) {
            e.target.closest('.payment-method').classList.add('active');
        }
    });
});

// ---- Lang Toggle Button Event ----
document.addEventListener('DOMContentLoaded', () => {
    // Tambahkan tombol bahasa ke navbar
    const navbar = document.querySelector('.navbar');
    if (navbar && !document.getElementById('lang-toggle-btn')) {
        const langBtn = document.createElement('button');
        langBtn.id = 'lang-toggle-btn';
        langBtn.innerText = translations[currentLang].langBtn;
        langBtn.style.cssText = `
            background: rgba(255,255,255,0.15);
            color: white;
            border: 1.5px solid rgba(255,255,255,0.4);
            padding: 8px 18px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            font-family: 'Space Grotesk', sans-serif;
            letter-spacing: 1px;
            transition: background 0.2s;
            backdrop-filter: blur(4px);
        `;
        langBtn.onmouseover = () => langBtn.style.background = 'rgba(255,255,255,0.25)';
        langBtn.onmouseout = () => langBtn.style.background = 'rgba(255,255,255,0.15)';
        langBtn.addEventListener('click', toggleLanguage);
        // Sisipkan sebelum cart icon
        const cartIconEl = document.getElementById('cart-icon');
        navbar.insertBefore(langBtn, cartIconEl);
    }

    renderProducts();
    applyTranslations();
    startSlideshow();
});
// ---- Cek Ongkir ----
let ongkirAmount = 0;

const PROVINSI_JAWA = [
    'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah',
    'Jawa Timur', 'DI Yogyakarta', 'Banten'
];

const cekOngkir = async () => {
    const provinsi = document.getElementById('checkout-province').value.trim();

    if (!provinsi) return;

    const ongkirInfo = document.getElementById('ongkir-info');
    if (ongkirInfo) ongkirInfo.innerText = 'Menghitung ongkir...';

    try {
        const response = await fetch('/api/cek-ongkir', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                provinsi,
                kota_id: '',
                jumlah_item: cart.length
            })
        });

        const data = await response.json();
        ongkirAmount = data.ongkir;

        if (ongkirInfo) {
            ongkirInfo.innerText = data.gratis
                ? `✅ Gratis Ongkir! (Estimasi ${data.estimasi})`
                : `Ongkir J&T: ${formatRupiah(data.ongkir)} (Estimasi ${data.estimasi})`;
        }

        updateCheckoutTotal();
    } catch (err) {
        if (ongkirInfo) ongkirInfo.innerText = 'Gagal menghitung ongkir.';
    }
};

const updateCheckoutTotal = () => {
    let subtotal = 0;
    cart.forEach(item => { subtotal += item.price; });

    const checkoutTotalEl = document.getElementById('checkout-total');
    if (checkoutTotalEl) {
        checkoutTotalEl.innerText = formatRupiah(subtotal + ongkirAmount);
    }
};