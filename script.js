var plus = document.querySelectorAll(".fa-plus-circle");
var minus = document.querySelectorAll(".fa-minus-circle");
var heart = document.querySelectorAll(".fas.fa-heart");
var trash = document.querySelectorAll(".fas.fa-trash-alt");
var cardbody = document.querySelectorAll(".card-body");
var card = document.querySelectorAll(".card");
var total = document.querySelector(".total");
var qntty1 = document.getElementById("qntty1");
var qntty2 = document.getElementById("qntty2");
var qntty3 = document.getElementById("qntty3");
var singlePrice =document.querySelector(".unit-price");


class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class ShoppingCartItem extends Product {
    constructor(id, name, price, quantity) {
        super(id, name, price);
        this.quantity = quantity;
    }
    onePrice() {
        let a=this.price * this.quantity; 
        return a;
    }
}
class ShoppingCartList {
    constructor() {
        this.items = []; 
    }
    addItem(product, quantity) {
        const item = new ShoppingCartItem(product.id, product.name, product.price, quantity); 
        this.items.push(item);
    }
    displayCart() {
        this.items.forEach(item => {
            console.log(`Product: ${item.name}, Quantity: ${item.quantity}, Total Price: $${item.onePrice()}`);
        });
    }
    getTotal() {
        let tot=this.items.reduce((total, item) => total + item.onePrice(), 0);
        total.value= tot;
        return tot;
    }
}


// partie test
const product1 = new Product(1, "Baskets", 100);
const product2 = new Product(2, "Socks", 20);
const product3 = new Product(3, "Bag", 50);

const item = new ShoppingCartItem ();
const cart = new ShoppingCartList();
cart.addItem(product1, parseInt(qntty1.value)); 
cart.addItem(product2, parseInt(qntty2.value)); 
cart.addItem(product3, parseInt(qntty3.value));
cart.displayCart(); 
console.log(cart.getTotal());     

plus.forEach(plus => {
    plus.addEventListener("click", function() {
        var qntty = this.nextElementSibling;
        qntty.value = parseInt(qntty.value) + 1;
        cart.getTotal()
        item.onePrice()
    }); 
});

minus.forEach(minus => {
    minus.addEventListener("click", function() {
        var qntty = this.previousElementSibling;
        if (parseInt(qntty.value) > 1) { 
            qntty.value = parseInt(qntty.value) - 1;
        }
        cart.getTotal()
        item.onePrice()
    });
});

heart.forEach(heart => {
    heart.addEventListener("click", function() {
        // if (heart.classList.contains("fas")) { 
        //     heart.classList.remove("fas");
        //     heart.classList.add("fal");
        // } else {
        //     heart.classList.remove("fal");
        //     heart.classList.add("fas");
        // }
        if (heart.style.color=="red"){
            heart.style.color="black" ;
        } else{
            heart.style.color="red" ;
        }
    });
});

trash.forEach(trash => {
    trash.addEventListener("click", function() {
        var result = confirm("Do you want to delete this product?");
        if (result) { 
            var cardBody = this.closest('.card-body');
            var card=this.closest('.card');
            if (cardBody) {
                cardBody.remove();
                card.remove();
                alert("Product deleted.");
            }
        } else {
            alert("Product not deleted.");
        }
        cart.getTotal()
    });
});

