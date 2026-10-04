import SkillCardProps from "@/types/SkillCardProps";
import Image from "next/image";

export default function SkillCard({ width = 96, height = 96, imageSrc, imageAlt, skillName, backgroundGradient }: SkillCardProps) {
    return(
        <div>

            <Image
                src={imageSrc}
                alt={imageAlt}
                width={width}
                height={height}
            />

            <p style={{ fontSize: '1.4rem', fontWeight: '500',
                        marginTop: '25px' }}>
                {skillName}
            </p>

        </div>
    )
}