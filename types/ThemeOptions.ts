import Icon from "@/components/Icon";
import IconProps from "./IconProps";

export type Selectable = {
  id: number;
  hasIcon: boolean;
  iconData: IconProps;
  status: boolean;
} & (
  | {
      name: string;
    }
  | {
      deviceSetting: boolean;
      description: string;
    }
);

export default Selectable;
