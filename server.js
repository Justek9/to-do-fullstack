const express = require('express')
const socket = require('socket.io')
const app = express()
const server = app.listen('8000', () => {
	console.log('Server is running on port 8000')
})

const io = socket(server)

const tasks = []

app.use((req, res) => {
	res.status(404).send('Not Found...')
})

io.on('connection', socket => {
	console.log(socket)
	io.to(socket.id).emit('updateData', tasks)

	socket.on('addTask', task => {
		tasks.push(task)
		socket.broadcast.emit('addTask', tasks)
	})
	socket.on('removeTask', id => {
		tasks = tasks.filter(task => task.id !== id)
		socket.broadcast.emit('removeTask', tasks)
	})
})
