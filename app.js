let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Roti Cokelat',
        image: '1.jpg',
        price: 8000
    },
    {
        id: 2,
        name: 'Roti Keju',
        image: '2.jpg',
        price: 9000
    },
    {
        id: 3,
        name: 'Roti Pisang Coklat',
        image: '3.jpg',
        price: 8000
    },
    {
        id: 4,
        name: 'Roti Srikaya',
        image: '4.jpg',
        price: 15000
    },
    {
        id: 5,
        name: 'Roti Isi Ayam',
        image: '5.jpg',
        price: 10000
    },
    {
        id: 6,
        name: 'Roti Isi Sosis',
        image: '6.jpg',
        price: 8000
    }, {
        id: 7,
        name: 'Roti Isi Abon',
        image: '7.jpg',
        price: 9500
    }, {
        id: 8,
        name: 'Toast',
        image: '8.jpg',
        price: 12000
    }, 
    {   id:21,
        name: 'Croissant',
        image:'21.jpg',
        price:12999
    },
    {
        id: 9,
        name:'Donut' ,
        image: '9.jpg',
        price: 11500
    }, {
        id: 10,
        name: 'Pastry',
        image: '10.jpg',
        price: 12999
    }, {
        id: 11,
        name: 'Ice Tea',
        image: '11.jpg',
        price: 10000
    }, {
        id: 12,
        name: 'Ice Cofee Milk',
        image: '12.jpg',
        price: 12000
    }, {
        id: 13,
        name:'Ice Chocolate' ,
        image: '13.jpg',
        price: 13000
    }, {
        id: 14,
        name:'Ice Lemon Tea' ,
        image: '14.jpg',
        price: 12000
    }, {
        id: 15,
        name: 'Thaitea',
        image: '15.jpg',
        price: 15000
    }, {
        id: 16,
        name:'Matcha latte' ,
        image: '16.jpg',
        price: 14000
    }, {
        id: 17,
        name:'Hot Tea' ,
        image: '17.jpg',
        price: 8999
    }, {
        id: 18,
        name: 'Hot Chocolate',
        image: '18.jpg',
        price: 20000
    }, {
        id: 19,
        name: 'vanila latte',
        image: '19.jpg',
        price: 21000
    }, {
        id: 20,
        name: 'Capuccino' ,
        image: '20.jpg',
        price: 19999
    },
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();

function checkCard(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCard='));
    if(cookieValue){
        listCard =JSON.parse(cookieValue.split('=')(1));
    }
}
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

let timeSave = "expires = Thu, 1 january 2030 23:00:00 UTC";
document.cookie = "listCard="+JSON.stringify(listCard)+"; "+timeSave+"; path=/;";

