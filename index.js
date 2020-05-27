const app = require("./app")
const fs = require("fs")
const path = require("path")
require("dotenv").config({path: ".env"})
let server
if (process.env.NODE_ENV === "development") {
    const https = require("https")
    server = https.createServer({
        key: fs.readFileSync(path.join(__dirname, "./server.key")),
        cert: fs.readFileSync(path.join(__dirname, "./server.cert"))
    }, app)
} else {
    const http = require("http")
    server = http.createServer(app)
}

server.listen(process.env.PORT, () => {
    console.log("App is running")
})