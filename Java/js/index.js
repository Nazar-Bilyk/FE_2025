const API_URL = 'https://jsonplaceholder.typicode.com/users';
const LOCAL_KEY = 'users_data';

const userList = document.getElementById('user-list');
const spinner = document.getElementById('spinner');
const editor = document.getElementById('editor');
const nameInput = document.getElementById('edit-name');
const usernameInput = document.getElementById('edit-username');
const phoneInput = document.getElementById('edit-phone');
const websiteInput = document.getElementById('edit-website');
const emailInput = document.getElementById('edit-email');
const saveBtn = document.getElementById('save-btn');

let selectedUser = null;
let originalData = {};
let localUsers = [];

const showSpinner = () => spinner.classList.add('active');
const hideSpinner = () => spinner.classList.remove('active');
const showEditor = () => {
  editor.classList.add('active');
  editor.style.display = 'flex';
  editor.style.width = '280px';
  editor.style.padding = '10px 0';
};
const hideEditor = () => {
  editor.classList.remove('active');
  editor.style.display = 'none';
  editor.style.width = '0';
  editor.style.padding = '0';
};

const saveToLocal = (users) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
};

const loadFromLocal = () => {
  const data = localStorage.getItem(LOCAL_KEY);
  return data ? JSON.parse(data) : null;
};

const createUserItem = (user) => {
  const li = document.createElement('li');
  li.className = 'user-card';
  li.dataset.id = user.id;

  const nameEl = document.createElement('h3');
  nameEl.textContent = user.name;

  const usernameEl = document.createElement('p');
  usernameEl.textContent = `@${user.username}`;

  const details = document.createElement('div');
  details.className = 'user-details';
  details.innerHTML = `
    <div><span>phone</span><span>${user.phone}</span></div>
    <div><span>website</span><span>${user.website}</span></div>
    <div><span>email</span><span>${user.email}</span></div>
  `;

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  editBtn.onclick = (e) => {
    e.stopPropagation();
    selectedUser = user;
    originalData = { ...user };
    nameInput.value = user.name;
    usernameInput.value = user.username;
    phoneInput.value = user.phone;
    websiteInput.value = user.website;
    emailInput.value = user.email;
    saveBtn.classList.remove('modified');
    showEditor();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    showSpinner();
    localUsers = localUsers.filter(u => u.id !== user.id);
    saveToLocal(localUsers);
    renderUsers(localUsers);
    hideEditor();
    hideSpinner();
  };

  actions.append(editBtn, deleteBtn);
  li.append(nameEl, usernameEl, details, actions);
  return li;
};

const renderUsers = (users) => {
  userList.innerHTML = '';
  users.forEach(user => {
    const userItem = createUserItem(user);
    userList.appendChild(userItem);
  });
};

const fetchUsers = async () => {
  showSpinner();
  const localData = loadFromLocal();
  if (localData) {
    localUsers = localData;
    renderUsers(localUsers);
  } else {
    const res = await fetch(API_URL);
    const users = await res.json();
    localUsers = users;
    saveToLocal(users);
    renderUsers(users);
  }
  hideSpinner();
};

const checkForChanges = () => {
  if (
    nameInput.value !== originalData.name ||
    usernameInput.value !== originalData.username ||
    phoneInput.value !== originalData.phone ||
    websiteInput.value !== originalData.website ||
    emailInput.value !== originalData.email
  ) {
    saveBtn.classList.add('modified');
  } else {
    saveBtn.classList.remove('modified');
  }
};

[nameInput, usernameInput, phoneInput, websiteInput, emailInput].forEach(input => {
  input.addEventListener('input', checkForChanges);
});

saveBtn.onclick = () => {
  if (!selectedUser) return;

  const updatedUser = {
    ...selectedUser,
    name: nameInput.value,
    username: usernameInput.value,
    phone: phoneInput.value,
    website: websiteInput.value,
    email: emailInput.value
  };

  showSpinner();
  localUsers = localUsers.map(u => u.id === updatedUser.id ? updatedUser : u);
  saveToLocal(localUsers);
  renderUsers(localUsers);

  selectedUser = null;
  hideEditor();
  hideSpinner();
};

fetchUsers();
