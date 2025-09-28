import TaskCard from './TaskCard'
import type { Task } from '../api/tasks'
import styled from '@emotion/styled'

type TaskListContainerProps = {
  tasks: Task[]
  isLoading?: boolean
}

const List = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 12,
})

const TaskListContainer = ({ tasks, isLoading = false }: TaskListContainerProps) => {
  return (
    <List>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} isLoading={isLoading} />
      ))}
    </List>
  )
}

export default TaskListContainer


