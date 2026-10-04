
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPalette, faCode, faUserTie } from "@fortawesome/free-solid-svg-icons"

export default function TimelineNew() {
    return(
        <section style={{ minHeight: '1200px', display: 'flex' }}>
            <div className="time-line">

            </div>
            <ul style={{ display: 'flex',
                         margin: '0px 0px 0px 30px',
                         flexDirection: 'column',
                         alignItems: 'center',
                         justifyContent: 'space-between',
                         padding: '100px 0px 0px 0px', }}>
                <li className="time-line-item">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <div style={{ width: '95px', height: '95px',
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(to bottom, rgb(225, 225, 225) 0%, rgba(225, 225, 225, 0.7) 70%, rgb(135, 135, 135) 100%)' }}>
                            <div style={{ width: '80px', height: '80px',
                                          borderRadius: '50%',
                                          display: 'flex', alignItems: 'center',
                                          justifyContent: 'center',
                                          background: 'linear-gradient(to bottom, hsl(10, 100%, 75%) 0%, rgb(241, 74, 41) 50%, rgb(112, 31, 14) 100%)' }}>
                                <FontAwesomeIcon icon={faPalette} style={{ fontSize: '2.4em' }} />
                            </div>
                        </div>
                        <div className="timeline-content">
                            <p className="font-medium" style={{ fontSize: '1.7em' }}>
                                2013 - 2014
                            </p>
                        </div>
                    </div>
                </li>
                <li></li>
                <li></li>
            </ul>
        </section>
    )
}