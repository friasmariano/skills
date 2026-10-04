import Link from "next/link";
import Image from "next/image";
import ProjectProps from "@/types/ProjectProps";

export default function ProjectNew({ href, imageSrc, imageWidth, imageAlt, separator, featured, projectTitle, hoverable } : ProjectProps) {
    return(
        <Link style={{ display: 'flex', alignItems: 'center',
                       margin: '20px 0px 0px 0px',
                       padding: '0px 0px 0px 0px',
                       position: 'relative',
                       cursor: hoverable ? 'pointer': 'default',
                       opacity: featured ? '1' : '0.24' }}
              className={`transition-all duration-200 ease-out ${hoverable ? 'hover:scale-[1.02]' : ''} `}
              href={href}>

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
                             minWidth: '420px',
                             width: featured ? 'clamp(320px, 90vw, 46em)' : 'auto',
                             minHeight: '380px',
                             display: 'flex',
                             flexDirection: 'column', justifyContent: 'center',
                             alignItems: 'center',
                             boxShadow: '0 15px 25px rgba(0,0,0,0.2)'}}>
                        <div style={{ padding: '55px 30px 20px 20px'}}>
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                width={imageWidth}
                                height={imageWidth}
                                loading="eager"
                                sizes="(max-width: 768px) 260px, 420px"
                                style={{ objectFit: 'cover',
                                         opacity: featured ? '1' : '0.17'
                                 }}
                            />
                        </div>

                        {separator && (<div className="separator"></div>) }

                        {projectTitle && (
                            <div style={{ margin: '21px 0px 0px 0px',
                                          fontSize: '1.8rem',
                                          fontWeight: '600',
                                          width: '100%',
                                          height: '90px',
                                          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.4) 100%)',
                                          borderRadius: '0px 0px 30px 30px',
                                          textAlign: 'center' }}>
                                <p>{projectTitle}</p>
                            </div>
                        )}
                </div>
            </Link>
    )
}