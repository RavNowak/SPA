import './badPath.scss';

export const badPath = () => {
  const fragment = $(new DocumentFragment());

  const html = `
  <div class="badPathContainer">
    <div class="badPathImg"></div>
  </div>`

  fragment.append(html);

  return fragment;
};