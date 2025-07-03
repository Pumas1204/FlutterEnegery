import { CSSProperties, MouseEventHandler, PropsWithChildren } from "react";

export type __AppLinkCompType = React.FC<
  PropsWithChildren<{
    href: string;
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    onMouseOver?: MouseEventHandler<HTMLAnchorElement>;
    searchParamsSensitive?: boolean;
    preventReload?: boolean;
  }>
>;
