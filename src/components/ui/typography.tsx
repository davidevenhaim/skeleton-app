import React from "react";
import { cn } from "@/lib/utils";

export type TextColor =
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "destructive"
  | "white"
  | "black"
  | "gray"
  | undefined;

export type TypoVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption1"
  | "caption2"
  | "label1"
  | "label2"
  | "overline";

type TypographyProps = {
  children: React.ReactNode;
  variant: TypoVariant;
  className?: string;
  color?: TextColor;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
};

const colorClassMap: Record<Exclude<TextColor, undefined>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  muted: "text-muted-foreground",
  destructive: "text-destructive",
  white: "text-white",
  black: "text-black",
  gray: "text-gray-600"
};

const variantClassMap: Record<
  TypoVariant,
  { tag: keyof React.JSX.IntrinsicElements; classes: string }
> = {
  h1: { tag: "h1", classes: "text-7xl font-bold text-primary-700" },
  h2: { tag: "h2", classes: "text-5xl font-bold text-primary-700" },
  h3: { tag: "h3", classes: "text-4xl font-bold text-primary-700" },
  h4: { tag: "h4", classes: "text-3xl font-bold text-primary-700" },
  h5: { tag: "h5", classes: "text-2xl font-bold text-primary-700" },
  h6: { tag: "h6", classes: "text-xl font-bold text-primary-700" },
  subtitle1: { tag: "h2", classes: "text-2xl font-semibold text-primary-700" },
  subtitle2: { tag: "h3", classes: "text-xl font-semibold text-primary-700" },
  body1: { tag: "p", classes: "text-xl text-primary-200 leading-relaxed" },
  body2: { tag: "p", classes: "text-lg text-primary-200 leading-relaxed" },
  caption1: { tag: "p", classes: "text-base text-gray-400 leading-relaxed" },
  caption2: { tag: "p", classes: "text-sm text-gray-400 leading-relaxed" },
  label1: {
    tag: "label",
    classes: "text-lg text-primary-200 leading-relaxed"
  },
  label2: {
    tag: "label",
    classes: "text-base text-primary-200 leading-relaxed"
  },
  overline: {
    tag: "p",
    classes: "text-sm uppercase tracking-wide text-primary-200"
  }
};

export const Typography = ({
  children,
  variant,
  className,
  color,
  as,
  style
}: TypographyProps) => {
  const { tag: defaultTag, classes } = variantClassMap[variant];
  const Tag = as || defaultTag;
  const elementClasses = cn(
    classes,
    color ? colorClassMap[color] : undefined,
    className
  );

  return React.createElement(
    Tag,
    { className: elementClasses, style },
    children
  );
};
