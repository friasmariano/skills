
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

export default function TimelineMilestone({ children } : { children: React.ReactNode }) {
    return(
        <li style={{ padding: '0px 0px 0px 29px', display: 'flex', alignItems: 'flex-start' }}>
            <FontAwesomeIcon
                icon={faCircle}
                style={{ fontSize: '0.6rem', opacity: '0.9', margin: '10px 7px 0px 0px' }} />
            <p style={{ fontSize: '1.1rem'}}>
                {children}
            </p>
        </li>
    )
}