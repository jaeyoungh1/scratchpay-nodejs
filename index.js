require('dotenv').config()

const { port } = require('./config')

const app = require('./app')

try {
    app.listen(port, () => console.log(`Listening on port ${port}...`))
} catch (err) {
    console.log("Server failure:", err)
}