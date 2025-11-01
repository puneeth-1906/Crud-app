let users = JSON.parse(localStorage.getItem('users')) || [];
let editIndex = -1;

const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userTableBody = document.getElementById('userTableBody');
const submitBtn = document.getElementById('submitBtn');

// Display users on load
displayUsers();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name && email) {
    if (editIndex === -1) {
      users.push({ name, email });
    } else {
      users[editIndex] = { name, email };
      editIndex = -1;
      submitBtn.textContent = "Add User";
    }

    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
    form.reset();
  }
});

function displayUsers() {
  userTableBody.innerHTML = "";
  users.forEach((user, index) => {
    const row = `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button class="action-btn" onclick="editUser(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
        </td>
      </tr>
    `;
    userTableBody.innerHTML += row;
  });
}

function editUser(index) {
  nameInput.value = users[index].name;
  emailInput.value = users[index].email;
  editIndex = index;
  submitBtn.textContent = "Update User";
}

function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
  }
}
