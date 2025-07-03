"use client";
import { ConfigProvider } from "antd";
import { ContextProviderComp } from "context";
import { AntdTheme } from "utilities";
import { __BasePropsType } from "./base.type";
import LayoutComp from "./layout/layout.index";
import { useEffect, useState } from "react";

export const BaseComp: React.FC<React.PropsWithChildren<__BasePropsType>> = (
  props: React.PropsWithChildren<__BasePropsType>,
) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <ContextProviderComp profile={props.profile}>
      <ThemeComp>
        {props.noLayout ? (
          props.children
        ) : (
          <LayoutComp>{props.children}</LayoutComp>
        )}
      </ThemeComp>
    </ContextProviderComp>
  );
};

export const ThemeComp: React.FC<React.PropsWithChildren> = (props) => {
  return <ConfigProvider theme={AntdTheme}>{props.children}</ConfigProvider>;
};
