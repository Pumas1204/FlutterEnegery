"use client";
import { PropsWithChildren, useEffect, useState } from "react";

const ClientRenderComp: React.FC<PropsWithChildren> = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return <>{props.children}</>;
};

export default ClientRenderComp;
