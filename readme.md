

### 1️⃣ Difference between `var`, `let`, and `const`

In JavaScript, `var`, `let`, and `const` are used to declare variables, but they behave differently.

* **var** is the old way of declaring variables. It is **function scoped** and allows **re-declaration and reassignment**, which can sometimes cause unexpected bugs.
* **let** was introduced in ES6. It is **block scoped**, meaning it only works inside the block `{ }` where it is declared. It allows **reassignment but not re-declaration**.
* **const** is also block scoped, but it **cannot be reassigned or redeclared**. It is mostly used when the value should remain constant.

Example:

```javascript
var a = 10;
let b = 20;
const c = 30;
```

In modern JavaScript development, developers usually prefer **const by default** and use **let when the value needs to change**.

---

### 2️⃣ What is the Spread Operator (`...`)?

The spread operator (`...`) is used to **expand elements of an array or object**. It helps copy, merge, or pass values easily.

Example with arrays:

```javascript
const arr1 = [1,2,3];
const arr2 = [...arr1];

console.log(arr2);
```

Output:

```
[1,2,3]
```

Example of merging arrays:

```javascript
const a = [1,2];
const b = [3,4];

const result = [...a, ...b];
```

Result:

```
[1,2,3,4]
```

It is commonly used in modern JavaScript to **copy arrays, merge arrays, and update objects without changing the original data**.

---

### 3️⃣ Difference between `map()`, `filter()`, and `forEach()`

These three methods are used to work with arrays.

**forEach()**

* Loops through each element in an array
* Does not return a new array
* Mostly used for side tasks like logging or updating the DOM

Example:

```javascript
numbers.forEach(num => console.log(num));
```

**map()**

* Creates a **new array** by transforming each element

Example:

```javascript
const doubled = numbers.map(num => num * 2);
```

**filter()**

* Creates a **new array with elements that match a condition**

Example:

```javascript
const even = numbers.filter(num => num % 2 === 0);
```



* `forEach()` → just loop
* `map()`  transform data
* `filter()`  select data

---

### 4️⃣ What is an Arrow Function?

An arrow function is a **shorter way to write functions** in JavaScript. It was introduced in ES6 and makes the code cleaner and easier to read.

Normal function:

```javascript
function add(a,b){
 return a + b;
}
```

Arrow function:

```javascript
const add = (a,b) => a + b;
```

Arrow functions are commonly used in **array methods like map(), filter(), and forEach()**.

Example:

```javascript
numbers.map(num => num * 2);
```

---

### 5️⃣ What are Template Literals?

Template literals are a modern way to create strings in JavaScript using **backticks (` `)** instead of quotes.

They allow **embedding variables and expressions inside strings** using `${}`.

Example:

```javascript
const name = "Mosharof";
const age = 20;

const text = `My name is ${name} and I am ${age} years old`;
```

Output:

```
My name is Mosharof and I am 20 years old
```

Template literals are very useful when **creating dynamic text or HTML in JavaScript applications**.
