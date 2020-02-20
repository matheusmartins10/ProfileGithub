
const get = element => document.querySelector(element);

const ELEMENTS = {
  SEARCH: get('input[type="submit"]'),
  USERNAME: get('#user-input'),
  AVATAR: get('.avatar img'),
  NAME: get('.avatar p'),
  USR: get('#username'),
  FOLLOW: get('#followers'),
  REPOS: get('#repos'),
  SEARCHBAR: get('.search-profile'),
  CONTAINER: get('.user-container'),
};



function drawUser(user) {
  ELEMENTS.AVATAR.src = user.avatar_url;
  ELEMENTS.NAME.textContent = user.name;
  ELEMENTS.USR.textContent = user.login;
  ELEMENTS.FOLLOW.textContent = user.followers + ' followers';
  ELEMENTS.REPOS.textContent = user.public_repos + ' repos';

  ELEMENTS.CONTAINER.classList.remove('hidden');
}

const url = 'https://api.github.com/users/';
function fetchUser(username) {

  return fetch(`${url}${username}`);
}

function searchUser(event) {
  if (!ELEMENTS.USERNAME.value) {
    alert("Precisa colocar o seu username seu animal");
  } else {
    fetchUser(ELEMENTS.USERNAME.value)
      .then(res => res.json())
      .then(data => drawUser(data))
      .catch(err => console.error(err));
    fetchUserInfo(ELEMENTS.USERNAME.value);
    ELEMENTS.USERNAME.value = '';
  }
}

ELEMENTS.SEARCH.addEventListener('click', searchUser);
