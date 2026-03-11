// ── POS Cart Logic ────────────────────────────────────────────────────────────
let cart = {};

function addToCart(id, name, price) {
  if (cart[id]) {
    cart[id].qty++;
  } else {
    cart[id] = { id, name, price, qty: 1 };
  }
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  renderCart();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const countEl   = document.getElementById('cartCount');
  if (!container) return;

  const items = Object.values(cart);
  countEl.textContent = `(${items.length} item${items.length !== 1 ? 's' : ''})`;

  if (items.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:28px;color:var(--gray-400);font-size:0.8rem">Tap a product to add it to the cart</div>';
    document.getElementById('subtotal').textContent  = '₱0.00';
    document.getElementById('vat').textContent       = '₱0.00';
    document.getElementById('grandTotal').textContent = '₱0.00';
    return;
  }

  let subtotal = 0;
  container.innerHTML = items.map(item => {
    subtotal += item.price * item.qty;
    return `
      <div class="cart-item">
        <div>
          <div style="font-weight:700;font-size:0.8rem">${item.name}</div>
          <div style="color:var(--gray-400);font-size:0.7rem">₱${item.price.toFixed(2)} × ${item.qty}</div>
        </div>
        <div style="display:flex;align-items:center;gap:5px">
          <button class="ci-remove" onclick="changeQty('${item.id}',-1)">−</button>
          <span style="font-weight:700;min-width:16px;text-align:center">${item.qty}</span>
          <button class="ci-remove" onclick="changeQty('${item.id}',1)">+</button>
          <button class="ci-remove" onclick="removeFromCart('${item.id}')" title="Remove">✕</button>
        </div>
      </div>`;
  }).join('');

  const vat   = subtotal * 0.12;
  const total = subtotal + vat;

  document.getElementById('subtotal').textContent   = `₱${subtotal.toFixed(2)}`;
  document.getElementById('vat').textContent        = `₱${vat.toFixed(2)}`;
  document.getElementById('grandTotal').textContent = `₱${total.toFixed(2)}`;
}

function clearCart() {
  cart = {};
  renderCart();
}

function processPayment() {
  const items = Object.values(cart);
  if (items.length === 0) { alert('Cart is empty.'); return; }

  const method = confirm('Pay with GCash?\nClick OK for GCash, Cancel for Cash.') ? 'GCash' : 'Cash';
  const sub    = items.reduce((s, i) => s + i.price * i.qty, 0);
  const vat    = (sub * 0.12).toFixed(2);
  const total  = (sub * 1.12).toFixed(2);

  alert(`✅ Payment Processed!\n\nMethod : ${method}\nSubtotal: ₱${sub.toFixed(2)}\nVAT (12%): ₱${vat}\nTotal   : ₱${total}\n\nBIR Official Receipt will be printed.`);
  clearCart();
}

// ── POS Product Search ────────────────────────────────────────────────────────
function filterPos() {
  const q     = document.getElementById('posSearch')?.value.toLowerCase() ?? '';
  const tiles = document.querySelectorAll('#posGrid .product-tile');
  tiles.forEach(tile => {
    tile.style.display = tile.dataset.name.includes(q) ? '' : 'none';
  });
}

// ── Inventory Table Search ────────────────────────────────────────────────────
function filterTable() {
  const q    = document.getElementById('searchBox')?.value.toLowerCase() ?? '';
  const rows = document.querySelectorAll('#inventoryTable tbody tr');
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ── Auto-dismiss alerts ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(a => {
    setTimeout(() => { a.style.opacity = '0'; a.style.transition = 'opacity .4s'; setTimeout(() => a.remove(), 400); }, 5000);
  });
});
