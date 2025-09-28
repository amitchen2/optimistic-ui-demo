import { Chip } from '@mui/material'
import type { Task, TaskStatus } from '../api/tasks'
import { useUpdateTask } from '../api/tasks'

const statusColorMap: Record<TaskStatus, "success" | "primary" | "warning"> = {
  done: "success",
  in_progress: "info",
  todo: "warning",
}

type TaskCardProps = {
  task: Task
  isLoading?: boolean
  // updateTask: (task: Task) => void
}

const TaskCard = ({ task, isLoading = false }: TaskCardProps) => {
  const { mutate: updateTask, isPending } = useUpdateTask()
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: 16,
        background: '#fff',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        position: 'relative',
        width: 300,
        overflow: 'hidden',
      }}
    >
      {(isLoading || isPending) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 50 50"
            style={{ display: 'block' }}
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="#3b82f6"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="31.4 188.4"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
        <input
          defaultValue={task.name}
          onBlur={(e) => {
            const name = e.currentTarget.value.trim()
            if (name && name !== task.name) updateTask({ ...task, id: task.id, name })
          }}
          style={{ flex: 1, fontSize: 16, fontWeight: 600, border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 8px' }}
        />
       <Chip label={task.status} color={statusColorMap[task.status]} />
      </div>
      <p style={{ marginTop: 0, color: '#4b5563' }}>{task.description}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <label style={{ fontSize: 12, color: '#6b7280' }}>Status</label>
        <select
          defaultValue={task.status}
          onChange={(e) => updateTask({ ...task, id: task.id, status: e.currentTarget.value as TaskStatus })}
          style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 8px' }}
        >
          <option value="todo">todo</option>
          <option value="in_progress">in_progress</option>
          <option value="done">done</option>
        </select>
      </div>
      <small style={{ color: '#9ca3af' }}>ID: {task.id}</small>
    </div>
  )
}

export default TaskCard


