import './style.css';
import { proxy } from 'valtio/vanilla';
import validateUrl from "./utils/validation.js";
import watch from "./view.js";
import initI18n from "./i18n.js";
import loadFeed from "./services/loadFeed.js";
import parseRss from "./utils/parseRss.js";

initI18n().then(() => {
  console.log("i18next listo");
});

const state = proxy({
 feeds: [],
 posts: [],
 form: {
 error: null,
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

      </div>
    </div>
  </div>
`;
watch(state);

const form = document.querySelector('form');
const input = document.querySelector('#rss-url');

form.addEventListener('submit', (e) => {
 e.preventDefault();

 const url = input.value;

  validateUrl(url, state.feeds)
  .then(() => loadFeed(url))
    .then((response) => {
      state.form.error = null;
        const data = parseRss(response.data.contents);
        state.feeds.push(data.feed);
        state.posts.push(...data.posts); 

      console.log(data);

      state.form.error = null;

      input.value = "";
      input.focus();
    })
    .catch((error) => {
      state.form.error = error.message;
    });
});
