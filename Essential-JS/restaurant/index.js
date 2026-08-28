import { menuArray } from "./data.js";

const menuContainer = document.getElementById("menu-container");
const orderListItems = document.getElementById("order-list-items");
const totalPrice = document.getElementById("total-price");
const thankYouMessage = document.getElementById("thank-you-message");

let orderTotal = 0;

function checkOrderDisplay(){
    if (orderTotal === 0) {
        document.querySelector("section.order-container").style.display = "none";
    } else {
        document.querySelector("section.order-container").style.display = "block";
    }
}

function getItems() {
    return menuArray.map(item => `
        
            <div class="menu-item">
                <section class="card">
                    <span class="emoji">${item.emoji}</span>

                    <div class="menu-content">
                        <p class="menu-name">${item.name}</p>
                        <p class="menu-ingredients dull">
                            ${item.ingredients.join(", ")}
                        </p>
                        <p class="menu-price">$${item.price}</p>
                    </div>
                </section>

                <div class="add-button-container" role="button" aria-label="Add ${item.name} to order" data-id="${item.id}">
                    <span class="add-button">
                        +
                    </span>
                </div>
            </div>
        
    `).join("");
}

function getOrder(itemId) {
    return menuArray.filter((item) => item.id === itemId);
}

function incrementOrderTotal(price) {
    orderTotal += price;
    totalPrice.textContent = `$${orderTotal}`;
}


function renderOrder(orderItem) {
    orderListItems.innerHTML += `
                        <section class="order-render">
                            <div class="order-list-item">
                                <p>${orderItem[0].name}</p>
                                <p class="remove-button dull" role="button" aria-label="remove" data-remove="${orderItem[0].name}">remove</p>
                            </div>
                            <div class="order-price">
                                <p class="menu-price">$${orderItem[0].price}</p>
                            </div>
                        </section>
                `;
    incrementOrderTotal(orderItem[0].price);
}

checkOrderDisplay()
menuContainer.innerHTML = getItems();

menuContainer.addEventListener("click", function(event) {
    if (event.target.closest(".add-button-container")) {
        thankYouMessage.style.display = "none";
        const button = event.target.closest(".add-button-container");
        console.log("Add button clicked for item with ID:", button.dataset.id);
        const itemId = parseInt(button.dataset.id);
        const orderItem = getOrder(itemId);
        renderOrder(orderItem);
        checkOrderDisplay();

        document.querySelector(".order-container")
            .scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

    }
});

document.addEventListener("click", function(event) {
    if (event.target.closest(".remove-button")) {
        const removeButton = event.target.closest(".remove-button");
        const itemName = removeButton.dataset.remove;
        const orderItem = menuArray.find(item => item.name === itemName);
        if (orderItem) {
            orderTotal -= orderItem.price;
            totalPrice.textContent = `$${orderTotal}`;
            removeButton.closest(".order-render").remove();
            checkOrderDisplay();
        }
    }
});

const completeOrderBtn = document.getElementById("complete-order-btn");
const loginForm = document.getElementById("login-form");
const payBtn = document.getElementById("pay-btn");

completeOrderBtn.addEventListener("click", function() {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
});

const closeModalBtn = document.getElementById("close");
closeModalBtn.addEventListener("click", function() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
});


loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const loginFormData = new FormData(loginForm);
    console.log(Object.fromEntries(loginFormData.entries()));
});

payBtn.addEventListener("click", function() {
    const modal = document.getElementById("modal");
    const orderRenders = document.querySelectorAll(".order-render");
    orderRenders.forEach(orderRender => orderRender.remove());
    modal.classList.add("hidden");


    document.querySelector(".thank-you-message")
    .scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
    thankYouMessage.style.display = "block";
});