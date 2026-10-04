

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPalette, faCode, faUserTie, faCircle, faCompass } from "@fortawesome/free-solid-svg-icons"
import TimelineList from "./TimelineList"
import TimelineMilestone from "./TimelineMilestone"

export default function TimelineUpdated() {
    return(
        <section style={{ minHeight: '1200px', display: 'flex' }}>
            <div className="time-line">

            </div>
            <ul className="timeline-list">
                <li>
                    <div className="circle orange-bg orange-border">
                        <FontAwesomeIcon icon={faPalette} style={{ fontSize: '1.3rem'}} />
                    </div>

                    {/* Content */}
                    <div style={{ display: 'flex',
                                  flexDirection: 'column',
                                  padding: '100px 0px 0px 30px',
                                  maxWidth: '50vw',
                                  overflow: 'hidden' }}>
                        <p className="font-medium" style={{ fontSize: '1.45em' }}>
                            2013 - 2014
                        </p>
                        <p className="font-bold" style={{ fontSize: '2rem' }}>
                            Graphic Designer
                        </p>
                        <p className="font-regular" style={{ fontSize: '1.55rem' }}>
                            FR Services S.R.L.
                        </p>
                        <p className="font-regular mt-5" style={{ fontSize: '1.3rem' }}>
                            I created visual content that supported branding and marketing efforts.
                        </p>
                        <ul style={{ marginTop: '7.5px', display: 'flex',
                                     flexDirection: 'column', gap: '5.4px' }}>
                            <li style={{ padding: '0px 0px 0px 29px' }}>
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    style={{ fontSize: '0.6rem', opacity: '0.9', marginRight: '7px' }} />
                                <p style={{ fontSize: '1.1rem'}}>
                                    Designed advertising and promotional materials aligned with brand and marketing objectives.
                                </p>
                            </li>
                            <li style={{ padding: '0px 0px 0px 29px' }}>
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    style={{ fontSize: '0.6rem', opacity: '0.9', marginRight: '7px' }} />
                                <p style={{ fontSize: '1.1rem'}}>
                                    Collaborated with layout designers and team members to produce high-quality visual content.
                                </p>
                            </li>
                            <li style={{ padding: '0px 0px 0px 29px' }}>
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    style={{ fontSize: '0.6rem', opacity: '0.9', marginRight: '7px' }} />
                                <p style={{ fontSize: '1.1rem'}}>
                                    Ensured design consistency and quality across print and digital media.
                                </p>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="circle blue-bg blue-border">
                        <FontAwesomeIcon icon={faUserTie} style={{ fontSize: '1.3rem'}} />
                    </div>

                    {/* Content */}
                    <div style={{ display: 'flex',
                                  flexDirection: 'column',
                                  padding: '100px 0px 0px 30px',
                                  maxWidth: '50vw',
                                  overflow: 'hidden' }}>
                        <p className="font-medium" style={{ fontSize: '1.45em' }}>
                            2015 - 2018
                        </p>
                        <p className="font-bold" style={{ fontSize: '2rem' }}>
                            Subdirector of Institutional Information Center
                        </p>
                        <p className="font-regular" style={{ fontSize: '1.55rem' }}>
                            Dominican Adventist University (UNAD)
                        </p>
                        <p className="font-regular mt-5" style={{ fontSize: '1.3rem' }}>
                            I supported academic and administrative operations by managing systems, data, and technical infrastructure.
                        </p>
                        <ul style={{ marginTop: '7.5px', display: 'flex',
                                     flexDirection: 'column', gap: '5.4px' }}>
                            <li style={{ padding: '0px 0px 0px 29px' }}>
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    style={{ fontSize: '0.6rem', opacity: '0.9', marginRight: '7px' }} />
                                <p style={{ fontSize: '1.1rem'}}>
                                    Administered the institutional academic system and ensured its stability and availability.
                                </p>
                            </li>
                            <li style={{ padding: '0px 0px 0px 29px' }}>
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    style={{ fontSize: '0.6rem', opacity: '0.9', marginRight: '7px' }} />
                                <p style={{ fontSize: '1.1rem'}}>
                                    Managed institutional databases, focusing on data integrity, security, and performance.
                                </p>
                            </li>
                            <li style={{ padding: '0px 0px 0px 29px' }}>
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    style={{ fontSize: '0.6rem', opacity: '0.9', marginRight: '7px' }} />
                                <p style={{ fontSize: '1.1rem'}}>
                                    Diagnosed and resolved system issues, providing hands-on technical support across departments.
                                </p>
                            </li>
                            <li style={{ padding: '0px 0px 0px 29px' }}>
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    style={{ fontSize: '0.6rem', opacity: '0.9', marginRight: '7px' }} />
                                <p style={{ fontSize: '1.1rem'}}>
                                    Acted as a bridge between technical systems and academic processes.
                                </p>
                            </li>
                        </ul>
                    </div>
                </li>

                <li className="mb-7">
                    <div className="circle green-bg green-border">
                        <FontAwesomeIcon icon={faCode} style={{ fontSize: '1.3rem'}} />
                    </div>

                    {/* Content */}
                    <ul style={{ display: 'flex',
                                  flexDirection: 'column',
                                  padding: '100px 0px 0px 30px',
                                  maxWidth: '50vw',
                                  overflow: 'hidden' }}>
                        <p className="font-medium" style={{ fontSize: '1.45em' }}>
                            2019 - Present
                        </p>
                        <p className="font-bold" style={{ fontSize: '2rem' }}>
                            Full Stack Developer
                        </p>
                        <p className="font-regular" style={{ fontSize: '1.55rem' }}>
                            Northeastern Technological University (UTECO)
                        </p>
                        <p className="font-regular mt-5" style={{ fontSize: '1.3rem' }}>
                            I work on the design, development, and evolution of a large-scale academic system used by thousands of active users every month.
                        </p>
                        <TimelineList>
                            <TimelineMilestone>
                                Made significant contributions to the migration of the core academic platform from ActionScript to Vue.js / Nuxt.js, improving performance, usability, and long-term maintainability.
                            </TimelineMilestone>
                            <TimelineMilestone>
                                Designed and implemented .NET Core APIs to support new features and system integrations.
                            </TimelineMilestone>
                            <TimelineMilestone>Built responsive, efficient Vue.js layouts and components, focusing on clarity and user experience.</TimelineMilestone>
                            <TimelineMilestone>Centralized API communication using Axios and Vuex, improving reliability and reducing duplicated logic.</TimelineMilestone>
                            <TimelineMilestone>Developed custom plugins for date handling, DOM utilities, and dynamic component behavior.</TimelineMilestone>
                            <TimelineMilestone>Contributed to a reusable component library, speeding up development and improving consistency.</TimelineMilestone>
                            <TimelineMilestone>Designed visual assets and application wallpapers using Adobe Illustrator.</TimelineMilestone>
                            <TimelineMilestone>Collaborated closely with institutional stakeholders to deliver solutions aligned with academic and administrative needs.</TimelineMilestone>
                        </TimelineList>
                    </ul>
                </li>

                <li className="mt-4">
                    <div className="circle three-color-bg three-color-border">
                        <FontAwesomeIcon icon={faCompass} style={{ fontSize: '1.3rem'}} />
                    </div>

                    {/* Content */}
                    <ul style={{ display: 'flex',
                                  flexDirection: 'column',
                                  padding: '55px 0px 0px 30px',
                                  maxWidth: '50vw', }}>
                        <p className="font-bold" style={{ fontSize: '1.45em' }}>
                            Looking Forward
                        </p>
                        <TimelineList>
                            <TimelineMilestone>
                                Aiming for a bright future and the opportunity to keep moving, innovating, and creating amazing user experiences.
                            </TimelineMilestone>
                        </TimelineList>
                    </ul>
                </li>
            </ul>
        </section>
    )
}