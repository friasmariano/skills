import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default interface IconProps {
  type: "FontAwesome" | "Bootstrap";
  size?: string;
  className?: string;
  icon?: IconDefinition;
  translateY?: string;
}
