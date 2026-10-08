const WHATSAPP_NUMBER = "2349151148924";

const button = document.getElementById("whatsapp");
const beats = document.querySelectorAll(".beat");

function openWhatsApp(beatName = "") {
  const message = beatName ? `${beatName} available?` : "";
  const url = `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
  button.href = url;
  button.dataset.beat = beatName;
}

openWhatsApp();

beats.forEach((beat) => {
  beat.addEventListener("click", () => openWhatsApp(beat.dataset.name));
});
