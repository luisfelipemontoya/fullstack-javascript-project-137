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
<header class="bg-dark text-white py-5">
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">

        <h1 class="display-3 fw-bold">
            RSS Reader
        </h1>

        <p class="lead text-muted">
          Empieza a leer RSS hoy. Es fácil, bonito.
        </p>

        <form>

          <label for="rss-url" class="form-label">
            RSS link
          </label>

          <div class="input-group">

            <input
              id="rss-url"
              name="url"
              aria-label="url"
              autocomplete="off"
              type="text"
              class="form-control form-control -lg"
              placeholder="https://example.com/feed.xml"
            >

            <button
              type="submit"
              class="btn btn-primary btn-lg px-5"
            >
              Añadir
            </button>
          </div>

          <p
            id="feedback"
            class="feedback mt-2"
          ></p>
        </form>

      </div>
    </div>
  </div>
</header>

<main class="container my-5">
  <div class="row g-4">

    <div class="col-lg-8 order-1">
        <div id="posts" class="posts"></div>
    </div>
    <div class="col-lg-4 order-0">
        <div id="feeds" class="feeds"></div>
    </div>
  </div>
</main>

       <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title"></h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <p></p>
          </div>

          <div class="modal-footer">
            <a
              href="#"
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

const modalElement = document.querySelector("#modal");
const modal = new bootstrap.Modal(modalElement);
const form = document.querySelector('form');
const input = document.querySelector('#rss-url');

document.addEventListener("click", (e) => {
  const element = e.target.closest("[data-id]");

  if (!element) {
    return;
  }

  const { id } = element.dataset;

  if (!state.viewedPosts.includes(id)) {
    state.viewedPosts.push(id);
  }

  if (element.tagName === 'BUTTON') {
  const post = state.posts.find((item) => item.id === id);

  state.ui.modalPostId = id;

  modalElement.querySelector(".modal-title").textContent = post.title;
  modalElement.querySelector(".modal-body p").textContent =
    post.description;
  modalElement.querySelector(".modal-footer a").href =
    post.link;

  modal.show();
  }
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
