
import ContactCardProps from "@/types/ContactCardProps";
import { useEffect, useRef, useState} from 'react';
import Image from "next/image";
import styles from '@/css/ContactCard.module.css'

export default function ContactCard({ imageSrc, action, tagline, title } : ContactCardProps) {

    const cardRef = useRef<HTMLButtonElement | null> (null);
    const [cardWidth, setCardWidth] = useState<number>(0);
    const [imageSize, setImageSize] = useState(200);
    const [titleSize, setTitleSize] = useState(3);

    useEffect(() => {
        if (!cardRef.current) return;

        const el = cardRef.current;

        const observer = new ResizeObserver(([entry]) => {
            const width = entry.contentRect.width;

            const img = Math.min(Math.max(width * 0.25, 110), 180);
            const scale = Math.min(Math.max(width / 900, 0.85), 1.25);

            setImageSize(Math.round(img));
            setTitleSize(scale);
        })

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return(
        <button ref={cardRef}
                className={`${styles.card} mt-19 panel-background shadow white-semi-bg`}
                onClick={() => {
                    action();
            }}>

            <Image
                src={imageSrc}
                alt="Profile Picture"
                width={imageSize}
                height={imageSize}
                priority
                style={{ objectFit: 'contain' }}
            />


            <div className={`${styles.textPanel} ml-3`}>
                <div style={{ display: 'flex' }}>
                    <div className={`${styles.separator}`} />
                    <div className={`${styles.text}`}>
                        <h3 className={`${styles.title} font-medium` } style={{ transform: `scale(${titleSize})` }}>
                            {title}
                        </h3>
                        <p className={`${styles.tagline}`} style={{ transform: `scale(${titleSize})` }}>
                            {tagline}
                        </p>
                    </div>
                </div>
            </div>
        </button>
    )
}