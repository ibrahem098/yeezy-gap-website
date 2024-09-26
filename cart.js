export let cart = [{
    id: 1,
    category: 'Bottoms',
    gender: 'unisex',
    name: 'SATEEN CARGO PANT',
    priceCents: 22000,
    colors: 2,
    pic: 'pic1'
}, {
    id: 2,
    category: 'Accessories',
    gender: 'unisex',
    name: 'KEYCHAIN',
    priceCents: 4000,
    colors: 1,
    pic: 'pic2'
}];
let cartHtml = ``;
getLocalStorage()

function generateCartList(array) {
    const cartGridElement = document.querySelector('.order');
    if (!cartGridElement) return;

    cartHtml = 'Review your order';
    array.forEach((cartItem) => {
        cartHtml += `
            <div class="cartItem" data-id=${cartItem.id}>
                <img  class="c_pic" src="./media/items/${cartItem.pic}a.jpg"
                onmouseover="this.src='./media/items/${cartItem.pic}b.jpg'"
                onmouseout="this.src='./media/items/${cartItem.pic}a.jpg'"
                </div>
                <div class="cartItemInfo">
                <p class="c_name">${cartItem.name}</p>
                <p class="c_price">$${(cartItem.priceCents / 100).toFixed(2)}</p>
                </div>
            </div>
        `;
    });
    cartGridElement.innerHTML = cartHtml;
}
generateCartList(cart);

function generateSummary(array) {
    const summaryElement = document.querySelector('.summary');
    if (!summaryElement) return;
    let summary = 0,
        SummaryCalc = array.forEach((item) => {
            summary += item.priceCents / 100
        });
    let shipping = Math.round(summary * .01);
    if (shipping < 10 && cart) {
        shipping = 10
    }
    let tax = summary * 0.1,
        summaryHtml = `
        <H4>Order Summary</H5>
        <div class="summaryLine">
        <p>Items(${array.length}):</p>
        <p>${summary} $</p>
        </div>
         
        <p>Shipping: ${shipping} $</p>
        <p>Total before tax: ${summary+shipping} $</p>
        <p>Estimated tax (10%): ${tax} $</p>
        <p>Order total: ${summary+shipping+tax} $</p>
        <button>Place your order</button>
        `;
    summaryElement.innerHTML = summaryHtml;
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

// 