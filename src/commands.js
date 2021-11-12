const PingController = require("./controllers/ping.controller");

module.exports = [
  {
    command: "ping",
    action: PingController.index,
  },
];
