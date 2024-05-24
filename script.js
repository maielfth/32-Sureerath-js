let products = []; //product cart
let id = 0; //id=0 add -->1

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); //id: form value=submit

  const productName = document.getElementById("productName").value; //id in html
  const price = document.getElementById("price").value;
  const imgUrl = document.getElementById("imgurl").value;

  if (!imageUrl(imgUrl)) {
    alert("Please enter a valid image URL.");
    return;
  } //if add wrong please alert them

  const newProduct = {
    id: ++id,
    imgUrl: imgUrl, //same with 7,8,9 ตระกร้า
    productName: productName,
    price: price,
    check: false,
  };

  products.push(newProduct); // เอาไปใส่ในตระกร้า
  displayProduct(newProduct);
  document.getElementById("form").reset(); //พิมพ์เสร็จแล้วให้ลบให้หน่อย
});

//Checked URL

function imageUrl(imgUrl) {
  const input = new URL(imgUrl);
  return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
}

//Display Product //แม่พิมพ์การ์ด

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

// ADD CART

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

document.getElementById("addbtn").addEventListener("click", () => {
  cart = products.filter((product) => product.checked);
  displayCart(cart);
});

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

function removeCard(productId) {
  cart = cart.filter((product) => product.id !== productId);
  displayCart(cart);
}

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

//calculate Btn
function calculateBtn() {
  calculateFinal(cart);
}

function calculateFinal(cart) {
  let sum = 0;
  cart.forEach((product) => {
    sum += parseFloat(product.price);
  });
  const totalPrice = document.getElementById("total");
  totalPrice.textContent = `You have to pay: ${sum.toFixed(2)} $`;
}
