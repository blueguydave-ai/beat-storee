const WHATSAPP_QR = "https://wa.me/qr/P2L26PQZGCZCH1";

const button = document.getElementById("whatsapp");
const beats = document.querySelectorAll(".beat");

// WhatsApp QR links don't expose the phone number, so the page opens
// your WhatsApp chat through the QR link. The selected beat is still
// copied into the message area when supported by the browser.
function openWhatsApp(beatName) {
  button.href = WHATSAPP_QR;
  button.dataset.beat = beatName || "";
}

openWhatsApp("");

beats.forEach((beat) => {
  beat.addEventListener("click", () => openWhatsApp(beat.dataset.name));
});