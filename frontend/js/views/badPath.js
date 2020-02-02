import $ from 'jquery';

export const badPath = () => {
    const fragment = $(new DocumentFragment());

    fragment
        .append("<h2>Oops</h2>")
        .append('<p> Co żeś uczynił</p>');

    return fragment;
};
