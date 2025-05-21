const { Server } = require("socket.io")
const http = require("http")

const server = http.createServer()
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// In-memory message history
const messages = []

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id)

  // Send chat history to the newly connected user
  socket.emit("chat history", messages)

  socket.on("chat message", (msg) => {
    messages.push(msg)
    io.emit("chat message", msg)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id)
  })
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
}) 