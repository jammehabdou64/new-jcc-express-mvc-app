module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("user", (data) => {
      console.log(data);
    });
  });
  return;
};
