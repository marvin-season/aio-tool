// src/utils/debounce.ts
function debounce(func, wait = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(null, args);
    }, wait);
  };
}
export {
  debounce
};
