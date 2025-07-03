export function __CopyToClipboard(text: string) {
  const input = document.createElement("input");
  input.value = text;
  input.style.cssText = "opacity: 0; z-index:-10000;";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}
