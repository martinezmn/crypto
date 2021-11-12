const CryptoController = require("./controllers/crypto.controller");

module.exports = [
  {
    event: "loop",
    delay: 20000,
    action: CryptoController.checkPrice,
  },
];
