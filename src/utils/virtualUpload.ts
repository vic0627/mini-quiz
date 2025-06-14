export default (accept: string) => {
  return new Promise<FileList | null>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.style.display = "none";
    document.body.appendChild(input);

    const cleanup = () => {
      input.removeEventListener("change", onChange);
      document.body.removeChild(input);
    };

    const onChange = () => {
      resolve(input.files);
      cleanup();
    };

    input.addEventListener("change", onChange);
    input.addEventListener("click", () => {
      input.value = "";
    });

    input.click();
  });
};
