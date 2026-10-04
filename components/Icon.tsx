
import IconProps from "@/types/IconProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function Icon({ type, className, icon = faSun, size, translateY } : IconProps) {
    return(
        <>
            {type === 'Bootstrap' ? (
                <i className={`${className}`} style={{ fontSize: `${size}`, transform: `translateY(${translateY})` }}></i>
            ) : (
                <FontAwesomeIcon icon={icon} style={{ fontSize: `${size}`, transform: `translateY(${translateY})` }} />
            )}
        </>
    )
}