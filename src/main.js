import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h1 class="mb-4">RSS Reader</h1>

        <form>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="https://example.com/feed.xml"
            >
            <button
              type="submit"
              class="btn btn-primary"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
`;

