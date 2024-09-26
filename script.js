import {
    products
} from "/proudcts.js";
import {
    cart
} from "/cart.js";

// Set the initial value of 'cart' if it exists in localStorage
let savedCart = JSON.parse(localStorage.getItem('cart'));

if (savedCart) {
    // Clear the existing cart array and populate it with the saved cart
    cart.length = 0; // This clears the cart array
    cart.push(...savedCart); // Spread the savedCart into the cart array
}
let html = ``,
    picCount = 0;

function generateHeaderImg() {
    let heroimgNum;
    heroimgNum = Math.round(Math.random() * 16)
    if (heroimgNum < 1) {
        heroimgNum++
    }
    document.querySelector('.headimg').style.backgroundImage = `url('./media/heroimg/hero${heroimgNum}.jpg')`;
}


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
// let matchingProduct = '';
// document.querySelectorAll(".product").forEach((product) => {
//     product.addEventListener('click', () => {
//         products.forEach((brandProduct) => {
//             if (brandProduct.id === product.dataset.id) {
//                 matchingProduct = product
//                 console.log(matchingProduct);
//             } else {
//                 console.log('no');

//             }
//         })
//     })
// })

let matchingProduct = '';

function addToCart(matchingProduct) {
    cart.push(matchingProduct)
}
document.querySelectorAll(".product").forEach((product) => {
    product.addEventListener('click', () => {
        products.some((brandProduct) => {
            if (brandProduct.id === Number(product.dataset.id)) {
                matchingProduct = brandProduct;
                addToCart(matchingProduct)
                console.log(cart);
                return true;
            }
        });
    });
});