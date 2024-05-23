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
const formBox = document.getElementById("formBox");
const container = document.querySelector(".container");
const modalCard = document.getElementById("modalCard");

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
          container.style.marginTop = "100px";
          titleBox.style.display = "none";
          formBox.style.display = "block";
          // alert.style.display = "block";
          // hideAlert();
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

function getFormValues() {
  const formBox = document.querySelector("#formBox");
  const inputs = formBox.querySelectorAll("input, textarea, select");
  const values = {};

  inputs.forEach((input) => {
    if (input.type === "checkbox" || input.type === "radio") {
      values[input.id] = input.checked;
    } else if (input.tagName.toLowerCase() === "select") {
      values[input.id] = input.options[input.selectedIndex].value;
    } else {
      values[input.id] = input.value;
    }
  });

  return values;
}

document.querySelector("#orderButton").addEventListener("click", () => {
  console.log("click");
  formBox.style.display = "none";
  modalCard.style.display = "block";

  // const formValues = getFormValues();
  // console.log(formValues);
});

function displayOrderInfo(values) {
  document.querySelector(
    "#fullName"
  ).innerText = `Full name: ${values.name} ${values.surname}`;
  document.querySelector("#emailInfo").innerText = `Email: ${values.email}`;
  document.querySelector("#phoneInfo").innerText = `Phone: ${values.phone}`;
  document.querySelector("#cityInfo").innerText = `City: ${values.city}`;
  document.querySelector(
    "#addressInfo"
  ).innerText = `Address: ${values.address}`;
  document.querySelector(
    "#paymentMethodInfo"
  ).innerText = `Payment method: ${values.paymentMethod}`;
  document.querySelector(
    "#messageInfo"
  ).innerText = `Message: ${values.message}`;
}

document.querySelector("#orderButton").addEventListener("click", () => {
  const formValues = getFormValues();
  console.log(formValues);

  displayOrderInfo(formValues);
});
