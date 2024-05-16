export function hideAlert() {
  const alert = document.getElementById("alert");
  const titleBox = document.getElementById("title-box");

  setTimeout(() => {
    alert.style.display = "none";
    titleBox.style.display = "block";
  }, 2000);
}
