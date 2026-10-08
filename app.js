// Replace this with your real WhatsApp number in international format, without + or spaces.
// Example: 2348012345678
const WHATSAPP_NUMBER = "234XXXXXXXXXX";

const button = document.getElementById("whatsapp");
const beats = document.querySelectorAll(".beat");

function openWhatsApp(beatName) {
  const message = encodeURIComponent(beatName ? `${beatName} available?` : "Hi, I want to check beat availability.");
  button.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

openWhatsApp("");

beats.forEach((beat) => {
  beat.addEventListener("click", () => openWhatsApp(beat.dataset.name));
});