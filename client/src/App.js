import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const App = () => {
	const [socket, setSocket] = useState(null)
	const [tasks, setTasks] = useState([])

	const [taskName, setTaskName] = useState('')

	const removeTask = (id, isEmitedByUser = false) => {
		setTasks(tasks => tasks.filter(task => task.id !== id))

		if (isEmitedByUser) {
			socket.emit('removeTask', id)
		}
	}
	const addTask = task => {
		setTasks(tasks => [...tasks, task])
	}

	const updateTasks = data => {
		setTasks(tasks => [...tasks, ...data])
	}

	const submitForm = e => {
		e.preventDefault()
		let id = tasks.length + 1
		const task = { name: taskName, id: id }
		addTask(task)
		socket.emit('addTask', { name: taskName, id: id })
		setTaskName('')
	}

	useEffect(() => {
		const socket = io('ws://localhost:8000', { transports: ['websocket'] })
		setSocket(socket)
		socket.on('updateData', tasks => updateTasks(tasks))
		socket.on('addTask', task => addTask(task))
		socket.on('removeTask', id => removeTask(id))

		return () => {
			socket.disconnect()
			console.log('CLEANING')
		}
	}, [])

	return (
		<div className='App'>
			<header>
				<h1>To-do list</h1>
				<section className='tasks-section' id='task-section'>
					<h2>Tasks:</h2>
					<ul className='tasks' id='tasks'>
						{tasks.map((task, i) => (
							<li className='task' key={i}>
								{task.name}
								<button className='btn btn-remove' onClick={() => removeTask(task.id, true)}>
									Remove
								</button>
							</li>
						))}
					</ul>

					<form id='add-task' onSubmit={e => submitForm(e)}>
						<input
							value={taskName}
							onChange={e => setTaskName(e.target.value)}
							className='text-input'
							autoComplete='off'
							type='text'
							placeholder='Type your task'
							id='task-name'></input>
						<button className='btn btn-add' type='submit'>
							Add
						</button>
					</form>
				</section>
			</header>
		</div>
	)
}

export default App
