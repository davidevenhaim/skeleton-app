import { Icon, type IconProps } from "@iconify/react";
import { cn } from "@/lib/utils";

export type IconifyColor =
  | "error"
  | "warning"
  | "primary"
  | "secondary"
  | "white"
  | "black";

export type IconifyProps = {
  icon: string;
  className?: string;
  color?: IconifyColor;
} & Omit<IconProps, "icon">;

const colorClasses: Record<IconifyColor, string> = {
  error: "text-red-500",
  warning: "text-orange-500",
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  black: "text-black"
};

export default function Iconify({
  icon,
  className,
  color = "black",
  ...props
}: IconifyProps) {
  return (
    <Icon
      {...props}
      icon={icon}
      className={cn(colorClasses[color], className)}
    />
  );
}

