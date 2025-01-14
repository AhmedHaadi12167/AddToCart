//Selection
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector(".cart-count");

let count = 0;
addToCartButtons.forEach((button) => {
  button.clicked = false;
  button.addEventListener("click", function () {
    if (!button.clicked) {
      cartCount.textContent++;
      button.clicked = true;

      return;
    }
    alert("Its already clicked");
  });
});
