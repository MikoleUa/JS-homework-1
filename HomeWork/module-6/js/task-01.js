const allCategories = document.querySelectorAll(".item");
console.log(`Number of categories: ${allCategories.length} `);

const titleFirstCategory = document.querySelectorAll(".item h2");
const listFirstCategory = allCategories[0].querySelectorAll("li");
console.log(
  `Category: ${titleFirstCategory[0].textContent}
Elements ${listFirstCategory.length}`
);
console.log(
  `Category: ${titleFirstCategory[1].textContent}
Elements ${allCategories[1].querySelectorAll("li").length}`
);
console.log(
  `Category: ${titleFirstCategory[2].textContent} Elements ${
    allCategories[2].querySelectorAll("li").length
  }`
);
