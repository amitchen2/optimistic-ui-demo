import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query'

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export type Task = {
  id: string
  name: string
  description: string
  status: TaskStatus
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${API_URL}/tasks`)
  if (!res.ok) throw new Error('Failed to load tasks')
  return res.json()
}

export const tasksQueryKey = ['tasks'] as const
export const taskQueryKey = (id: string) => ['tasks', id] as const

export const useTasksQuery = (refetchInterval?: number): UseQueryResult<Task[], Error> => {
  return useQuery({
    queryKey: tasksQueryKey,
    queryFn: fetchTasks,
    refetchInterval: refetchInterval,
    refetchOnWindowFocus: false,
  }) as UseQueryResult<Task[], Error>
}

// export const useUpdateTask = (): UseMutationResult<
//   Task,
//   Error,
//   { id: string; name?: string; description?: string; status?: TaskStatus }
// > => {
//   const qc = useQueryClient()

//   return useMutation({
//     mutationFn: async ({ id, ...body }) => {
//       const res = await fetch(`${API_URL}/tasks/${id}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       })
//       if (!res.ok) throw new Error('Failed to update task')
//       return res.json()
//     },
//     onMutate: async (updated) => {
//       await qc.cancelQueries({ queryKey: tasksQueryKey })

//       const previousTasks = qc.getQueryData<Task[]>(tasksQueryKey)

//       qc.setQueryData(tasksQueryKey, (old) =>
//         old?.map(task =>
//           task.id === updated.id ? { ...task, ...updated } : task
//         )
//       )

//       return { previousTasks }
//     },
//     onError: (_err, _vars, ctx) => {
//       if (ctx?.previousTasks) {
//         qc.setQueryData(tasksQueryKey, ctx.previousTasks)
//       }
//     },
//     onSettled: () => {
//       qc.invalidateQueries({ queryKey: tasksQueryKey })
//     },
//   })
// }


export const useUpdateTask = (): UseMutationResult<
  Task,
  Error,
  { id: string; name?: string; description?: string; status?: TaskStatus }
> => {
  const qc = useQueryClient()
  return useMutation<Task, Error, { id: string; name?: string; description?: string; status?: TaskStatus }>(
    {
      mutationFn: async ({ id, ...body }) => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Failed to update task')
        return res.json() as Promise<Task>
      },
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: tasksQueryKey })
      },
    },
  )
}


