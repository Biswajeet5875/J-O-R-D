function navigateToRateus() {
  const modalOverlay = document.createElement("div");
  modalOverlay.style.position = "fixed";
  modalOverlay.style.top = "0";
  modalOverlay.style.left = "0";
  modalOverlay.style.width = "100%";
  modalOverlay.style.height = "100%";
  modalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modalOverlay.style.zIndex = "999";
  modalOverlay.style.display = "flex";
  modalOverlay.style.justifyContent = "center";
  modalOverlay.style.alignItems = "center";

  const modal = document.createElement("div");
  modal.style.width = "500px";
  modal.style.backgroundColor = "#fff";
  modal.style.padding = "20px";
  modal.style.borderRadius = "8px";
  modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  modal.style.position = "relative";

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.border = "none";
  closeButton.style.background = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontSize = "16px";
  closeButton.style.color = "red";

  closeButton.addEventListener("click", () => {
    document.body.removeChild(modalOverlay);
  });

  const iframe = document.createElement("iframe");
  iframe.src = "../Rating/rating.html";
  iframe.style.width = "100%";
  iframe.style.height = "300px";
  iframe.style.border = "none";

  modal.appendChild(closeButton);
  modal.appendChild(iframe);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
}
