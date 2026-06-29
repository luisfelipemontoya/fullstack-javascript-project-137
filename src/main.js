import "./style.css";

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

      </div>
    </div>
  </div>
`;
