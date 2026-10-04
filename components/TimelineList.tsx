
export default function TimelineList({ children } : { children: React.ReactNode })  {
    return(
        <ul style={{ marginTop: '7.5px', display: 'flex',
                     flexDirection: 'column', gap: '5.4px', alignItems: 'flex-start' }}>
            {children}
        </ul>
    )
}