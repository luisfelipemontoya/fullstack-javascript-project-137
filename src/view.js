import { subscribe } from "valtio/vanilla";
import i18next from "i18next";

const render = (state) => {
  const feedback = document.querySelector("#feedback");

  feedback.textContent = state.form.error 
    ? i18next.t(`errors.${state.form.error}`)
    : '';
 
};

const watch = (state) => {
  render(state);

  subscribe(state, () => {
    render(state);
  });
};

export default watch;
