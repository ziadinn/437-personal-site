const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

const productListSection = document.querySelector(".product-list");
const cartItemsContainer = document.querySelector(".cart-items");

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = product.imageSrc;
    img.alt = product.name;
    article.appendChild(img);

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("product-details");

    const title = document.createElement("h3");
    title.textContent = product.name;
    detailsDiv.appendChild(title);

    const desc = document.createElement("p");
    desc.textContent = product.description;
    detailsDiv.appendChild(desc);

    const priceP = document.createElement("p");
    priceP.classList.add("price");
    priceP.textContent = `$${product.price}`;
    detailsDiv.appendChild(priceP);

    const actionDiv = document.createElement("div");

    const buyBtn = document.createElement("button");
    buyBtn.classList.add("buy-button");
    buyBtn.textContent = "Add to cart";
    buyBtn.addEventListener("click", () => {
        product.numInCart += 1;
        rerenderAllProducts();
        rerenderCart();
    });
    actionDiv.appendChild(buyBtn);

    if (product.numInCart > 0) {
        const numSpan = document.createElement("span");
        numSpan.classList.add("num-in-cart");
        numSpan.textContent = `${product.numInCart} in cart`;
        actionDiv.appendChild(numSpan);
    }

    detailsDiv.appendChild(actionDiv);
    article.appendChild(detailsDiv);

    return article;
}

/**
 * Helper to clear all child nodes of an element.
 */
function clearElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    if (!productListSection) return;
    clearElement(productListSection);

    const heading = document.createElement("h2");
    heading.textContent = "Search results";
    productListSection.appendChild(heading);

    for (const product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            const card = renderProductCard(product);
            productListSection.appendChild(card);
        }
    }
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    if (!cartItemsContainer) return;
    clearElement(cartItemsContainer);

    for (const product of PRODUCTS) {
        if (product.numInCart > 0) {
            const itemP = document.createElement("p");
            itemP.textContent = `${product.name} x${product.numInCart}`;
            cartItemsContainer.appendChild(itemP);

            const removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-button");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", () => {
                if (product.numInCart > 0) product.numInCart -= 1;
                rerenderAllProducts();
                rerenderCart();
            });
            cartItemsContainer.appendChild(removeBtn);
        }
    }
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const minStr = minPriceInput?.value ?? "";
    const maxStr = maxPriceInput?.value ?? "";

    let minVal = Number.parseFloat(minStr);
    if (Number.isNaN(minVal)) minVal = undefined;
    let maxVal = Number.parseFloat(maxStr);
    if (Number.isNaN(maxVal)) maxVal = undefined;

    if (minVal !== undefined && product.price < minVal) return false;
    if (maxVal !== undefined && product.price > maxVal) return false;
    return true;
}

// Listen to filter changes to rerender
[minPriceInput, maxPriceInput].forEach((input) => {
    input?.addEventListener("change", () => {
        rerenderAllProducts();
    });
});

// Initial render
rerenderAllProducts();
rerenderCart();
