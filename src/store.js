import "../style.css";

// import { productCategories } from "./products";
// import { hideAlert } from "./helpers";

import { productCategories } from "../src/products";
import { hideAlert } from "../src/helpers";

const buttons = document.querySelectorAll(".buttons");
const ul = document.getElementById("ul");
const box = document.getElementById("box");
const label = document.getElementById("label");
const alert = document.getElementById("alert");
const titleBox = document.getElementById("title-box");

const getProductsByCategory = (category, subcategory) => {
  if (productCategories[category] && productCategories[category][subcategory]) {
    return productCategories[category][subcategory];
  }
  return [];
};

const renderProductData = (data) => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      box.innerHTML = "";
      data.forEach((product, index) => {
        const productDiv = document.createElement("div");
        const cardBody = document.createElement("div");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        const btnBuy = document.createElement("button");
        productDiv.classList.add("card");
        cardBody.classList.add("card-body");
        h2.classList.add("card-header");
        p.classList.add("text-content2");
        btnBuy.className = "btn, btn-primary custom";
        btnBuy.innerHTML = "Buy";
        h2.innerHTML = `${index + 1}. ${product.title}`;
        p.innerHTML = `Price: ${product.price}$`;
        cardBody.appendChild(h2);
        cardBody.appendChild(p);
        cardBody.appendChild(btnBuy);
        productDiv.appendChild(cardBody);
        box.appendChild(productDiv);
        btnBuy.addEventListener("click", () => {
          titleBox.style.display = "none";
          alert.style.display = "block";
          hideAlert();
        });
      });
      box.style.display = "block";
    });
  });
};

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const category = event.target.getAttribute("data-category");
    const subcategory = event.target.getAttribute("data-subcategory");

    if (category && subcategory) {
      const data = getProductsByCategory(category, subcategory);
      renderProductData(data);
    }
  });
});

label.addEventListener("click", () => {
  box.style.display = "none";
});
