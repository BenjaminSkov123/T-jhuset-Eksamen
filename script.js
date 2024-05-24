function toggleMenu() {
  var links = document.querySelector('.links');
  var burgerMenu = document.querySelector('.burger-menu');
  if (links.style.display === 'flex') {
      links.style.display = 'none';
      burgerMenu.classList.remove('active');
  } else {
      links.style.display = 'flex';
      burgerMenu.classList.add('active');
      displayProducts(products); // Display products when menu is toggled
  }
}




let cart = [];

// Function to toggle the menu
function toggleMenu() {
var links = document.querySelector('.links');
var burgerMenu = document.querySelector('.burger-menu');
if (links.style.display === 'flex') {
    links.style.display = 'none';
    burgerMenu.classList.remove('active');
} else {
    links.style.display = 'flex';
    burgerMenu.classList.add('active');
    renderItems();
}
}

// Function to render clothing items based on filters
function renderItems() {
const colorFilter = document.getElementById("color").value;
const sizeFilter = document.getElementById("size").value;
const priceFilter = document.getElementById("price").value;

const filteredItems = clothingItems.filter(item => {
    return (colorFilter === "" || item.color === colorFilter) &&
           (sizeFilter === "" || item.size === sizeFilter) &&
           (priceFilter === "" || (item.price >= parseFloat(priceFilter.split('-')[0]) && item.price <= parseFloat(priceFilter.split('-')[1])));
});

const itemsContainer = document.getElementById("items-container");
itemsContainer.innerHTML = "";

filteredItems.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="info">
            <h2>${item.name}</h2>
            <p>Price: ${item.price.toFixed(2)} DKK</p>
            <button onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">Add to Cart</button>
        </div>
    `;
    itemsContainer.appendChild(itemElement);
});
}




// Function to display cart
function displayCart() {
const cartContainer = document.getElementById('cart-container');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

cartItemsList.innerHTML = '';

let total = 0;

cart.forEach(item => {
    const cartItemDiv = document.createElement('li');
    cartItemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Price: ${item.price.toFixed(2)} DKK</p>
        <p>Quantity: ${item.quantity}</p>
        <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartItemsList.appendChild(cartItemDiv);
    total += item.price * item.quantity;
});

cartTotal.textContent = total.toFixed(2) + ' DKK';
cartContainer.style.display = cart.length > 0 ? 'block' : 'none';
}


// Event listeners for filter changes
document.getElementById("color").addEventListener("change", renderItems);
document.getElementById("size").addEventListener("change", renderItems);
document.getElementById("price").addEventListener("change", renderItems);

// Initial rendering of items
// Event listener for cart icon click
document.getElementById('cart-icon').addEventListener('click', () => {
const cartContainer = document.getElementById('cart-container');
cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
});



// Function to remove item from cart
function removeFromCart(index) {
cart.splice(index, 1);
displayCart();
}
/* Slider */
function updateSliderBackground() {
const slider = document.getElementById('fit_preference');
slider.style.setProperty('--value', (slider.value - slider.min) / (slider.max - slider.min) * 100 + '%');
}

function calculateSize() {
const height = parseFloat(document.getElementById('height').value);
const weight = parseFloat(document.getElementById('weight').value);
const fitPreferenceValue = parseInt(document.getElementById('fit_preference').value);

const fitPreference = ['tight', 'regular', 'loose'][fitPreferenceValue];

const sizeChart = {
    'XS': {height: [150, 160], weight: [45, 55]},
    'S': {height: [160, 170], weight: [55, 65]},
    'M': {height: [170, 180], weight: [65, 75]},
    'L': {height: [180, 190], weight: [75, 85]},
    'XL': {height: [190, 200], weight: [85, 95]}
};

const fitAdjustment = {
    'tight': -1,
    'regular': 0,
    'loose': 1
};

let baseSize = null;

for (let size in sizeChart) {
    const limits = sizeChart[size];
    if (height >= limits.height[0] && height <= limits.height[1] && weight >= limits.weight[0] && weight <= limits.weight[1]) {
        baseSize = size;
        break;
    }
}

if (baseSize === null) {
    document.getElementById('result').innerText = "Sorry, we couldn't find a size for your measurements.";
    return;
}

const sizeKeys = Object.keys(sizeChart);
let baseIndex = sizeKeys.indexOf(baseSize);
let adjustedIndex = baseIndex + fitAdjustment[fitPreference];

adjustedIndex = Math.max(0, Math.min(adjustedIndex, sizeKeys.length - 1));

const finalSize = sizeKeys[adjustedIndex];
document.getElementById('result').innerText = `Based on your input, your suggested clothing size is: ${finalSize}`;
}

document.addEventListener('DOMContentLoaded', updateSliderBackground);




function addToCartButton() {
var cartItems = document.getElementById("cart-items");
var cartTotal = document.getElementById("cart-total");

// Assuming the product has a name and a price
var productName = "Product Name";
var productPrice = 10.00; // Example price

// Create a new list item for the product
var listItem = document.createElement("li");
listItem.textContent = productName + " - " + productPrice + " DKK";

// Append the list item to the cart
cartItems.appendChild(listItem);

// Update the total price
var currentTotal = parseFloat(cartTotal.textContent);
currentTotal += productPrice;
cartTotal.textContent = currentTotal.toFixed(2); // Limit to 2 decimal places
}



function addToCartButton(productName, productPrice, productImage) {
var cartItems = document.getElementById("cart-items");
var cartTotal = document.getElementById("cart-total");

// Create a new list item for the product
var listItem = document.createElement("li");

// Create an image element for the product
var imageElement = document.createElement("img");
imageElement.src = productImage;
imageElement.alt = productName;
listItem.appendChild(imageElement);

// Create a span element for the product name
var nameSpan = document.createElement("span");
nameSpan.textContent = productName;
listItem.appendChild(nameSpan);

// Create a span element for the product price
var priceSpan = document.createElement("span");
priceSpan.textContent = productPrice.toFixed(2) + " DKK";
listItem.appendChild(priceSpan);

// Append the list item to the cart
cartItems.appendChild(listItem);

// Update the total price
var currentTotal = parseFloat(cartTotal.textContent);
currentTotal += productPrice;
cartTotal.textContent = currentTotal.toFixed(2); // Limit to 2 decimal places
}
function filterItems() {
const color = document.getElementById('color').value;
const size = document.getElementById('size').value;
const price = document.getElementById('price').value;

const items = document.querySelectorAll('.custom-grid-item');

items.forEach(item => {
    const itemColor = item.getAttribute('data-color');
    const itemSize = item.getAttribute('data-size');
    const itemPrice = parseInt(item.getAttribute('data-price'));

    const colorMatch = color === '' || color === itemColor;
    const sizeMatch = size === '' || size === itemSize;
    const priceMatch = price === '' || price === getPriceRange(itemPrice);

    if (colorMatch && sizeMatch && priceMatch) {
        item.style.display = 'block';
    } else {
        item.style.display = 'none';
    }
});
}

function getPriceRange(price) {
if (price >= 0 && price <= 20) {
    return '0-20';
} else if (price > 20 && price <= 50) {
    return '20-50';
} else if (price > 50 && price <= 100) {
    return '50-100';
} else {
    return '';
}
}

document.querySelectorAll('.filters select').forEach(select => {
select.addEventListener('change', filterItems);
});

filterItems(); // Call initially to apply filters






function addToCartButton(productName, price, imageUrl) {
// Hent den div hvor indholdet skal tilføjes
var cartDiv = document.getElementById('cart');

// Opret nyt indhold
var cartItem = document.createElement('div');
cartItem.className = 'cart-item';

var itemImage = document.createElement('img');
itemImage.src = imageUrl;
itemImage.alt = productName;

var itemInfo = document.createElement('div');
itemInfo.innerHTML = `<strong>${productName}</strong><br>Pris: ${price.toFixed(2)} DKK`;

// Tilføj billedet og informationen til cart item
cartItem.appendChild(itemImage);
cartItem.appendChild(itemInfo);

// Tilføj det nye cart item til cart div'en
cartDiv.appendChild(cartItem);
}


function showContent(contentNum) {
var contents = document.getElementsByClassName("new-content");
for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none"; // Hide all content
}
document.getElementById("content" + contentNum).style.display = "block"; // Show selected content
}

// Initial call to show the first content by default
showContent(1);
// Function to add item to cart
function addToCartButton(productName, price, imageSrc) {
// Your logic to add item to cart goes here
console.log("Added to cart:", productName, price, imageSrc);
// Example: You can use AJAX to send data to the server and update the cart
}

// Event listener for clicks on the "TILFØJ TIL KURVEN" button
document.querySelector(".tilfoej").addEventListener("click", function() {
// Call addToCartButton function with appropriate parameters
addToCartButton('T-Shirt', 20.00, 'Mand med skjorte.jpeg');
});

// Function to add item to cart
  function addToCartButton(productName, price, imageSrc) {
      // Create a new list item for the cart
      var cartItem = document.createElement("li");
      cartItem.innerHTML = `<img src="${imageSrc}" alt="${productName}" width="50" height="50"> ${productName} - ${price} DKK`;

      // Append the new item to the cart
      document.getElementById("cart-items").appendChild(cartItem);

      // Update the total price
      var cartTotal = parseFloat(document.getElementById("cart-total").innerText);
      cartTotal += price;
      document.getElementById("cart-total").innerText = cartTotal.toFixed(2) + " DKK";

      // Show the cart container
      document.getElementById("cart-container").style.display = "block";
  }

  // Event listener for clicks on the cart icon
  document.getElementById("cart-icon").addEventListener("click", function() {
      // Toggle visibility of the cart container
      var cartContainer = document.getElementById("cart-container");
      cartContainer.style.display = cartContainer.style.display === "none" ? "block" : "none";
  });

  document.getElementById('cart-icon').addEventListener('click', function(event) {
    event.preventDefault(); // Prevents the default behavior of the link
    window.location.href = 'Kurv.html'; // Redirects to the cart page
});


document.getElementById('toggleButton').addEventListener('click', function() {
  document.getElementById('sliderPanel').classList.toggle('open');
});


function toggleSliderPanel() {
var sliderPanel = document.getElementById('sliderPanel');
if (sliderPanel.style.display === 'none') {
    sliderPanel.style.display = 'block';
} else {
    sliderPanel.style.display = 'none';
}
}





function toggleMenu() {
var links = document.querySelector('.links');
var burgerMenu = document.querySelector('.burger-menu');
if (links.style.display === 'flex') {
    links.style.display = 'none';
    burgerMenu.classList.remove('active');
} else {
    links.style.display = 'flex';
    burgerMenu.classList.add('active');
    renderItems(); // Assuming you want to render items when the menu is toggled
}
}

document.addEventListener('DOMContentLoaded', function () {
const cartIcon = document.getElementById('cart-icon');
const cartContainer = document.getElementById('cart-container');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let items = [];
let total = 0;

// Show/Hide Cart
cartIcon.addEventListener('click', function () {
    cartContainer.style.display = (cartContainer.style.display === 'none') ? 'block' : 'none';
});

// Function to add item to cart
function addItemToCart(newItem) {
    const existingItem = items.find(item => item.name === newItem.name);

    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price; // Update total price
    } else {
        newItem.quantity = 1;
        newItem.totalPrice = newItem.price; // Initial total price for new item
        items.push(newItem);
    }

    updateCart();
}

// Function to update cart
function updateCart() {
    cartItems.innerHTML = '';
    total = 0;

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x ${item.quantity} - ${(item.totalPrice).toFixed(2)} DKK`; // Show total price for each item
        cartItems.appendChild(li);

        total += item.totalPrice; // Accumulate total price
    });

    cartTotal.textContent = total.toFixed(2);
}

// Example of adding items (this should be replaced by actual logic, e.g., adding items when a button is clicked)
addItemToCart({name: 'Item 1', price: 100});
addItemToCart({name: 'Item 2', price: 200});
addItemToCart({name: 'Item 1', price: 100});  // Adding the same item again
});



// Function to add item to cart
function addItemToCart(newItem) {
let itemExists = false;

// Check if the item already exists in the cart
for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === newItem.name) {
        // If the item exists, update its quantity and total price
        cart[i].quantity++;
        cart[i].totalPrice += newItem.price;
        itemExists = true;
        break;
    }
}

// If the item is not already in the cart, add it
if (!itemExists) {
    newItem.quantity = 1;
    newItem.totalPrice = newItem.price;
    cart.push(newItem);
}

// Update the cart display
displayCart();
}



