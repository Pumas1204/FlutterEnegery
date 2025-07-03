import { Button, Drawer } from "antd";
import Link from "next/link";
import { useState } from "react";
import { TbMenu2 } from "react-icons/tb";
import { nextBrowser, useEventListener } from "scripts";
import styles from "./header.module.scss";

export default function HeaderComp() {
  const [collapse, setCollapse] = useState(false);
  const [isDrawerOpen, setDrawerStatus] = useState(false);

  useEventListener("scroll", () => {
    if ((nextBrowser.window?.scrollY ?? 0) > 0) setCollapse(true);
    else setCollapse(false);
  });

  return (
    <header
      className={`${collapse ? styles["collapsed"] : ""} ${styles["header"]} d-flex align-item-center`}
    >
      <div
        className={`${styles["no-bg"]} w-100 main-content align-items-center flex-between`}
      >
        <Link href={"/"}>
          <p className="t-800 t-h3 t-black">Power Grid</p>
        </Link>
        <div className="align-items-center g-10 d-pre-lg-none">menu</div>
        <div className="d-lg-none">
          <Button
            variant="text"
            color="default"
            className={`pointer center-content`}
            onClick={() => setDrawerStatus(true)}
          >
            <TbMenu2 size={25} />
          </Button>
          <Drawer
            title={"oower grid"}
            placement={"left"}
            onClose={() => setDrawerStatus(false)}
            closable={false}
            open={isDrawerOpen}
            className={styles["header-menu-drawer"]}
          >
            menu
          </Drawer>
        </div>
      </div>
    </header>
  );
}
