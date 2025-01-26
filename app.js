const express = require("express")

const app = express();

app.get("/", (req, res) => {
    res.send("WELL, HELLO!")
})



// Connecting to server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`)
})

