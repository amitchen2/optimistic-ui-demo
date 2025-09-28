import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// In-memory tasks
export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type Task = { id: string; name: string; description: string; status: TaskStatus }

let tasks: Task[] = Array.from({ length: 6 }).map((_, i): Task => ({
	id: String(i + 1),
	name: `Task ${i + 1}`,
	description: `This is a sample description for Task ${i + 1}.`,
	status: (['todo', 'in_progress', 'done'] as TaskStatus[])[Math.floor(Math.random() * 3)] as TaskStatus,
}))

app.get('/health', (_req, res) => {
	res.json({ ok: true })
})

app.get('/tasks', (_req, res) => {
    setTimeout(() => {
        res.json(tasks)
    }, 2000)
})

app.post('/tasks/:id', (req, res) => {
    setTimeout(() => {
	const { id } = req.params
	const idx = tasks.findIndex((t) => t.id === id)
	if (idx === -1) return res.status(404).json({ error: 'Not found' })
	const { name, description, status } = req.body as Partial<Task>
	const current = tasks[idx]!
	const updated: Task = {
		id: current.id,
		name: name ?? current.name,
		description: description ?? current.description,
		status: status ?? current.status,
	}
	tasks[idx] = updated
	res.json(tasks[idx])
    }, 2000)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`)
})
