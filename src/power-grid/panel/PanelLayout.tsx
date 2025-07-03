"use client";
import { Layout, App } from "antd";
import NavComp from "./nav/nav.index";
import { useEffect, useState } from "react";

interface PanelLayoutProps {
  children: React.ReactNode;
}

export default function PanelLayout({ children }: PanelLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <App>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Sider className="bg-white">
          <NavComp />
        </Layout.Sider>
        <Layout>{children}</Layout>
      </Layout>
    </App>
  );
}
