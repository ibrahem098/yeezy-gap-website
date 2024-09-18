import {
    products
} from "/proudcts.js"
let html = ``,
    picCount = 0
products.forEach((product) => {
    let productName = product.name,
        productPriceCents = product.priceCents,
        productcolors = product.colors,
        productpic = product.pic
    picCount++

    html += `
    <div class="product">
    <img class="pic pic${picCount}" src="media/items/${picCount}a.jpg" onmouseover="this.src='media/items/${picCount}b.jpg'" onmouseout="this.src='media/items/${picCount}a.jpg'">
    <p class="p_name">${productName}</p>
    <p class="p_price">$${productPriceCents/100}</p>
    <p class="p_color">${productcolors} COLORS</p>
    </div>
    `;
    document.querySelector('.productsGrid').innerHTML = html
})
let heroimgNum = 0

function generateeaderImg() {
    heroimgNum = Math.round(Math.random() * 16)
    if (heroimgNum === 0) {
        generateeaderImg()
    }
    document.querySelector('.headimg').style.backgroundImage = `url('media/heroimg/hero${heroimgNum}.jpg')`;
}
generateeaderImg()