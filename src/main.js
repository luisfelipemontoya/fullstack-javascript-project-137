import './style.css';
import { proxy } from 'valtio/vanilla';
import validateUrl from "./utils/validation.js";
import watch from "./view.js";
import initI18n from "./i18n.js";
import loadFeed from "./services/loadFeed.js";
import parseRss from "./utils/parseRss.js";
import updateFeeds from "./services/updateFeeds.js";
import * as bootstrap from "bootstrap";

const startApp = () => {
const state = proxy({
 feeds: [],
 posts: [],
 viewedPosts: [],
 ui: {
   modalPostId: null,
 },

 form: {
   error: null,
   success: null,

 },
});

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">

        <h1>RSS Reader</h1>

        <form>

          <label for="rss-url">
            RSS link
          </label>

          <div class="input-group">

            <input
              id="rss-url"
              name="url"
              aria-label="url"
              type="text"
              class="form-control"
              placeholder="https://example.com/feed.xml"
            >

            <button
              type="submit"
              class="btn btn-primary"
            >
              Añadir
            </button>

          </div>

          <p
            id="feedback"
            class="feedback"
          ></p>

        </form>

        <div id="feeds"></div>
        <div id="posts"></div>

       <div class="modal fade" id="previewModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title"></h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <p></p>
          </div>

          <div class="modal-footer">
            <a
              class="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leer completo
            </a>

            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
          >
          Cerrar
        </button>
      </div>

      </div>
    </div>
  </div>
`;
watch(state);

updateFeeds(state);

const modalElement = document.querySelector("#previewModal");
const modal = new bootstrap.Modal(modalElement);
const form = document.querySelector('form');
const input = document.querySelector('#rss-url');

document.addEventListener("click", (e) => {
  const button = e.target.closest("[data-id]");

  if (!button) {
    return;
  }

  const { id } = button.dataset;

  state.ui.modalPostId = id;

  if (!state.viewedPosts.includes(id)) {
    state.viewedPosts.push(id);
  }

  const post = state.posts.find((item) => item.id === id);

  modalElement.querySelector(".modal-title").textContent = post.title;

  modalElement.querySelector(".modal-body p").textContent =
    post.description;

  modalElement.querySelector(".modal-footer a").href =
    post.link;

  modal.show();
});

form.addEventListener('submit', (e) => {
 e.preventDefault();

 state.form.success = null;

 const url = input.value;

  validateUrl(url,
    state.feeds.map((feed) => feed.url),
  )
  .then(() => loadFeed(url))
    .then((response) => {
        const data = parseRss(response.data.contents);
        state.feeds.push({
          ...data.feed,
        url,
        });
        state.posts.push(...data.posts);

        state.form.error = null;
        state.form.success = 'loaded';

        input.value = "";
        input.focus();
      })
    .catch((error) => {
      if (error.isAxiosError) {
        state.form.error = 'networkError';
        return;
      }
      state.form.error = error.message;
    });
});
};

initI18n().then(startApp);
