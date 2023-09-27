// SECTION global variables

const menuItems = [
  {
    name: 'Spaghetti',
    price: 18,
    quantity: 0
  },
  {
    name: 'Macaroni and Cheese',
    price: 15,
    quantity: 0
  },
  {
    name: 'Lasagna',
    price: 20.99,
    quantity: 0
  },
  {
    name: 'Garlic Bread',
    price: 8,
    quantity: 0
  },
  {
    name: 'Fettuccine Alfredo',
    price: 16.75,
    quantity: 0
  },
  {
    name: 'Hawaiian Pizza',
    price: 14,
    quantity: 0
  }
]

// !SECTION


// SECTION functions
function addSpaghettiToCart() {
  const spaghetti = menuItems.find(menuItem => menuItem.name == 'Spaghetti')
  spaghetti.quantity++
  console.log('here is your spaghetti sir', spaghetti);

  drawCart()
}

function addMacAndCheeseToCart() {
  const macAndCheese = menuItems.find(menuItem => menuItem.name == 'Macaroni and Cheese')
  macAndCheese.quantity++
  console.log('here is your mac and cheese sir', macAndCheese);

  drawCart()
}

function addItemToCart(itemName) {
  console.log('here is the item name that you passed to me', itemName);
  const foundItem = menuItems.find(menuItem => menuItem.name == itemName)
  foundItem.quantity++
  console.log('here is the item', foundItem);

  drawCart()
}

function drawCart() {
  let content = ''
  menuItems.forEach(menuItem => {
    if (menuItem.quantity > 0) {
      const totalPrice = (menuItem.price * menuItem.quantity).toFixed(2)
      content += `<p>
        ${menuItem.name} | Qty: ${menuItem.quantity} | Price: $${totalPrice}
      </p>`
    }
  })



  const cartElement = document.getElementById('cart')
  cartElement.innerHTML = content

  let calculatedTotal = calculateTotal()

  const cartTotalElement = document.getElementById('cartTotal')
  cartTotalElement.innerText = calculatedTotal.toFixed(2)
}


function calculateTotal() {
  let cartTotal = 0

  menuItems.forEach(menuItem => {
    const itemTotal = menuItem.quantity * menuItem.price
    cartTotal += itemTotal
  })

  return cartTotal

}

function checkout() {
  const wantsToCheckout = window.confirm("Are you sure that you want to check out? Did you remember the garlic bread???")
  // if (wantsToCheckout == false) {
  if (!wantsToCheckout) {
    // NOTE end function
    return
  }
  menuItems.forEach(menuItem => menuItem.quantity = 0)
  drawCart()

}

// REVIEW this is more complicated than what you need for the friday checkpoint
function checkoutWithSweetAlert() {

  // @ts-ignore
  Swal.fire({
    title: 'Are you sure you want to check out?',
    text: "Did you remember the garlic bread?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: "Yes, I can't wait to eat!"
  }).then((result) => {
    if (!result.isConfirmed) {
      return
    }

    let cartContent = generateMenuItemsHTML()
    let calculatedTotal = calculateTotal()

    // @ts-ignore
    Swal.fire({
      title: `<strong>Here is your cart, your total is ${calculatedTotal}</strong>`,
      icon: 'info',
      html: cartContent,
      showCloseButton: true,
    })
    menuItems.forEach(menuItem => menuItem.quantity = 0)
    drawCart()

  })


}
function generateMenuItemsHTML() {
  let content = ''
  menuItems.forEach(menuItem => {
    if (menuItem.quantity > 0) {
      const totalPrice = (menuItem.price * menuItem.quantity).toFixed(2)
      content += `<p>
        ${menuItem.name} | Qty: ${menuItem.quantity} | Price: $${totalPrice}
      </p>`
    }
  })

  return content
}

// !SECTION