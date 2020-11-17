const faker = require('faker');

const userList = document.querySelector('ul');
//console.log(faker);
let current = window.location.hash.slice(1) * 1;
let users;

const data = window.localStorage.getItem('users');
if (data) {
  users = JSON.parse(data);
} else {
  users = new Array(5).fill('').map((_) => {
    return faker.helpers.userCard();
  });
  window.localStorage.setItem('users', JSON.stringify(users));
}
console.log(users, 'users');
const render = () => {
  const html = `
  ${users
    .map(
      (user, index) => `
    <li><a href="#${index}">${user.name}</a>
      ${
        current === index
          ? `
          <ul>
            <li>Address: ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</li>
            <li>Company Name:${user.company.name}</li>
            <li>Email: ${user.email}</li>
            <li>Phone:${user.phone}</li>
            <li>Website:${user.website}</li>
          </ul>`
          : ''
      }
    
    
    </li>

    `
    )
    .join('')}`;
  userList.innerHTML = html;
};

render();

window.addEventListener('hashchange', () => {
  current = window.location.hash.slice(1) * 1;
  render();
});
