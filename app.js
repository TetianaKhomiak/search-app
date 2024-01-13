"use strict";

// https://api.github.com
// clientId - d9308aacf8b204d361fd
// secretId - 84969aeef73956f4ec9e8716d1840532802bb81b

const GITHUB_API_URL = "https://api.github.com";
const searchUser = document.querySelector(".searchUser");

class GitHubController {
  constructor(githubService, ui) {
    this.githubService = githubService;
    this.ui = ui;
  }

  async handleSearchInput(inputValue) {
    if (inputValue.trim() !== "") {
      const userData = await this.githubService.getUser(inputValue);

      if (userData.message) {
        this.ui.showAlert(userData.message, "alert alert-danger");
        return;
      }

      return this.ui.showProfile(userData);
    }

    this.ui.clearProfile();
  }
}

class GitHubService {
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

class UI {
  constructor() {
    this.profile = document.querySelector(".profile");
    this.alertContainer = document.querySelector(".search");
  }

  showProfile(user) {
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div class="repos"></div>
    `;
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
    }, 3000);
  }
}

const ui = new UI();
const githubService = new GitHubService(
  "8f7144eae7126087f5e2",
  "a32c98123e9a8179f28b396c0632a56672d9d55c"
);
const githubController = new GitHubController(githubService, ui);

searchUser.addEventListener("input", async (e) => {
  const inputValue = e.target.value;
  await githubController.handleSearchInput(inputValue);
});
