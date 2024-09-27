import {
    products
} from './proudcts.js';

export let cart = [{
        id: 1,
        category: 'Bottoms',
        gender: 'unisex',
        name: 'SATEEN CARGO PANT',
        priceCents: 22000,
        colors: 2,
        pic: 'pic1',
        quantity: 1
    },
    {
        id: 2,
        category: 'Accessories',
        gender: 'unisex',
        name: 'KEYCHAIN',
        priceCents: 4000,
        colors: 1,
        pic: 'pic2',
        quantity: 2
    }
];

let cartHtml = ``;
getLocalStorage()

function generateCartList(array) {
    const cartGridElement = document.querySelector('.order');
    if (!cartGridElement) return;

    if (array.length > 0) {
        cartHtml = '<H4>Review your order</H5>';
        array.forEach((cartItem) => {
            cartHtml += `
                <div class="cartItem" >
                    <img  class="c_pic" src="./media/items/${cartItem.pic}a.jpg"
                    onmouseover="this.src='./media/items/${cartItem.pic}b.jpg'"
                    onmouseout="this.src='./media/items/${cartItem.pic}a.jpg'"
                    </div>
                    <div class="cartItemInfo">
                    <p class="c_name">${cartItem.name}</p>
                    <p class="c_price">$${(cartItem.priceCents / 100).toFixed(2)}</p>
                    <p class="c_quantity">Quantity: ${cartItem.quantity} <a class="more" data-id=${cartItem.id}>+</a><a class="less" data-id=${cartItem.id}>-</a></p>
    
                    </div>
                </div>
            `;
        });
        cartGridElement.innerHTML = cartHtml;
        addQuntityEventListeners('more')
        addQuntityEventListeners('less')
    } else {
        cartGridElement.innerHTML = 'your cart is empty';
    }
}
generateCartList(cart);

function generateSummary(array) {
    const summaryElement = document.querySelector('.summary');
    if (!summaryElement) return;
    if (array.length > 0) {
        let summary = 0,
            SummaryCalc = array.forEach((item) => {
                summary += (item.priceCents / 100) * item.quantity
            });
        let shipping = Math.round(summary * .01);
        if (shipping < 10 && cart) {
            shipping = 10
        }
        let cartItemsQuantity = 0,
            cartItemsCalc = cart.forEach((item) => {
                cartItemsQuantity += item.quantity
            });
        let tax = summary * 0.1,
            summaryHtml = `
        <H4>Order Summary</H5>
        <div class="summaryLines">
            <div class="summaryLine">
            <p>Items( ${cartItemsQuantity} ):</p>
            <p>${summary} $</p>
            </div>
            <div class="summaryLine">
            <p>Shipping:</p>
            <p>${shipping} $</p>
            </div>
            <div class="summaryLine">
            <p>Total before tax:</p>
            <p>${summary+shipping} $</p>
            </div>
            <div class="summaryLine">
            <p>Estimated tax (10%):</p>
            <p>${tax} $</p>
            </div>
            <div class="summaryLine">
            <p>Order total:</p>
            <p>${summary+shipping+tax} $</p>
            </div>
        </div>
        <button>Place your order</button>
        `;
        summaryElement.innerHTML = summaryHtml;
    } else {
        summaryElement.innerHTML = ``;
    }
}
generateSummary(cart);

export function saveToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
}
export function getLocalStorage() {
    let storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}


export function addToCart(productElemntId) {
    let matchingProduct = products.find(product => product.id === productElemntId);
    let cartItem = cart.find(item => item.id === productElemntId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push(matchingProduct);
    }
    saveToLocalStorage(cart);
    updateCartQuantity(cart)

}
updateCartQuantity()

function updateCartQuantity() {
    let cartItemsQuantity = 0,
        cartItemsCalc = cart.forEach((item) => {
            cartItemsQuantity += item.quantity
        });

    let cartItemsQuantityElemnt = document.querySelector('.cart')
    if (cartItemsQuantityElemnt) {
        cartItemsQuantityElemnt.innerHTML = `CART (${cartItemsQuantity})`
    }
}

function addQuntityEventListeners(elemntClass) {
    document.querySelectorAll(`.${elemntClass}`).forEach((button) => {
        button.addEventListener('click', () => {
            let selectedCartItemIndex = cart.findIndex(item => item.id === Number(button.dataset.id));
            if (selectedCartItemIndex !== -1) {
                let selectedCartItem = cart[selectedCartItemIndex];
                if (elemntClass === 'more') {
                    selectedCartItem.quantity++;
                } else {
                    if (selectedCartItem.quantity === 1) {
                        cart.splice(selectedCartItemIndex, 1);
                    } else {
                        selectedCartItem.quantity--;
                    }
                }
                generateCartList(cart);
                generateSummary(cart);
                updateCartQuantity();
                saveToLocalStorage(cart);
            }
        });
    });
}