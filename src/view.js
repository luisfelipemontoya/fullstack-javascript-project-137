import { subscribe } from "valtio/vanilla";
import i18next from "i18next";

const render = (state) => {
  const feedback = document.querySelector("#feedback");
  const feedsContainer = document.querySelector("#feeds");
  //const postsContainer = document.querySelector("#posts");

  feedback.textContent = state.form.error
    ? i18next.t(`errors.${state.form.error}`)
    : '';
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
};

const watch = (state) => {
  render(state);

  subscribe(state, () => {
    render(state);
  });
};

export default watch;
