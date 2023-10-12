import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const App = () => {
	const [socket, setSocket] = useState()
	const [tasks, setTasks] = useState([
		{ id: 1, name: 'shopping' },
		{ id: 2, name: 'Go out' },
	])

	const [taskName, setTaskName] = useState('')

	useEffect(() => {
		const socket = io('ws://localhost:8000', { transports: ['websocket'] })
		setSocket(socket)

		return () => {
			socket.disconnect()
		}
	}, [])

	const removeTask = id => {
		setTasks(tasks => tasks.filter(task => task.id !== id))
	}
	const addTask = task => {
		setTasks(tasks => [...tasks, task])
	}
	const submitForm = e => {
		e.preventDefault()
		let id = tasks.length + 1
		addTask({ name: taskName, id: id })
		setTaskName('')
	}

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
								<button className='btn btn-remove' onClick={() => removeTask(task.id)}>
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
