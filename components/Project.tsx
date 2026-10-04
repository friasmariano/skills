'use client'

import Link from "next/link";
import Image from "next/image";
import ProjectProps from "@/types/ProjectProps";
import { useEffect, useState } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Project({ href, imageSrc, imageWidth, imageAlt, separator, featured, projectTitle, hoverable } : ProjectProps) {
    const breakpoint = useBreakpoint();
    const [featuredHeight, setFeaturedHeight] = useState(40);

    useEffect(() => {
        if (breakpoint === 'mobile') {
            setFeaturedHeight(32);
        }
    }, []);

    return(
        <Link style={{ display: 'flex', alignItems: 'center',
                       margin: '20px 0px 0px 0px',
                       padding: '0px 0px 0px 0px',
                       cursor: hoverable ? 'pointer': 'default',
                       opacity: featured ? '1' : '1' }}
              className={`transition-all duration-200 ease-out ${hoverable ? 'hover:scale-[1.02]' : ''} `}
              href={href}>

                <div className="panel-background"
                    style={{ borderRadius: '30px',
                             width: featured ? '43vw': '24vw',
                             height: featured ? featuredHeight+'vh !important' : '23vw',
                             display: 'flex',
                             flexDirection: 'column', justifyContent: 'center',
                             alignItems: 'center',
                             padding: '0px',
                             boxShadow: '0 15px 25px rgba(0,0,0,0.2)',
                             background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 79%, rgba(255, 255, 255, 0) 85%, rgba(255, 255, 255, 0.1) 90%, rgba(255, 255, 255, 0.6) 100%)' }}>
                        <div
                            style={{ position: 'relative',
                                     width: '100%',
                                     height: featured ? 'auto' : '100%',
                                     padding: featured ? '40px 30px 20px 20px' : '0',
                                     overflow: 'hidden',
                                     borderRadius: '30px',
                                     display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                           >

                            {featured ? (<Image
                                src={imageSrc}
                                alt={imageAlt}
                                width={imageWidth}
                                height={imageWidth}
                                loading="eager"
                                style={{ objectFit: 'contain',
                                         opacity: featured ? '1' : '0.17'
                                 }}
                            />) : (
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    width={imageWidth}
                                    height={imageWidth}
                                    loading="eager"
                                    style={{ objectFit: 'contain',
                                            opacity: featured ? '1' : '0.17'
                                    }}
                            />
                            )}
                        </div>

                        {separator && (<div className="separator"></div>) }

                        {projectTitle && (
                            <div style={{ margin: '21px 0px 0px 0px',
                                          fontSize: '1.8rem',
                                          fontWeight: '600',
                                          width: '100%',
                                          height: '90px',
                                          borderRadius: '0px 0px 30px 30px',
                                          textAlign: 'center' }}>
                                <p>{projectTitle}</p>
                            </div>
                        )}
                </div>
            </Link>
    )
}