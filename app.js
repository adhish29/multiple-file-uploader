const inpFile = document.getElementById("inpFile");
const btnUpload = document.getElementById("btnUpload");

btnUpload.addEventListener("click", () => {
  const formData = new FormData();
  // console.log(typeof formData);
  for (let file of inpFile.files) {
    formData.append("FILES", file);
  }

  fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  }).catch((e) => console.error(e));
});
