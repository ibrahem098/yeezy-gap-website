export let cart = [];


function generateCartList(array) {
    array.forEach((cartItem) => {
        let cartItemName = cartItem.name,
            cartItemPriceCents = cartItem.priceCents,
            cartItemcolors = cartItem.colors,
            cartItempic = cartItem.pic,
            cartItemid = cartItem.id
        html += `
        <div class="product" data-id=${cartItemid}>
        <img id="pic" class="pic" src="./media/items/${cartItempic}a.jpg" onmouseover="this.src='./media/items/${cartItempic}b.jpg'" onmouseout="this.src='./media/items/${cartItempic}a.jpg'">
        <p class="p_name">${cartItemName}</p>
        <p class="p_price">$${cartItemPriceCents/100}</p>
        <p class="p_color">${cartItemcolors} COLORS</p>
        </div>
        `;
        document.querySelector('.cartList').innerHTML = html;
    })
    let storedProducts = JSON.parse(localStorage.getItem('cart'));
}
generateCartList(cart);