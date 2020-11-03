if (document.readyState == '') { 
    document.addEventListener('domContentLoaded', ready)
} else { 
    ready()
} 
function ready() { 
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");  
    for (let i = 0; i < removeCartItemButtons.length; i++) { 
        var button = removeCartItemButtons[i]; 
        button.addEventListener("click", removeCartItem)
    } 
    var quantityInputs = document.getElementsByClassName("cart-quantity-input") ;
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
     }
    var addToCartButton = document.getElementsByClassName('shop-item-button'); 
    for (let i = 0; i < addToCartButton.length; i++) { 
        var button = addToCartButton[i]; 
        button.addEventListener("click", addToCartClicked)
    } 
    document.getElementsByClassName("btn-purchase")[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() { 
  var cartItems = document.getElementsByClassName("cart-items")[0] ; 
  while(cartItems.hasChildNodes()) { 
      cartItems.removeChild(cartItems.firstChild)
  } 
  updaeCartTotal();
}
function removeCartItem(event) { 
    var buttonClicked = event.target; 
    buttonClicked.parentElement.parentElement.remove();
    updaeCartTotal();
  
}

function quantityChanged(event) { 
  var input = event.target; 
  if (isNaN(input.value) || input.value <= 0) { 
    input.value = 1 ;
  } 
  updaeCartTotal() ;
}

function addToCartClicked(event) { 
    var button = event.target; 
    var shopItem =  button.parentElement.parentElement; 
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText; 
    var imageSrc =  shopItem.getElementsByClassName("shop-item-image")[0].src; 
   
    addItemToCart(title, price, imageSrc);
    updaeCartTotal() ;
}

function  addItemToCart(title, price, imageSrc) { 
    var cartRow = document.createElement('div') ;
    cartRow.classList.add('cart-row') ;
    var cartItems = document.getElementsByClassName('cart-items')[0] ;
    var cartItemsName = cartItems.getElementsByClassName('cart-item-title'); 
    for (var i = 0; i < cartItemsName.length; i++) { 
        if(cartItemsName[i].innerText == title) { 
            alert("this item has already added to the cart"); 
            return;
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column"> 
    <img src="${imageSrc}" alt="" class="cart-item-image" width:100%; height:100%;> 
    <span class="cart-item-title"> ${title} </span>
   </div> 
   <span class="cart-price cart-column">${price}</span> 
   <div class="cart-quantity cart-column"> 
       <input type="number" class="cart-quantity-input" value="1"> 
       <button class="btn btn-danger" type="button"> remove </button>
   </div> ` 
   cartRow.innerHTML = cartRowContents 
   cartItems.append(cartRow); 
   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
   cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);

}

function updaeCartTotal() { 
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row"); 
    var total = 0;
    for (let i = 0 ; i < cartRows.length; i++) { 
        var cartRow = cartRows[i]; 
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]; 
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]; 
        var price = parseFloat(priceElement.innerText.replace('$', ' ')); 
        var quantity = quantityElement.value ;
        total = total + (price * quantity); 
    } 
    total = Math.round(total * 100) / 100;
   document.getElementsByClassName("cart-total-price")[0].innerText = '$' + total;
}