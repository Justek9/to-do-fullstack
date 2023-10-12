const express = require('express')
const app = express()

app.use((req, res) => {
	res.status(404).send('Not Found...')
})

app.listen('8000', () => {
	console.log('Server is running on port 8000')
})
