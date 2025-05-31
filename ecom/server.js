const https = require("https");
const fs = require("fs");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

// تحميل شهادة SSL
const options = {
  key: fs.readFileSync("/etc/privkey.pem"),
  cert: fs.readFileSync("/etc/fullchain.pem"),
};

app.prepare().then(() => {
  https.createServer(options, (req, res) => {
    handle(req, res);
  }).listen(3001, () => {
    console.log("🚀 Server running on https://gpsstore.tech:3001");
  });
});
