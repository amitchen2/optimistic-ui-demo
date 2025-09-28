import styled from '@emotion/styled'

type QueryStateProps = {
    isLoading: boolean
    isPending: boolean
    isFetching: boolean
}

const Bar = styled.div({ display: 'flex', alignItems:'flex-start',flexDirection: 'column', gap: 8, margin: "16px 0", flexWrap: 'wrap', width:'fit-content' })

const Pill = styled.div<{ active: boolean }>(({ active }) => ({
    padding: '6px 10px',
    borderRadius: 999,
    border: `1px solid ${active ? '#2563eb' : '#e5e7eb'}`,
    background: active ? '#dbeafe' : '#fff',
    color: active ? '#1d4ed8' : '#374151',
    fontSize: 12,
}))

const QueryState = ({ isLoading, isFetching, isPending }: QueryStateProps) => {
    return (
        <>
            <Bar>
            <div>Query States:</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Pill active={isLoading} title="isLoading (first load without cache)">
                    isLoading: {String(isLoading)}
                </Pill>
                =
                <Pill active={isPending} title="isPending (query status is pending)">
                    isPending: {String(isPending)}
                </Pill>
            </div>
                <Pill active={isFetching} title="isFetching (any active fetch)">
                    isFetching: {String(isFetching)}
                </Pill>
            </Bar>
        </>
    )
}

export default QueryState


