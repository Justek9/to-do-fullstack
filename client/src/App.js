import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const App = () => {
	const [socket, setSocket] = useState()
	let tasks = [
		{ id: 1, name: 'shopping' },
		{ id: 2, name: 'Go out' },
	]

	useEffect(() => {
		const socket = io('ws://localhost:8000', { transports: ['websocket'] })
		setSocket(socket)

		return () => {
			socket.disconnect()
		}
	}, [])

	return (
		<div className='App'>
			<header>
				<h1>To-do list</h1>
				<section className='tasks-section' id='task-section'>
					<h2>Tasks:</h2>
					<ul className='tasks' id='tasks'>
						{tasks.map(task => (
							<li className='task'>
								{task.name} <button className='btn btn-remove'>Remove</button>
							</li>
						))}
					</ul>

					<form id='add-task'>
						<input
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
