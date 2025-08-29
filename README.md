# CartStorage - Документація

`CartStorage` - це гнучкий клас для управління кошиком покупок з автоматичним збереженням в `localStorage`.

---

### 🚀 Швидкий старт

```javascript
// Стандартне використання
const cart = new CartStorage();

// Додаємо товар
cart.addItem({
  id: "1",
  name: "iPhone 15",
  price: 999,
  quantity: 1,
});
```

---

🔗 Підключення

1. GitHub (manual import)

```javascript
<script src="https://raw.githubusercontent.com/MikoleUa/cart-storage/main/dist/cart-storage.js"></script>
```

2. ESM CDN (modern projects)

```javascript
<script type="module">
  import {CartStorage} from
  'https://cdn.jsdelivr.net/gh/MikoleUa/cart-storage@main/dist/cart-storage.esm.js';
</script>
```

⚙️ Ініціалізація CartStorage

При створенні кошика через конструктор:
new CartStorage(storageKey, fieldMap)
storageKey (string, необов'язковий) – ключ для localStorage, за замовчуванням "cart".
fieldMap (object, необов'язковий) – мапа полів для роботи з різними API.

Важливо про fieldMap:
Якщо передаєте fieldMap, він повинен містити три ключі:
  - id – поле, де зберігається унікальний ідентифікатор товару
  - price – поле з ціною
  - quantity – поле з кількістю
Якщо fieldMap не передано, CartStorage очікує стандартні поля у товарів:
 id, price, quantity.
 Додаткові поля (name, category, description тощо) зберігаються як є.

### 🗺️ fieldMap – схема
Стандартні поля CartStorage → Поля API
| CartStorage | API       | Примітка                    |
| ----------- | --------- | --------------------------- |
| id          | productId | унікальний ідентифікатор    |
| price       | cost      | ціна за одиницю             |
| quantity    | qty       | кількість                   |
| name        | title     | необов'язково, назва товару |

### ⚠️ Ключові поля в CartStorage

При додаванні товару в кошик:
Обов'язкові для додавання товару:
id – унікальний ідентифікатор товару
price – ціна за одиницю
quantity – кількість

Поле, яке створює CartStorage автоматично:
- total – загальна вартість товару (price \* quantity), **не передається вручну**
  Додаткові поля (зберігаються як є):
  title, name, description, specs, images та інші
Приклади ініціалізації:

```JavaScript
// 1. Стандартне використання - очікує поля: id, price, quantity
const cart = new CartStorage();
cart.addItem({
id: "phone-1", // обов'язкове ✅
price: 999, // обов'язкове ✅
quantity: 1, // обов'язкове ✅
name: "iPhone 15", // додаткове поле (зберігається) ✅
category: "electronics" // додаткове поле (зберігається) ✅
});
```
```JavaScript
// 2. З кастомним ключем localStorage
const cart = new CartStorage("shopping_cart");
```
```JavaScript
// 3. З мапою полів для API - мапуємо назви полів API на стандартні
const cart = new CartStorage("api_cart", {
id: "productId", // в API поле називається "productId"
price: "cost", // в API поле називається "cost"
quantity: "qty" // в API поле називається "qty"
});
```
```JavaScript
// Тепер можна додавати товари з API структурою
cart.addItem({
productId: "abc123", // замість "id"
cost: 999, // замість "price"
qty: 1, // замість "quantity"
title: "iPhone 15", // додаткове поле (зберігається як title)
category: "electronics" // додаткове поле (зберігається)
});
```

🛠️ Методи
| Метод | Опис | Поведінка | Вхідні параметри |
| ------------------------------ | ----------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------ |
| `addItem(item)` | Додає товар | Якщо товар з таким `id` вже є — оновлює кількість | `item` (object) — об’єкт товару з полями `id`, `price`, `quantity` та додатковими |
| `updateQuantity(id, quantity)` | Оновлює кількість товару | Якщо `quantity <= 0` — видаляє товар | `id` (string/number) — унікальний ідентифікатор, `quantity`(number) — нова кількість |
| `removeItem(id)` | Видаляє товар | Товар видаляється | `id` (string/number) — унікальний ідентифікатор |
| `clear()` | Очищає кошик | Всі товари видаляються | — |
| `getItems()` | Повертає масив товарів | Масив нормалізованих об’єктів | — |
| `getTotalQuantity()` | Повертає загальну кількість | Число — сума всіх `quantity` | — |
| `getTotalPrice()` | Повертає загальну суму | Число — сума `price * quantity` | — |
| `getSummary()` | Повертає повну інформацію про кошик | Об’єкт `{ items, totalQuantity, totalPrice }` | — |
| `onChange(callback)` | Підписка на зміни кошика | Викликає `callback` при будь-якій зміні | `callback(items)` — функція, де `items` — поточний стан кошика |
| `offChange(handler)` | Відписка від змін | Видаляє підписку | `handler` — обробник, повернений `onChange` |

🔄 Відстежування змін у кошику

CartStorage підтримує підписку на зміни стану кошика через onChange та відписку через offChange.
Це зручно, якщо потрібно автоматично оновлювати UI або виконувати інші дії після зміни кошика.

```javascript
// Підписка на зміни
const handler = cart.onChange(function);
```

```javascript
// Відписка
cart.offChange(handler);
```

onChange(callback) — додає підписку, повертає обробник для подальшого видалення.
offChange(handler) — видаляє підписку.

🔄 Chainable методи

Всі методи, що змінюють стан, можна викликати у ланцюжку:

```javascript
cart
  .addItem({ id: "1", name: "Product 1", price: 100, quantity: 1 })
  .addItem({ id: "2", name: "Product 2", price: 200, quantity: 2 })
  .updateQuantity("1", 3)
  .removeItem("2");
```

🔧 Робота з різними структурами API

Різні API можуть використовувати різні назви полів, але CartStorage завжди очікує 3 стандартні поля:
JSON

```javascript
// Стандартна структура (без fieldMap)
{ "id": "123", "price": 100, "quantity": 1,}
// API #1 - інші назви полів
{ "productId": "123", "cost": 100, "qty": 1, }
// API #2 - ще інші назви
{ "sku": "123", "unitPrice": 100, "amount": 1, }
```
Рішення - fieldMap

fieldMap - це мапа відповідності, яка говорить CartStorage де шукати потрібні дані:

```javascript
// Для API #1
const cart1 = new CartStorage("cart1", {
  id: "productId", // шукати ID в полі "productId"
  price: "cost", // шукати ціну в полі "cost"
  quantity: "qty", // шукати кількість в полі "qty"
});
```

```javascript
// Для API #2
const cart2 = new CartStorage("cart2", {
  id: "sku", // шукати ID в полі "sku"
  price: "unitPrice", // шукати ціну в полі "unitPrice"
  quantity: "amount", // шукати кількість в полі "amount"
});
```

```javascript
// Тепер можна працювати з будь-якою структурою
cart1.addItem({
  productId: "123",
  cost: 100,
  qty: 1,
  title: "Product", // title збережеться як додаткове поле
});
cart2.addItem({
  sku: "456",
  unitPrice: 200,
  amount: 2,
  productName: "Product", // productName збережеться як додаткове поле
});
```

⚠️ Обов'язкові ключі в fieldMap:
Якщо ви передаєте fieldMap, він повинен містити всі 3 ключі:

```javascript
// Неправильно - пропущений ключ "price" ❌
const cart = new CartStorage("cart", {
  id: "productId",
  quantity: "qty",
  // price відсутній!
});
// Правильно - всі 3 ключі присутні ✅
const cart = new CartStorage("cart", {
  id: "productId",
  price: "cost",
  quantity: "qty",
});
```

💾 Автоматичне збереження

Кошик автоматично зберігається в localStorage після кожної зміни:

```javascript
const cart1 = new CartStorage("main_cart");
const cart2 = new CartStorage("wishlist");

// Кожен кошик автоматично зберігається у localStorage і відновлюється при перезавантаженні
cart1.addItem({ id: "1", price: 100 }); // → localStorage["main_cart"]
cart2.addItem({ id: "2", price: 200 }); // → localStorage["wishlist"]
```

❌ Обробка помилок

Дублювання товарів

```javascript
cart.addItem({ id: "1", name: "Product", price: 100 });
cart.addItem({ id: "1", name: "Product", price: 100 });
// Console warning: Item with id "1" already exists. Updating quantity instead.
```

Відсутній id

```javascript
cart.addItem({ name: "Product", price: 100 });
// Error: Item must have a id field ❌
```

Якщо localStorage недоступний, помилка логується в консоль, але додаток не падає.

🎯 Приклади використання

```javascript
const cart = new CartStorage("shopping_cart");

// Додавання товару з каталогу
function addToCart(product) {
  try {
    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
    });

    // Оновити UI
    updateCartButton(product.id, true);
    showNotification(`${product.name} додано до кошика`);
  } catch (error) {
    if (error.message.includes("already in the cart")) {
      showNotification(`${product.name} вже в кошику`);
    }
  }
}

// Оновлення кількості в кошику
function updateCartItemQuantity(id, quantity) {
  cart.updateQuantity(id, quantity);
  renderCartSummary();
}
```

Інтеграція з API

```javascript
// Конфігурація під API
const apiCart = new CartStorage("api_cart", {
  id: "productId",
  name: "title",
  price: "unitPrice",
  quantity: "qty",
});

// Додавання товару з API відповіді
fetch("/api/products/123")
  .then((response) => response.json())
  .then((product) => {
    // API повертає: { productId, title, unitPrice, description, images }
    apiCart.addItem({
      ...product,
      qty: 1, // додаємо кількість
    });
  });
```

Множинні кошики

```javascript
const mainCart = new CartStorage("cart");
const wishlist = new CartStorage("wishlist");
const compareList = new CartStorage("compare");

// Переміщення з wishlist до кошика
function moveToCart(productId) {
  const item = wishlist.getItems().find((item) => item.id === productId);
  if (item) {
    wishlist.removeItem(productId);

    try {
      mainCart.addItem(item);
    } catch (error) {
      // Товар вже в кошику
      wishlist.addItem(item); // повертаємо назад
    }
  }
}
```
📋 Структура збережених даних

CartStorage нормалізує всі товари до стандартного формату:
```javascript
// Вхідні дані (будь-які поля)
cart.addItem({
productId: "abc123",
title: "MacBook Pro",
cost: 2500,
qty: 1,
description: "Powerful laptop",
specs: { ram: "16GB", storage: "512GB" },
images: ["url1.jpg", "url2.jpg"]
});
```
Збережена структура (нормалізована)
JSON
```javascript
{
"abc123": {
"id": "abc123",
"price": 2500,
"quantity": 1,
"total": 2500,
"title": "MacBook Pro",
"description": "Powerful laptop",
"specs": { "ram": "16GB", "storage": "512GB" },
"images": ["url1.jpg", "url2.jpg"]
}
}
```
