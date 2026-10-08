# Simple Beat Preview

A deliberately minimal landing page for beat previews.

## What it does

1. Visitors preview the beats.
2. They check availability on WhatsApp.
3. If available, they choose a licence.
4. They pay via Paystack or Selar.

The WhatsApp button automatically prepares a message using the selected beat name.

## Add your beats

Put your MP3 files in:

`public/audio/`

The current page expects:

- `soul.mp3`
- `somewhere.mp3`
- `driims.mp3`
- `cool n' right.mp3`
- `2:41.mp3`

## Set WhatsApp number

Open `app.js` and replace:

`234XXXXXXXXXX`

with your real WhatsApp number in international format, without the `+` sign or spaces.

No payment API, database, login, or backend is included. Paystack/Selar is intentionally only described as the final payment step for now.
