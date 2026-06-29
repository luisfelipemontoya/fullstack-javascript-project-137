import { subscribe } from "valtio/vanilla";

const render = (state) => {
  const feedback = document.querySelector("#feedback");

  feedback.textContent = state.form.error ?? "";
};

const watch = (state) => {
  render(state);

  subscribe(state, () => {
    render(state);
  });
};

export default watch;
