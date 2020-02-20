// https://api.github.com/users/chaharshivam/subscriptions
function fetchUserInfo(username) {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(res => topFour(res))
    .catch(err => console.log(err));
}

function drawInfo(data) {
  let userInfo = ``;

  const NUM_INFO_ITEMS = 4;
  new Array(NUM_INFO_ITEMS).fill('').forEach((_, idx) => {
    const { name, stargazers_count, forks, description } = data[idx];
    const infoItem = `
        <li>
            <h3 class="repo-title">${name}</h3>
            <span class="forks">
                <i class="fas fa-code-branch"></i>
                <span class="fork-count">${forks}</span>
            </span>
            <span class="stars">
                <i class="fas fa-star"></i>
                <span class="star-count">${stargazers_count}</span>
            </span>
            <p class="repo-description">${description || '(no description)'}</p>
        </li>
        `;
    userInfo += infoItem;
  });

  document.querySelector('.user-repos ul').innerHTML = userInfo;
}
function topFour(data) {

  const sortedData = [...data].sort(
    (b, a) => a.forks + a.stargazers_count - (b.forks + b.stargazers_count),
  );


  const TOP_FOUR_REPOS = sortedData.slice(0, 4);
  drawInfo(TOP_FOUR_REPOS);
}
