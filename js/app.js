const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

if (list && totalEl) {
    let total = 0;

    expenses.forEach(expense => {
     const li = document.createElement("li");
     li.textContent = `${expense.name}: $${expense.amount}` ;
     list.appendChild(li);
     total += Number(expense.amount);
    });
     totalEl.textContent = total.toFixed(2);
}

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const amount = document.getElementById("amount").value;

    expenses.push({ name, amount });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    window.location.href = "index.html";

    });
}

document.getElementById("clear")?.addEventListener("click", () => {
    localStorage.removeItem("expenses");
    location.reload();
  });
  