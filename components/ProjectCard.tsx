import Link from "next/link";
import Image from "next/image";
import ProjectProps from "@/types/ProjectProps";

export default function ProjectCard({ href, imageSrc, imageWidth, imageAlt, separator, featured, projectTitle, hoverable } : ProjectProps) {
    return(
        <div style={{ display: 'flex', alignItems: 'center',
                       margin: '20px 0px 0px 0px',
                       padding: '0px 0px 0px 0px',
                       position: 'relative',
                       cursor: hoverable ? 'pointer': 'default', }}
              className={`transition-all duration-200 ease-out ${hoverable ? 'hover:scale-[1.02]' : ''} `}>

                {featured && (
                    <Image
                        src="/projects/BookmarkRibbon.svg"
                        alt=""
                        aria-hidden="true"
                        width={150}
                        height={150}
                        loading="eager"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                            transform: 'translateX(0px) translateY(-60px)'
                        }}
                    />
                )}

                <div className="panel-background"
                    style={{ borderRadius: '30px',
                             minWidth: '450px',
                             width: featured ? 'clamp(320px, 90vw, 46em)' : '39vw',
                             minHeight: '520px',
                             display: 'flex',
                             flexDirection: 'column', justifyContent: 'center',
                             alignItems: 'center',
                             boxShadow: '0 15px 25px rgba(0,0,0,0.3)',
                             background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 79%, rgba(255, 255, 255, 0.2) 85%, rgba(255, 255, 255, 0.6) 100%)'}}>
                        <div style={{ padding: '55px 30px 20px 20px'}}>
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                width={imageWidth}
                                height={imageWidth}
                                loading="eager"
                                sizes="(max-width: 768px) 260px, 420px"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        {/* {separator && (<div className="separator"></div>) } */}

                        <div style={{ margin: '0px 0px 0px 0px',
                                      width: '100%',
                                      height: '90px',
                                      padding: '0px 0px 30px 0px',
                                      borderRadius: '0px 0px 30px 30px',
                                      textAlign: 'center' }}>
                            {/* <p>{projectTitle && (projectTitle)}</p> */}
                            <a style={{ padding: '14px', 
                                        display: 'inline-block',
                                        width: '240px',
                                        background: 'linear-gradient(to bottom, rgba(195, 252, 187, 0.5) 0%, rgba(155, 255, 151, 0.8) 50%, hsl(115, 71%, 53%) 100%)',
                                        borderRadius: '30px',
                                        boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                                        cursor: 'pointer' }}
                                href="#demo"
                                target="_blank">
                                <i className="bi bi-play-circle text-2xl" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}></i>
                                <span style={{ fontSize: '1.35rem',
                                               padding: '0px 0px 30px 7px',
                                               textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>Live Demo</span>
                            </a>
                        </div>
                </div>
            </div>
    )
}