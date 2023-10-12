const express = require('express')
const socket = require('socket.io')
const app = express()

const server = app.listen('8000', () => {
	console.log('Server is running on port 8000')
})

const io = socket(server)

let tasks = []

app.use((req, res) => {
	res.status(404).send('Not Found...')
})

io.on('connection', socket => {
	console.log(socket.id)
	io.to(socket.id).emit('updateData', tasks)

	socket.on('addTask', task => {
		tasks = [...tasks, task]
		socket.broadcast.emit('addTask', task)
		console.log(tasks);
	})
	socket.on('removeTask', id => {
		tasks = tasks.filter(task => task.id !== id)
		socket.broadcast.emit('removeTask', tasks)
	})
})
