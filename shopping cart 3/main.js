if (document.readyState == "loading") { 
    document.addEventListener('DOMContentLoaded', ready);
} else { 
    ready(); 
} 

function ready() {
var removeItemsCartButton = document.getElementsByClassName("btn-danger"); 

for (let i = 0; i <  removeItemsCartButton.length; i++) { 
    var button =  removeItemsCartButton[i]; 
    button.addEventListener("click",  removeItem) 
} 
var quantityInput = document.getElementsByClassName("cart-quantity-input"); 
for (var i = 0; i < quantityInput.length; i++) { 
   var input = quantityInput[i]; 
    input.addEventListener("change", quantityChange);
} 
var addCartItem = document.getElementsByClassName("shop-item-button"); 
for (let i = 0; i < addCartItem.length; i++) { 
    let button = addCartItem[i] ; 
    button.addEventListener("click", addToCartClicked);
}


document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked); 
}

function  purchaseClicked() { 
    var cartItems =  document.getElementsByClassName("cart-items")[0]; 
    while(cartItems.hasChildNodes()) { 
        cartItems.removeChild(cartItems.firstChild)
    } 
    updateCartTotal();
}

function removeItem(event) { 
    var buttonClicked = event.target ; 
    buttonClicked.parentElement.parentElement.remove(); 
    updateCartTotal();
}

function quantityChange(event) { 
    var input = event.target ; 
    if (isNaN(input.value) || input.value <= 0) { 
        input.value = 1;
    }
    updateCartTotal();
}

function  addToCartClicked(event) { 
    var button = event.target; 
    var itemCart = button.parentElement.parentElement; 
    var price = itemCart.getElementsByClassName("shop-item-price")[0].innerText; 
    var title = itemCart.getElementsByClassName("shop-item-title")[0].innerText; 
    var image = itemCart.getElementsByClassName("shop-item-image")[0].src; 
    addItemToCart(price, title, image);
   updateCartTotal();

} 
function  addItemToCart(price, title, imageSrc) { 
    var cartRow = document.createElement("div"); 
    cartRow.classList.add("cart-row"); 
    var cartItems = document.getElementsByClassName("cart-items")[0]; 
    var cartItemsTitle = cartItems.getElementsByClassName("cart-item-title"); 
    for (let i = 0; i < cartItemsTitle.length; i++) { 
        if (cartItemsTitle[i].innerText == title) { 
            alert("this item has already added to the cart"); 
            return;
        }
    } 
    var cartRowContents = ` 
    <div class="cart-item cart-column"> 
    <img src="${imageSrc}" alt="" class="cart-item-image" width:100%; height:100%;> 
    <span class="cart-item-title"> ${title} </span>
   </div> 
   <span class="cart-price cart-column"> ${price} </span> 
   <div class="cart-quantity cart-column"> 
       <input type="number" class="cart-quantity-input" value="1"> 
       <button class="btn btn-danger" type="button"> remove </button>
   </div>` 
   cartRow.innerHTML = cartRowContents; 
   cartItems.appendChild(cartRow); 
   cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChange) ; 
   cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeItem) ; 
   
}

function updateCartTotal() { 
   var cartItemsContainer = document.getElementsByClassName("cart-items")[0]; 
   var cartRows = cartItemsContainer.getElementsByClassName("cart-row"); 
   total = 0; 
   for (let i = 0; i <  cartRows.length; i++) { 
       var cartRow = cartRows[i] ; 
       var priceElement = cartRow.getElementsByClassName("cart-price")[0];
       var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
       var price = parseFloat(priceElement.innerText.replace('$', '')); 
       var quantity = quantityElement.value;
       total = total + (quantity * price) ;
       console.log(quantity * price);
    } 
    total = Math.round(total * 100) / 100 ;
    document.getElementsByClassName("cart-total-price")[0].innerText = '$' + total;
   
} 
