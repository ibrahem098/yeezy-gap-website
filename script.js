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
    <img class="pic" src="media/items/${picCount}a.jpg"></img>
    <p class="p_name">${productName}</p>
    <p class="p_price">$${productPriceCents/100}</p>
    <p class="p_color">${productcolors} COLORS</p>
    </div>
    `;
    document.querySelector('.productsGrid').innerHTML = html
})

// background-image: url(media/items/1a.jpg);
{
    /* <div class="pic${picCount} pic"></div> */
}

document.querySelectorAll('.pic').forEach((pic) => {
    pic.addEventListener(onmouse)
})

/* <div>
<div class="pic1"></div>
<p class="p_name">SATEEN CARGO PANT</p>
<p class="p_price">$220</p>
<p class="p_color">2 COLORS</p>
</div> */