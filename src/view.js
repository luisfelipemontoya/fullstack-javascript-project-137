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

  feedsContainer.innerHTML = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">Feeds</h2>
    </div>

      <ul class="list-group border-0 rounded-0">
      ${state.feeds
        .map(
          (feed) => `
            <li class="list-group-item border-0 border-end-0">
              <h3 class="h6 m-0">${feed.title}</h3>
              <p class="m-0 small text-black-50">${feed.description}</p>
            </li>
          `,
        )
        .join("")}
      </ul>
    </div>
    `;

  postsContainer.innerHTML = `
    <div class="card border-0">
        <div class="card-body">
          <h2 class="card-title h4">Posts</h2>
        </div>
        
      <ul class="list-group border-top-0 rounded-0">
      ${state.posts
        .map(
          (post) =>  {
            const isViewed = state.viewedPosts.includes(post.id);

            return `
            <li class="d-flex justify-content-between align-items-start mb-2">
              <a data-id="${post.id}" href="${post.link}" target="_blank" rel="noopener noreferrer" class="${isViewed ? 'fw-normal link-secondary' : 'fw-bold'}" 
              >
                ${post.title}
              </a>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-id="${post.id}"
              >
                Vista previa
              </button>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
};


const watch = (state) => {
  render(state);

  subscribe(state, () => {
    render(state);
  });
};

export default watch;
