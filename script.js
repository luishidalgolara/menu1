// ============================================
// CONFIGURACIÓN DEL MENÚ - EDITA AQUÍ
// ============================================

// NÚMERO DE WHATSAPP (formato: código país + número sin + ni espacios)
// Ejemplo: 56912345678 para Chile
const WHATSAPP_NUMBER = '56912345678'; // 👈 CAMBIA ESTE NÚMERO

// PLATOS DEL MENÚ
// Para agregar un nuevo plato, copia una de las entradas y modifica los valores
// Puedes usar URLs de internet o rutas locales: 'images/tu-imagen.jpg'
const MENU_DISHES = [
    // ENTRADAS
    {
        id: 1,
        name: 'Ensalada César',
        description: 'Lechuga romana fresca, crutones crujientes, parmesano y aderezo César cremoso',
        price: '$8.990',
        category: 'entradas',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop'
    },
    {
        id: 2,
        name: 'Bruschetta',
        description: 'Pan tostado con tomate fresco, albahaca, ajo y aceite de oliva',
        price: '$6.990',
        category: 'entradas',
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&h=400&fit=crop'
    },

    // PRINCIPALES
    {
        id: 3,
        name: 'Pizza Margherita',
        description: 'Tomate fresco, mozzarella, albahaca y aceite de oliva extra virgen',
        price: '$12.990',
        category: 'principales',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop'
    },
    {
        id: 4,
        name: 'Pasta Carbonara',
        description: 'Pasta artesanal con salsa de huevo, panceta, parmesano y pimienta negra',
        price: '$14.990',
        category: 'principales',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=400&fit=crop'
    },
    {
        id: 5,
        name: 'Hamburguesa Clásica',
        description: 'Carne angus 200g, lechuga, tomate, cebolla y queso cheddar',
        price: '$11.990',
        category: 'principales',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop'
    },

    // POSTRES
    {
        id: 6,
        name: 'Tiramisú',
        description: 'Clásico postre italiano con café, mascarpone y cacao',
        price: '$6.990',
        category: 'postres',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=400&fit=crop'
    },
    {
        id: 7,
        name: 'Brownie con Helado',
        description: 'Brownie de chocolate caliente con helado de vainilla y salsa',
        price: '$5.990',
        category: 'postres',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=400&fit=crop'
    },

    // BEBIDAS
    {
        id: 8,
        name: 'Limonada Natural',
        description: 'Refrescante limonada hecha con limones frescos y menta',
        price: '$3.990',
        category: 'bebidas',
        image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f8d?w=500&h=400&fit=crop'
    },
    {
        id: 9,
        name: 'Smoothie de Frutilla',
        description: 'Batido natural de frutillas, yogurt y miel',
        price: '$4.990',
        category: 'bebidas',
        image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&h=400&fit=crop'
    }
];

// ============================================
// NO EDITES DEBAJO DE ESTA LÍNEA
// ============================================

// Referencias a elementos del DOM
const menuGrid = document.getElementById('menuGrid');
const categoryButtons = document.querySelectorAll('.category-btn');

// Variable para categoría actual
let currentCategory = 'todos';

// Sistema de carrito
let cart = [];

// Inicializar la aplicación
function init() {
    renderDishes();
    attachCategoryListeners();
}

// Renderizar platos
function renderDishes() {
    // Filtrar platos según categoría actual
    const filteredDishes = currentCategory === 'todos' 
        ? MENU_DISHES 
        : MENU_DISHES.filter(dish => dish.category === currentCategory);

    if (filteredDishes.length === 0) {
        menuGrid.innerHTML = `
            <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                    <path d="M7 2v20"></path>
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
                </svg>
                <h3>No hay platos en esta categoría</h3>
                <p>Los platos se agregan desde el código en script.js</p>
            </div>
        `;
        return;
    }

    menuGrid.innerHTML = filteredDishes.map(dish => createDishCard(dish)).join('');
}

// Crear HTML para una tarjeta de plato
function createDishCard(dish) {
    return `
        <div class="dish-card">
            <img src="${dish.image}" alt="${escapeHtml(dish.name)}" class="dish-image" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop'">
            <div class="dish-content">
                <div class="dish-header">
                    <h3 class="dish-name">${escapeHtml(dish.name)}</h3>
                    <span class="dish-price">${escapeHtml(dish.price)}</span>
                </div>
                <p class="dish-description">${escapeHtml(dish.description)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${dish.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Añadir
                </button>
            </div>
        </div>
    `;
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Adjuntar listeners para categorías
function attachCategoryListeners() {
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            categoryButtons.forEach(b => b.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            btn.classList.add('active');
            
            // Actualizar categoría actual
            currentCategory = btn.dataset.category;
            
            // Re-renderizar platos
            renderDishes();
        });
    });
}

// ============================================
// SISTEMA DE CARRITO Y WHATSAPP
// ============================================

// Agregar producto al carrito
function addToCart(dishId) {
    const dish = MENU_DISHES.find(d => d.id === dishId);
    if (!dish) return;
    
    // Buscar si ya existe en el carrito
    const existingItem = cart.find(item => item.id === dishId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...dish,
            quantity: 1
        });
    }
    
    updateCartUI();
    showCartNotification();
}

// Eliminar producto del carrito
function removeFromCart(dishId) {
    cart = cart.filter(item => item.id !== dishId);
    updateCartUI();
}

// Cambiar cantidad
function updateQuantity(dishId, change) {
    const item = cart.find(item => item.id === dishId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(dishId);
    } else {
        updateCartUI();
    }
}

// Actualizar interfaz del carrito
function updateCartUI() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBtn = document.getElementById('cartButton');
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    // Actualizar badge
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    
    // Mostrar/ocultar mensaje vacío
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.innerHTML = '';
        document.getElementById('cartFooter').style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        document.getElementById('cartFooter').style.display = 'block';
        
        // Renderizar items del carrito
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${escapeHtml(item.name)}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${escapeHtml(item.name)}</h4>
                    <p class="cart-item-price">${escapeHtml(item.price)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
    }
}

// Mostrar notificación
function showCartNotification() {
    const notification = document.getElementById('cartNotification');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Toggle carrito
function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.toggle('open');
}

// Cerrar carrito
function closeCart() {
    document.getElementById('cartPanel').classList.remove('open');
}

// Enviar pedido por WhatsApp
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Construir mensaje
    let message = '🍽️ *PEDIDO - MENÚ DIGITAL*\n\n';
    
    cart.forEach(item => {
        message += `• ${item.quantity}x ${item.name}\n`;
        message += `  ${item.price}\n\n`;
    });
    
    message += '---\n';
    message += '¡Gracias por tu pedido! 😊';
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
}

// Vaciar carrito
function clearCart() {
    if (confirm('¿Deseas vaciar el carrito?')) {
        cart = [];
        updateCartUI();
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}