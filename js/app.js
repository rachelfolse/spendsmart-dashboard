let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
    const list = document.getElementById("expense-list");
    const totalDisplay = document.getElementById("total");
  
    if (!list || !totalDisplay) return;
  
    list.innerHTML = "";
    let total = 0;
  
    if (expenses.length === 0) {
      list.innerHTML = "<p>No expenses added yet.</p>";
      totalDisplay.textContent = "0.00";
      return;
    }
  
    expenses.forEach((expense, index) => {
      total += expense.amount;
  
      const li = document.createElement("div");
      li.classList.add("expense-item");
  
      li.innerHTML = `
        <span>${expense.description || "No description"} - $${expense.amount} (${expense.category})</span>
        <button onclick="deleteExpense(${index})">Delete</button>
      `;
  
      list.appendChild(li);
    });
  
    totalDisplay.textContent = total.toFixed(2);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }  

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

const clearButton = document.getElementById("clear");

if (clearButton) {
  clearButton.addEventListener("click", function() {
    expenses = [];
    localStorage.removeItem("expenses");
    renderExpenses();
  });
}

const form = document.getElementById("expense-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    expenses.push({ amount, description, category });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    window.location.href = "index.html";  
    
});
}

renderExpenses();

  