
import ContactCardExternalProps from "@/types/ContactCardExternalProps"
import Image from "next/image"
import Link from "next/link"

export default function ContactCardExternal({ imageSrc, tagline, title, cardClass = "contact-card-image", href} : ContactCardExternalProps) {
    return(
        <Link className="mt-19 panel-background shadow white-semi-bg contact-card"
            href={href}
            target="_blank">
            <div className={cardClass}>
                <Image
                    src={imageSrc}
                    alt="Profile Picture"
                    fill
                    sizes="(max-width: 768px) 100vw, 215px"
                    priority={false}
                    style={{ objectFit: 'contain' }}
                />
            </div>


            <div className="contact-card-text-panel">
                <div className="contact-card-separator" />
                <div className="contact-card-text ml-3">
                    <h3 className="font-medium" style={{ fontSize: '2rem'}}>
                        {title}
                    </h3>
                    <p>
                        {tagline}
                    </p>
                </div>
            </div>
        </Link>
    )
}