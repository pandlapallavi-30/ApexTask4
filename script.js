// ------- Navigation -------
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ------- To-Do App -------
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  displayProducts(products);
});

function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(input.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  loadTasks();
}

function loadTasks() {
  let list = document.getElementById("taskList");
  if (!list) return;
  list.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="deleteTask(${index})">❌</button>`;
    list.appendChild(li);
  });
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// ------- Products -------
const products = [
  { name: "Laptop", category: "electronics", price: 50000, rating: 4.5 },
  { name: "Smartphone", category: "electronics", price: 30000, rating: 4.7 },
  { name: "T-Shirt", category: "fashion", price: 800, rating: 4.2 },
  { name: "Shoes", category: "fashion", price: 2000, rating: 4.8 },
];

function displayProducts(list) {
  const container = document.getElementById("productList");
  if (!container) return;
  container.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<h3>${p.name}</h3><p>₹${p.price}</p><p>⭐ ${p.rating}</p>`;
    container.appendChild(div);
  });
}

function filterProducts() {
  let category = document.getElementById("categoryFilter").value;
  let sort = document.getElementById("sortOption").value;

  let filtered = products.filter(p => category === "all" || p.category === category);

  if (sort === "priceLow") filtered.sort((a, b) => a.price - b.price);
  if (sort === "priceHigh") filtered.sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  displayProducts(filtered);
}
