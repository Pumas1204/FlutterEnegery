import { BaseComp } from "components";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";
import { NetworkLogType } from "types";
import NetworkLogComp from "power-grid/networkLog/networkLog.index";
export default function SSRDevToolPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
  function readData(): NetworkLogType[] {
    try {
      const filePath = path.join(process.cwd(), "ssr-network-logs.json");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch {
      return [];
    }
  }
  return (
    <BaseComp noLayout>
      <NetworkLogComp data={readData()} />;
    </BaseComp>
  );
}
