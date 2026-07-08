import { subscribe } from "valtio/vanilla";
import i18next from "i18next";

const render = (state) => {
  const feedback = document.querySelector("#feedback");
  const feedsContainer = document.querySelector("#feeds");
  const postsContainer = document.querySelector("#posts");

if (state.form.error) {
  feedback.textContent = i18next.t(`errors.${state.form.error}`);
} else if (state.form.success) {
  feedback.textContent = i18next.t(`success.${state.form.success}`);
} else {
  feedback.textContent = "";
}
if (state.feeds.length > 0) {
    feedsContainer.innerHTML = `
      <h2>Feeds</h2>
      ${state.feeds
        .map(
          (feed) => `
            <div>
              <h3>${feed.title}</h3>
              <p>${feed.description}</p>
            </div>
          `,
        )
        .join("")}
    `;
  }

if (state.posts.length > 0) {
  postsContainer.innerHTML = `
    <h2>Posts</h2>
    <ul>
      ${state.posts
        .map(
          (post) => `
            <li>
              <a href="${post.link}" target="_blank" rel="noopener noreferrer">
                ${post.title}
              </a>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;
}
};

const watch = (state) => {
  render(state);

  subscribe(state, () => {
    render(state);
  });
};

export default watch;
