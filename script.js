console.log('yes');

import {
    products
} from "./proudcts.js"
let html = ``,
    picCount = 0

function generateHeaderImg() {
    let heroimgNum;
    heroimgNum = Math.round(Math.random() * 16)
    if (heroimgNum < 1) {
        heroimgNum++
    }
    document.querySelector('.headimg').style.backgroundImage = `url('./media/heroimg/hero${heroimgNum}.jpg')`;
}

function generateProducts() {
    products.forEach((product) => {
        let productName = product.name,
            productPriceCents = product.priceCents,
            productcolors = product.colors,
            productpic = product.pic
        picCount++

        html += `
        <div class="product">
        <img id="pic" class="pic pic${picCount}" src="./media/items/${picCount}a.jpg" onmouseover="this.src='./media/items/${picCount}b.jpg'" onmouseout="this.src='./media/items/${picCount}a.jpg'">
        <p class="p_name">${productName}</p>
        <p class="p_price">$${productPriceCents/100}</p>
        <p class="p_color">${productcolors} COLORS</p>
        </div>
        `;
        document.querySelector('.productsGrid').innerHTML = html
    })
}
generateHeaderImg()
generateProducts()

let scrollViewToggel = document.querySelector('.gridIcon');
let grid = document.getElementById('productsGrid');
scrollViewToggel.addEventListener('click', () => {
    document.querySelectorAll('.pic').forEach((pic) => {
        pic.classList.toggle("pic");
        pic.classList.toggle("picScroll");
    });
    document.querySelector('.gridIcon').classList.toggle('gridGap');
    grid.classList.toggle("productsGrid");
    grid.classList.toggle("productsGridScroll");
});

document.querySelector('.unisex').addEventListener('click', () => {
    document.querySelector('.unisexCats').classList.toggle('hidden')
})
document.querySelector('.men').addEventListener('click', () => {
    document.querySelector('.menCats').classList.toggle('hidden')
})
document.querySelector('.women').addEventListener('click', () => {
    document.querySelector('.womenCats').classList.toggle('hidden')
})