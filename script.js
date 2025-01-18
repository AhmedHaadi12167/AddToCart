//Selection
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector(".cart-count");
const cartDropdown = document.querySelector(".cart-dropdown");
const cartItems = document.querySelector(".cart-items");
const totalAmount = document.getElementById("total-amount");

const items = {
  item: [],
};

const saveItems = function () {
  localStorage.setItem("items", JSON.stringify(items.item));
};

const formatPrice = (price) => parseFloat(price.replace(/[^0-9.-]+/g, ""));

//Event Listener
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const product = button.parentElement;
    const productImage = product.querySelector("img").src;
    const productName = product.querySelector(".product-name").textContent;
    const productPrice = product.querySelector(".product-price").textContent;

    const item = {
      image: productImage,
      name: productName,
      quantity: 1,
      price: productPrice,
      quantity: 1,
    };

    const isDuplicate = items.item.some(
      (i) =>
        i.name === item.name && i.price === item.price && i.image === item.image
    );

    if (isDuplicate) {
      alert(`Item ${item.name} is already in the cart`);
      return;
    }
    items.item.push(item);

    cartCount.textContent = items.item.length;
    saveItems();
    loadItems();
  });
});

const loadItems = function () {
  const data = localStorage.getItem("items");
  if (!data) return;

  items.item = JSON.parse(data);

  cartItems.innerHTML = "";
  totalAmount.textContent = "$0";

  items.item.forEach((item, index) => {
    const li = document.createElement("li");
    const image = document.createElement("img");
    const spanName = document.createElement("span");
    const spanPrice = document.createElement("span");
    const removeButton = document.createElement("button");
    const minusButton = document.createElement("button");
    const plusButton = document.createElement("button");
    const quantity = document.createElement("span");

    quantity.textContent = item.quantity;
    cartCount.textContent = items.item.length;

    minusButton.classList.add("cart-icon", "minus");
    minusButton.innerHTML = `<i class="fas fa-minus"></i>`;
    plusButton.classList.add("cart-icon", "plus");
    plusButton.innerHTML = `<i class="fas fa-plus"></i>`;
    removeButton.classList.add("cart-icon", "remove");
    removeButton.innerHTML = `<i class="fas fa-trash"></i>
`;

    li.append(
      image,
      spanName,
      minusButton,
      quantity,
      plusButton,
      spanPrice,
      removeButton
    );

    image.style.width = "50px";
    image.style.height = "50px";

    cartItems.appendChild(li);
    image.src = item.image;

    spanName.textContent = item.name;
    spanPrice.textContent = item.price;
    const currentTotal = formatPrice(totalAmount.textContent);
    const itemPrice = formatPrice(item.price);
    totalAmount.textContent = `$${currentTotal + itemPrice * item.quantity}`;

    removeButton.addEventListener("click", function () {
      items.item.splice(index, 1);
      cartCount.textContent = items.item.length;
      saveItems();
      loadItems();
    });

    plusButton.addEventListener("click", function () {
      item.quantity++;
      quantity.textContent = item.quantity;
      const currentTotal = formatPrice(totalAmount.textContent);
      const newTotal = currentTotal + itemPrice;
      totalAmount.textContent = `$${newTotal}`;
      saveItems();
    });

    minusButton.addEventListener("click", function () {
      if (item.quantity > 1) {
        item.quantity--;
        quantity.textContent = item.quantity;
        const currentTotal = formatPrice(totalAmount.textContent);
        const newTotal = currentTotal - itemPrice;
        totalAmount.textContent = `$${newTotal}`;
        saveItems();
      }
    });
  });
};

cartCount.addEventListener("click", function () {
  if (
    cartDropdown.style.display === "none" ||
    cartDropdown.style.display === ""
  ) {
    cartDropdown.style.display = "block";
  } else {
    cartDropdown.style.display = "none";
  }

  cartItems.innerHTML = "";
  loadItems();
});

document.addEventListener("DOMContentLoaded", loadItems);

// localStorage.removeItem("items");
