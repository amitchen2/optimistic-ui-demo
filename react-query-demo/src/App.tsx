import './App.css'
import { useTasksQuery } from './api/tasks'
import TaskListContainer from './components/TaskListContainer.tsx'
import styled from '@emotion/styled'
import QueryState from './components/QueryState'
import { useState } from 'react'
import { Button, FormControlLabel, Switch } from '@mui/material'

const Page = styled.div({ padding: 24 })
const Toolbar = styled.div({ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 })
const Info = styled.span({ fontSize: 12, color: '#666' })
const ErrorText = styled.p({ color: 'tomato' })

const App = () => {
  const [isPolling, setIsPolling] = useState(false);
  const { data, isPending, isError, error, refetch, isFetching, isLoading } = useTasksQuery(isPolling ? 5000 : undefined)
  //isPending is new in v5. is loading is deprecated and equal to isPending. remains for backward compatibility.
  return (
    <Page>
      <h1>Tasks</h1>
      <Toolbar>
        <FormControlLabel
          control={<Switch
            checked={isPolling}
            onChange={() => setIsPolling((prev) => !prev)}
            color="primary" />}
          label="polling configuration"
        />
       
        <Button loading={isFetching} variant="outlined" onClick={() => refetch()} disabled={isFetching}>
            Refresh
        </Button>

        {/* <Info>Polling every 5s{isFetching ? ' — fetching…' : ''}</Info> */}
      </Toolbar>
      <QueryState isLoading={isLoading} isFetching={isFetching} isPending={isPending} />

      {isLoading && !data && (
        <>
          <p>Loading tasks…</p>
          <TaskListContainer
            isLoading={true}

            tasks={Array.from({ length: 6 }).map((_, i) => ({
              id: `skeleton-${i + 1}`,
              name: 'Loading…',
              description: '',
              status: 'todo',
            }))}
          />
        </>
      )}
      {isError && <ErrorText>Error: {(error as Error).message}</ErrorText>}

      {data && <TaskListContainer tasks={data} />}
    </Page>
  )
}

export default App
