
export const elementBuilder = (tagName = "div", options) => {
  const target = document.createElement(tagName);
  Object.keys(options).forEach(key => {
    if (key !== "childNodes") {
      target[key] = options[key];
    }
  });
  options.childNodes &&
    options.childNodes.forEach(node => {
      target.appendChild(node);
    });
  return target;
};