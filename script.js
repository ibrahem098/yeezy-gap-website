import {
    products
} from "./proudcts.js";
import {
    cart,
    getLocalStorage,
    saveToLocalStorage,
    addToCart
} from "./cart.js";

getLocalStorage()

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

function generateHeaderImg() {
    let heroimgNum;
    heroimgNum = Math.round(Math.random() * 16)
    if (heroimgNum < 1) {
        heroimgNum++
    }
    document.querySelector('.headimg').style.backgroundImage = `url('./media/heroimg/hero${heroimgNum}.jpg')`;
}

let html = ``,
    picCount = 0;

function generateProducts(array) {
    array.forEach((product) => {
        let productName = product.name,
            productPriceCents = product.priceCents,
            productcolors = product.colors,
            productpic = product.pic,
            productid = product.id
        html += `
        <div class="product" data-id=${productid}>
        <img id="pic" class="pic" src="./media/items/${productpic}a.jpg" onmouseover="this.src='./media/items/${productpic}b.jpg'" onmouseout="this.src='./media/items/${productpic}a.jpg'">
        <p class="p_name">${productName}</p>
        <p class="p_price">$${productPriceCents/100}</p>
        <p class="p_color">${productcolors} COLORS</p>
        </div>
        `;
        document.querySelector('.productsGrid').innerHTML = html;
    })
}
let Content = [];

function getContent(elemntClass, gender, category) {
    document.querySelector(elemntClass).addEventListener('click', () => {
        Content = [];
        html = ``;
        products.forEach((product) => {
            if (category === 'All' &&
                (product.gender === gender ||
                    product.gender === 'unisex')) {
                Content.push(product)
            } else if ((gender === 'Men' || gender === 'Women') &&
                (product.gender === 'unisex') &&
                category === product.category) {
                Content.push(product)
            } else if (product.gender === gender &&
                product.category === category) {
                Content.push(product)
            }
        })
        generateProducts(Content)
    })
}
generateHeaderImg()
generateProducts(products)
getContent('.uAll', 'unisex', 'All')
getContent('.uTops', 'unisex', 'Tops')
getContent('.uBottoms', 'unisex', 'Bottoms')
getContent('.uOuterwear', 'unisex', 'Outerwear')
getContent('.uAccessories', 'unisex', 'Accessories')
getContent('.mAll', 'Men', 'All')
getContent('.mTops', 'Men', 'Tops')
getContent('.mBottoms', 'Men', 'Bottoms')
getContent('.mOuterwear', 'Men', 'Outerwear')
getContent('.mAccessories', 'Men', 'Accessories')
getContent('.wAll', 'Women', 'All')
getContent('.wTops', 'Women', 'Tops')
getContent('.wBottoms', 'Women', 'Bottoms')
getContent('.wOuterwear', 'Women', 'Outerwear')
getContent('.wAccessories', 'Women', 'Accessories')


document.querySelectorAll('.product').forEach((productElemnt) => {
    productElemnt.addEventListener('click', () => {
        let productElemntId = Number(productElemnt.dataset.id)
        addToCart(productElemntId)
    })
})
