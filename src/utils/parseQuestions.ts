export default (file: File | null): Promise<Questions> =>
  new Promise((resolve, reject) => {
    if (!(file instanceof File)) return reject(new TypeError("accept file only"));

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as Questions;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (e) => {
      reject(e);
    };
  });
