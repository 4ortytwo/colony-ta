export const highlight = (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  let str = '';
  strings.forEach((string, i) => {
    str += `${string} <span class='hl'>${values[i] || ''}</span>`;
  });
  return str;
};
