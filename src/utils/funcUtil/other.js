import html2canvas from "html2canvas";

export function saveImg(el) {
  return new Promise((resolve) => {
    toImage(el).then((url) => {
      if (window.test && window.test.savebase64image) {
        window.test.savebase64image(url);
      } else {
        let downloadBtn = document.createElement("a");
        downloadBtn.setAttribute("download", new Date().getTime().toString());
        downloadBtn.setAttribute("href", url);
        downloadBtn.click();
      }
      resolve();
    });
  })
}

export function toImage(el) {
  return new Promise((resolve, reject) => {
    html2canvas(el)
      .then((canvas) => {
        resolve(canvas.toDataURL("image/png"));
      })
      .catch(reject);
  });
}