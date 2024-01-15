// "use strict";
// // to get githubAPI https://github.com/settings/developers
// // https://api.github.com
// // clientId - d9308aacf8b204d361fd
// // secretId - 84969aeef73956f4ec9e8716d1840532802bb81b

// const GITHUB_API_URL = "https://api.github.com";
// const searchUser = document.querySelector(".searchUser");
// // const PERSONAL_ACCESS_TOKEN =
// //   "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";

// class GitHubController {
//   constructor(githubService, ui) {
//     this.githubService = githubService;
//     this.ui = ui;
//     this.timerId = null;
//   }

//   async handleSearchInput(inputValue) {
//     clearTimeout(this.timerId);
//     if (inputValue.trim() !== "") {
//       const userData = await this.githubService.getUser(inputValue);
//       const userRepos = await this.githubService.getRepos(inputValue);
//       console.log(userData);
//       if (userData.message) {
//         // this.ui.showAlert(userData.message, "alert alert-danger"); //alert alert-danger - це клас bootstrap
//         // return;

//         this.timerId = setTimeout(() => {
//           this.ui.showAlert(userData.message, "alert alert-danger");
//         }, 500);
//         return;
//       }

//       return this.ui.showProfile(userData, userRepos);
//     }

//     this.ui.clearProfile(); // видаляє профайл зі сторінки, коли ми очищаємо інпут
//   }
// }

// class GitHubService {
//   constructor(clientId, secretId) {
//     this.clientId = clientId;
//     this.secretId = secretId;
//   }

//   async getUser(userName) {
//     const response = await fetch(
//       `${GITHUB_API_URL}/users/${userName}?client_id=${this.clientId}&client_secret=${this.secretId}`
//     );

//     const user = await response.json();

//     return user;
//   }

//   async getRepos(userName) {
//     const response = await fetch(
//       `${GITHUB_API_URL}/users/${userName}/repos?sort=created&client_id=${this.clientId}&client_secret=${this.secretId}`
//     );

//     const repos = await response.json();
//     console.log(repos);
//     return repos;
//   }
// }

// class UI {
//   constructor() {
//     this.profile = document.querySelector(".profile");
//     this.alertContainer = document.querySelector(".search");
//   }

//   showProfile(user, repos) {
//     this.profile.innerHTML = `
//       <div class="card card-body mb-3">
//         <div class="row">
//           <div class="col-md-3">
//             <img class="img-fluid mb-2" src="${user.avatar_url}">
//             <a href="${
//               user.html_url
//             }" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
//           </div>
//           <div class="col-md-9">
//             <span class="badge badge-primary">Public Repos: ${
//               user.public_repos
//             }</span>
//             <span class="badge badge-secondary">Public Gists: ${
//               user.public_gists
//             }</span>
//             <span class="badge badge-success">Followers: ${
//               user.followers
//             }</span>
//             <span class="badge badge-info">Following: ${user.following}</span>
//             <br><br>
//             <ul class="list-group">
//               <li class="list-group-item">Company: ${user.company}</li>
//               <li class="list-group-item">Website/Blog: ${user.blog}</li>
//               <li class="list-group-item">Location: ${user.location}</li>
//               <li class="list-group-item">Member Since: ${user.created_at}</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <h3 class="page-heading mb-3">Latest Repos</h3>
//       <div class="repos">
//       ${repos
//         .slice(0, 5)
//         .map(
//           (repo) =>
//             `<p>${repo.name}: <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>`
//         )
//         .join("")}
//     </div>
//     `;
//   }

//   clearProfile() {
//     this.profile.innerHTML = "";
//   }

//   showAlert(message, className) {
//     const div = document.createElement("div");

//     div.className = className;
//     div.innerHTML = message;

//     this.alertContainer.before(div);

//     this.clearAlert(div);
//   }

//   clearAlert(alert) {
//     setTimeout(() => {
//       alert.remove();
//     }, 2000);
//   }
// }

// const ui = new UI();
// const githubService = new GitHubService(
//   "Iv1.98814f93824cd127",
//   "72b8a59ceebfa44e432877d0f8c00837c6e93984"
//   // "d5217454c81aadfc886b",
//   // "dfb244b437ea81b7b0948952329f493c7ee819a9"
// );
// const githubController = new GitHubController(githubService, ui);

// let timerId;
// searchUser.addEventListener("input", async (e) => {
//   const inputValue = e.target.value;
//   clearTimeout(timerId);
//   timerId = setTimeout(async () => {
//     await githubController.handleSearchInput(inputValue);
//   }, 500);
//   // await githubController.handleSearchInput(inputValue); //response.handleSearchInput(inputValue);
// });

"use strict";
// to get githubAPI https://github.com/settings/developers
// https://api.github.com
// clientId - d9308aacf8b204d361fd
// secretId - 84969aeef73956f4ec9e8716d1840532802bb81b

const GITHUB_API_URL = "https://api.github.com";
const searchUser = document.querySelector(".searchUser");

class GitHubController {
  constructor(githubServiceUser, gitHubServiceRepos, ui) {
    this.gitHubServiceUser = githubServiceUser;
    this.gitHubServiceRepos = gitHubServiceRepos;
    this.ui = ui;
    this.timerId = null;
  }

  async handleSearchInput(inputValue) {
    clearTimeout(this.timerId);

    if (inputValue.trim() !== "") {
      const userData = await this.gitHubServiceUser.getUser(inputValue);
      //console.log(userData);
      if (userData.message) {
        this.timerId = setTimeout(() => {
          this.ui.showAlert(userData.message, "alert alert-danger");
        }, 500);
        return;
      } else if (userData.html_url) {
        this.ui.showProfile(userData);
        const userRepos = await this.gitHubServiceRepos.getRepos(inputValue);

        return this.ui.showRepos(userRepos);
      }
    }

    this.ui.clearProfile(); // видаляє профайл зі сторінки, коли ми очищаємо інпут
  }
}

class GitHubServiceUser {
  constructor(clientId, secretId) {
    this.clientId = clientId;
    this.secretId = secretId;
  }

  async getUser(userName) {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${userName}?client_id=${this.clientId}&client_secret=${this.secretId}`
    );

    const user = await response.json();

    return user;
  }
}

class GitHubServiceRepos extends GitHubServiceUser {
  constructor(clientId, secretId) {
    super(clientId, secretId);
  }
  async getRepos(userName) {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${userName}/repos?sort=created&client_id=${this.clientId}&client_secret=${this.secretId}`
    );

    const repos = await response.json();
    console.log(repos);
    return repos;
  }
}

class UI {
  constructor() {
    this.profile = document.querySelector(".profile");
    this.alertContainer = document.querySelector(".search");
  }

  formatDate(date) {
    const formattedDate = new Date(date).toLocaleDateString("en-GB");
    return formattedDate;
  }

  showProfile(user) {
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${
              user.html_url
            }" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${
              user.public_repos
            }</span>
            <span class="badge badge-secondary">Public Gists: ${
              user.public_gists
            }</span>
            <span class="badge badge-success">Followers: ${
              user.followers
            }</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${this.formatDate(
                user.created_at
              )}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div class="repos"></div>
    `;
  }

  showRepos(repos) {
    this.profile.insertAdjacentHTML(
      "beforeend",
      ` ${repos
        .slice(0, 5)
        .map(
          (repo) =>
            `<p>${repo.name}: <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>`
        )
        .join("")}`
    );
  }

  clearProfile() {
    this.profile.innerHTML = "";
  }

  showAlert(message, className) {
    const div = document.createElement("div");

    div.className = className;
    div.innerHTML = message;

    this.alertContainer.before(div);

    this.clearAlert(div);
  }

  clearAlert(alert) {
    setTimeout(() => {
      alert.remove();
    }, 2000);
  }
}

const ui = new UI();
const gitHubServiceUser = new GitHubServiceUser(
  "Iv1.98814f93824cd127",
  "72b8a59ceebfa44e432877d0f8c00837c6e93984"
  // "d5217454c81aadfc886b",
  // "dfb244b437ea81b7b0948952329f493c7ee819a9"
);

const gitHubServiceRepos = new GitHubServiceRepos();

const githubController = new GitHubController(
  gitHubServiceUser,
  gitHubServiceRepos,
  ui
);

let timerId;
searchUser.addEventListener("input", async (e) => {
  const inputValue = e.target.value;
  clearTimeout(timerId);
  timerId = setTimeout(async () => {
    await githubController.handleSearchInput(inputValue);
  }, 500);
  // await githubController.handleSearchInput(inputValue); //response.handleSearchInput(inputValue);
});
