/* The code snippet `let products = []; //product cart` initializes an empty array named `products`
which is intended to store the products added to the cart. */
let products = []; //product cart
/* The line `let id = 0;` is initializing a variable `id` with a value of 0. This variable is used to
assign unique identifiers to each product added to the cart. When a new product is added, the `id`
is incremented by 1 (`id: ++id`) to ensure that each product has a distinct identifier. This helps
in managing and identifying individual products within the cart or any other operations that require
unique identification. */
let id = 0;  //id=0 add -->1

/* This code snippet is handling the form submission event in the HTML document. When the form is
submitted, it prevents the default form submission behavior using `event.preventDefault()`. Then, it
retrieves the values of the product name, price, and image URL from the respective input fields in
the form. */
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();  //id: form value=submit

/* The code snippet you provided is retrieving the values of the product name, price, and image URL
from the respective input fields in an HTML form. Here's a breakdown of what each line is doing: */
  const productName = document.getElementById("productName").value;  //id in html
  const price = document.getElementById("price").value;
  const imgUrl = document.getElementById("imgurl").value;

/* The code snippet `if (!imageUrl(imgUrl)) { alert("Please enter a valid image URL."); return; }` is
performing input validation on the image URL entered by the user. Here's a breakdown of what it
does: */
  if (!imageUrl(imgUrl)) {
    alert("Please enter a valid image URL.");
    return;
  } //if add wrong please alert them

  const newProduct = {
    id: ++id,
    imgUrl: imgUrl,   //same with 7,8,9 ตระกร้า
    productName: productName,
    price: price,
    check: false,
  };

  products.push(newProduct);  // เอาไปใส่ในตระกร้า
  displayProduct(newProduct);
  document.getElementById("form").reset(); //พิมพ์เสร็จแล้วให้ลบให้หน่อย
});


//Checked URL by RegEx
/**
 * The function `imageUrl` checks if the input URL ends with a valid image file extension (jpg, jpeg,
 * png, gif).
 * @param imgUrl - The `imageUrl` function takes in a parameter `imgUrl`, which is expected to be a URL
 * string pointing to an image file. The function then checks if the URL ends with a valid image file
 * extension (jpg, jpeg, png, gif) and returns a boolean value based on the result.
 * @returns The function `imageUrl` takes an image URL as input and returns `true` if the URL ends with
 * ".jpg", ".jpeg", ".png", or ".gif", and `false` otherwise.
 */
function imageUrl(imgUrl) {
  const input = new URL(imgUrl);
  return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
}

//Display Product //แม่พิมพ์การ์ด
/**
 * The function `displayProduct` creates a card element with product information and appends it to a
 * display section in the HTML document.
 * @param product - The `product` parameter in the `displayProduct` function represents an object
 * containing information about a specific product. It typically includes the following properties:
 */
function displayProduct(product) {
  const displaySection = document.getElementById("displaySection"); //in html
  const card = document.createElement("div"); //create div empty
  card.className = "flex bg-white p-4 rounded-lg shadow-lg justify-start";

  card.innerHTML = `
  
<input type="checkbox" class="mx-10 accent-cyan-500" data-id="${product.id}" onchange="calculateSelector(event)">
<img src="${product.imgUrl}" alt="${product.productName}"class="w-28 h-28 object-contain">
<div>
  <span class="flex justify-start items-center text-2xl mx-6">${product.productName}</span>
  <span class="text-xl flex justify-start mx-6">${product.price}$</span>
</div>

  `;

  displaySection.appendChild(card); //เอาข้อมูลมาใส่ในการ์ด
}

// PART 2 ADD CART

/**
 * The function `toggleSelector` toggles the `checked` property of a product based on the state of a
 * checkbox input.
 * @param event - The `event` parameter in the `toggleSelector` function is an event object that
 * represents an event being handled, such as a click event on a checkbox element.
 */
function toggleSelector(event) {
  const checkbox = event.target;
  const checkboxId = parseInt(checkbox.getAttribute("data-id"));
  const product = products.find((product) => product.id === checkboxId);

  if (checkbox.checked) {
    product.checked = true;
  } else {
    product.checked = false;
  }
}

/* The code snippet `document.getElementById("addbtn").addEventListener("click", () => {
  cart = products.filter((product) => product.checked);
  displayCart(cart);
});` is adding an event listener to the element with the id "addbtn". When this element is clicked,
it filters the products array to only include products that have been checked (based on the
`checked` property of each product). Then, it calls the `displayCart` function with the filtered
`cart` array as an argument to display the selected products in the cart section of the webpage. */
document.getElementById("addbtn").addEventListener("click", () => {
  cart = products.filter((product) => product.checked);
  displayCart(cart);
});

/* The function `displayCart(cart)` is clearing the inner HTML content of the element with the id
"displayCart". This is achieved by setting the `innerHTML` property of the `displayDiv` element to
an empty string, effectively removing all existing content inside the element. This step is
typically done before populating the element with new content related to the cart items that need to
be displayed. */
/**
 * The `displayCart` function in JavaScript dynamically creates and displays a shopping cart interface
 * based on the provided cart data.
 * @param cart - The `displayCart` function takes a `cart` parameter, which is an array of objects
 * representing products in a shopping cart. Each product object in the `cart` array should have the
 * following properties:
 */
function displayCart(cart) {
  const displayDiv = document.getElementById("displayCart");
  displayDiv.innerHTML = "";

  cart.forEach((product) => {
    const div = document.createElement("div");
    div.className = "flex bg-white p-4 rounded-lg shadow-lg justify-start";

    div.innerHTML = `

      <img src="${product.imgUrl}" alt="${product.productName}"class="w-28 h-28 object-contain">
    <div>
    <span class="flex justify-start items-center text-2xl mx-6">${product.productName}</span>
    <span class="text-xl flex justify-start mx-6">${product.price}$</span>
    

    <button
    type="submit"
    id="${product.id}"
    onclick="removeCard(${product.id})"
    class="btn btn-sm btn-error m-4"
  >Remove
  </button>
    </div>

    `;

    displayDiv.appendChild(div);
  });

  const btnDiv = document.getElementById("btnCal");
  btnDiv.innerHTML = `<button id="cfp" onclick="calculateBtn()" class="m-4 btn btn-secondary">Calculate Final Price</button>`;

  const totalDiv = document.getElementById("totalSection");
  totalDiv.innerHTML = `<h2 id="total" class="text-3xl mt-3 font-semibold">You have to pay:</h2>`;
}

/**
 * The `removeCard` function removes a product from the cart based on its ID and then displays the
 * updated cart.
 * @param productId - The `productId` parameter is the unique identifier of the product that needs to
 * be removed from the cart.
 */
function removeCard(productId) {
  cart = cart.filter((product) => product.id !== productId);
  displayCart(cart);
}
/**
 * The function `calculateSelector` toggles the `checked` property of a product based on the state of a
 * checkbox input.
 * @param event - The `event` parameter is an object that represents an event being handled by an event
 * listener in JavaScript. It contains information about the event that occurred, such as the target
 * element that triggered the event.
 */

function calculateSelector(event) {
  const checkbox = event.target;
  const checkboxId = parseInt(checkbox.getAttribute("data-id"));
  const product = products.find((product) => product.id === checkboxId);

  if (checkbox.checked) {
    product.checked = true;
  } else {
    product.checked = false;
  }
}

/**
 * The `calculateBtn` function calls the `calculateFinal` function with the `cart` parameter.
 */
//calculate Btn
function calculateBtn() {
  calculateFinal(cart);
}

/**
 * The function `calculateFinal` calculates the total price of products in a shopping cart and displays
 * it on the webpage.
 * @param cart - An array of objects representing products in a shopping cart. Each object has a
 * `price` property indicating the price of the product.
 */
function calculateFinal(cart) {
  let sum = 0;
  cart.forEach((product) => {
    sum += parseFloat(product.price);
  });
  const totalPrice = document.getElementById("total");
  totalPrice.textContent = `You have to pay: ${sum.toFixed(2)} $`;
}


