const qrcode = require("qrcode-terminal");
const express = require("express");
const dotenv = require("dotenv");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const app = express();
dotenv.config();

const port = 8096;

app.use(express.json());

app.post("/", async (req, res) => {
  const { message, number } = req.body;
  const numberModified = number.substring(1) + "@c.us";
  client.sendMessage(numberModified, message);
  res.send(`Mensaje enviado correctamente ${message}`);
});

app.post("/mediaURL", async (req, res) => {
  const { message, number } = req.body;
  const media = await MessageMedia.fromUrl(
    message
  );
  const numberModified = number.substring(1) + "@c.us";
  client.sendMessage(numberModified, media);
  res.send(`Mensaje enviado correctamente ${message}`);
})

app.listen(port, () => {
  console.log(`Server API started on port: ${port}`);
});


const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is logged in!");
});

client.on("message", (message) => {
  console.log(`Se recibio el siguiente mensaje -> ${message.body}`);
});

client.initialize();
