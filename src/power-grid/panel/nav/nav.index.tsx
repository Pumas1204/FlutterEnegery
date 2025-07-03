"use client";
import { PATH } from "data";
import { Button, Layout } from "antd";
import {
  TbAlertTriangle,
  TbChartBar,
  // TbHelp,
  TbLayoutDashboard,
  // TbSettings,
} from "react-icons/tb";
import Image from "next/image";
import logo from "assets/images/logo.svg";
import { usePathname, useRouter } from "next/navigation";

const menu = [
  {
    icon: <TbLayoutDashboard />,
    key: "dashboard",
    label: "Dashboard",
    path: PATH.panel.path,
  },
  {
    icon: <TbChartBar />,
    key: "charts",
    label: "Charts",
    path: PATH.charts().path,
  },
  {
    icon: <TbAlertTriangle />,
    key: "alarms",
    label: "Alarms",
    path: PATH.alarms().path,
  },
];

export default function NavComp() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (pathname === path) return; // Don't navigate if we're already on this path
    router.replace(path, { scroll: false });
  };

  return (
    <Layout.Sider className="bg-white pv-4 ph-3">
      <div className="flex flex-col gap-4">
        <Image src={logo} alt="Power Grid" width={140} height={70} />
        {menu.map((item) => (
          <Button
            key={item.key}
            type={pathname === item.path ? "primary" : "text"}
            icon={item.icon}
            className="w-100"
            onClick={() => handleNavigation(item.path)}
          >
            <span className="w-100" style={{ textAlign: "left" }}>
              {item.label}
            </span>
          </Button>
        ))}
        <span className="flex-1"></span>
        {/* <Button type={"text"} icon={<TbHelp />} className="w-100">
          <span className="w-100" style={{ textAlign: "left" }}>
            Support
          </span>
        </Button>
        <Button type={"text"} icon={<TbSettings />} className="w-100">
          <span className="w-100" style={{ textAlign: "left" }}>
            Setting
          </span>
        </Button> */}
      </div>
    </Layout.Sider>
  );
}
