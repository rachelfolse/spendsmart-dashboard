const supabaseUrl = "https://gouvhqakxuofilgykoji.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdXZocWFreHVvZmlsZ3lrb2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTM0MDksImV4cCI6MjA4Nzg2OTQwOX0.Xw7O7YvDzqRTNxyy0d87v1PGhDld6rqObh7lVz81zpQ";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

let expenses = [];

async function loadExpenses() {
    const { data, error } = await supabaseClient
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: false });
  
    if (error) {
      console.error(error);
      return;
    }
  
    expenses = data;
    renderExpenses();
  }

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
        <button onclick="deleteExpense('${expense.id}')">Delete</button>
      `;
  
      list.appendChild(li);
    });
  
    totalDisplay.textContent = total.toFixed(2);
  }  

  async function deleteExpense(id) {
    const { error } = await supabaseClient
      .from("expenses")
      .delete()
      .eq("id", id);
  
    if (error) {
      console.error(error);
      return;
    }
  
    loadExpenses();
  }

const clearButton = document.getElementById("clear");

if (clearButton) {
  clearButton.addEventListener("click", async () => {

    console.log("Clear clicked");  // 👈 add here for debugging

    const { error } = await supabaseClient
      .from("expenses")
      .delete()
      .not("id", "is", null);   // 👈 safer delete-all

    if (error) {
      console.error(error);
      return;
    }

    loadExpenses();  // reload after successful delete
  });
}

const form = document.getElementById("expense-form");

if (form) {
    form.addEventListener("submit", async function(e)  {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const { error } = await supabaseClient
    .from("expenses")
    .insert([{ amount, description, category }]);
  
  if (error) {
    console.error(error);
    return;
  }
  
  window.location.href = "index.html";
    
});
}

loadExpenses();

  