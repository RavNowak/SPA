import './badPath.scss';

export const badPath = () => {
  const fragment = $(new DocumentFragment());

  const html = `
  <div class="badPathContainer">
    <h1 class="wrong">Something went wrong :(<h1>
    <div class="badPathImg"></div>
  </div>`

  fragment.append(html);

  return fragment;
};