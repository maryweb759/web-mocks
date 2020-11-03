// variables 
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverly = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartContent = document.querySelector(".cart-content");
const cartTotal = document.querySelector(".cart-total");
console.log(cartOverly);
const productDOM = document.querySelector(".products-center");
// cart
let cart = []; 
// buttons 
let buttonsDOM = [];
// getting the products
class Products { 
 async getProducs() { 
     try {
        let result = await fetch("products.json"); 
        let data = await result.json(); 
        let products = data.items; 
        products = products.map(item => { 
            const {title, price} = item.fields; 
            const {id} = item.sys; 
            const image = item.fields.image.fields.file.url; 
            return {title, price, id, image}
        }) 
        return products; 
     } catch (error) {
         console.log(error);
     }
 }
}
// display products
class UI{
 displayProducts(products) { 
     let result = ''; 
     products.forEach(product => {
        result += `
        <!-- single product --> 
        <article class="product"> 
            <div class="img-container"> 
                <img src=${product.image} alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id} > 
                  <ion-icon name="basket"></ion-icon> 
                  add to cart
                </button>
              </div> 
              <h3>${product.title}</h3> 
              <h4>$${product.price}</h4>
        </article>
        <!-- end single product --> 
        `
     }); 
     productDOM.innerHTML = result;
 } 
 
 getBagButtons() { 
     const buttons = [...document.querySelectorAll(".bag-btn")];
     buttonsDOM = buttons 
     buttons.forEach(button => { 
         let id = button.dataset.id;
        let inCart = cart.find(item => item.id === id); 
        if(inCart) { 
            button.innerText = "In Cart"; 
            button.disabled = true
        } 
            button.addEventListener('click', (event) => { 
               event.target.innerText = "In Cart"; 
               event.target.disabled = true;
               // get product form product based on id 
               let cartItem = {...Storage.getProduct(id), amount: 1};
               // add proudct to the cart
               cart = [...cart, cartItem ];
               // save cart in locale sorage  
               Storage.saveCart(cart);
               // set cart value  
               this.setCartValues(cart);
               // display cart items 
               this.addCartItem(cartItem);
               // show the cart 
              // this.showCart();
            })
        
     }) 
      // console.log(buttons);

 } 
 setCartValues(cart) { 
     let tempTotal = 0; 
     let itemsTotal = 0; 
    cart.map(item => { 
        tempTotal += item.price * item.amount;
        itemsTotal += item.amount; 
    }) 
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
    cartItems.innerText =  itemsTotal;
} 
addCartItem(item) { 
const div = document.createElement("div"); 
div.classList.add('cart-item'); 
 div.innerHTML = `<img src=${item.image} alt="product"/>
         <div>       
                <h4>${item.title}</h4>         
                <h5>$${item.price}</h5>         
                <span class="remove-item" data-id=${item.id}>remove</span>
                 </div> 
                 <div>
             <ion-icon name="chevron-up"  class="chevron-up" data-id=${item.id}></ion-icon>
           <p class="item-amount" >${item.amount}</p>
             <ion-icon name="chevron-down" class="chevron-down" data-id=${item.id}></ion-icon>
          </div>`; 
          cartContent.appendChild(div);
        
} 
 showCart() { 
    cartOverly.classList.add("transparentBcg"); 
    cartDOM.classList.add("showCart"); 
    
 } 
 setUpAPP() { 
     cart =  Storage.getCart() ;
     this.setCartValues(cart); 
     this.populate(cart); 
     cartBtn.addEventListener('click', this.showCart); 
     closeCartBtn.addEventListener('click', this.hideCart)
 } 
 populate(cart) { 
     cart.forEach(item =>  this.addCartItem(item));
 }
 hideCart() { 
    cartOverly.classList.remove("transparentBcg"); 
    cartDOM.classList.remove("showCart"); 
 }  
 cartLogic() { 
     // clear cart buttons
     clearCartBtn.addEventListener('click', () => { 
        this.clearCart();
     });
     // cart functionality 
     cartContent.addEventListener('click', event => { 
         if (event.target.classList.contains('remove-item')) { 
             let removeItem = event.target; 
             let id = removeItem.dataset.id;
             cartContent.removeChild( removeItem.parentElement.parentElement)
             this.removeItem(id)
         } else if(event.target.classList.contains('chevron-up')) { 
           let  addAmount = event.target; 
            let id = addAmount.dataset.id
           let tempItem = cart.find(item => item.id === id);
           tempItem.amount = tempItem.amount + 1;
           Storage.saveCart(cart); 
           this.setCartValues(cart);
           addAmount.nextElementSibling.innerHTML = tempItem.amount;
         }  else if(event.target.classList.contains('chevron-down')) {
            let  lowerAmount = event.target; 
            let id = lowerAmount.dataset.id; 
            let tempItem = cart.find(item => item.id === id);
           tempItem.amount = tempItem.amount - 1; 
           if (tempItem.amount > 0) { 
            Storage.saveCart(cart); 
            this.setCartValues(cart);
            lowerAmount.previousElementSibling.innerHTML = tempItem.amount;
           
           } else { 
               cartContent.removeChild(lowerAmount.parentElement.parentElement);
               this.removeItem(id);
            }
          }
    })
 } 
 clearCart() { 
     // return all the elements id in the cart
   let cartItems = cart.map(item => item.id ); 
   // loop through the array and get me all the id and use this method wih every id
   cartItems.forEach(id => this.removeItem(id));
   while(cartContent.children.length > 0) { 
       cartContent.removeChild(cartContent.children[0])
   } 
   this.hideCart();
   console.log(cartContent)
 }
 removeItem(id) { 
     // return all the item that dones't have this id
    cart = cart.filter( item  => item.id !== id);
    this.setCartValues(cart); 
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false ; 
    button.innerHTML = ' <ion-icon name="basket"></ion-icon> add to cart' ;
 } 
 getSingleButton(id) { 
     // return me the button that have the same dataset.id equal to the button we are passing in
     return buttonsDOM.find(button => button.dataset.id === id )
 }
 }

// local storage 
class Storage { 
 static saveProducts(products) { 
     localStorage.setItem('products', JSON.stringify(products));
 }
 static getProduct(id) { 
   let products =  JSON.parse(localStorage.getItem('products'));
   return products.find(product => product.id === id)
 } 
 static saveCart(cart) { 
    localStorage.setItem('cart', JSON.stringify(cart))
 } 
 static getCart() { 
     return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) : [];
 }
}

document.addEventListener("DOMContentLoaded", () => { 
    const ui = new UI(); 
    const products = new Products(); 
// setUp qpp 
ui.setUpAPP();
    // get all products 
    products.getProducs().then(products => { 
        ui.displayProducts(products);
        Storage.saveProducts(products);

    }).then(() => { 
        ui.getBagButtons(); 
        ui.cartLogic();
    }) 
});