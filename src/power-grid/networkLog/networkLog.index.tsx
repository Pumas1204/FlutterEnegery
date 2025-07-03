"use client";
import { Descriptions, Table, Tabs } from "antd";
import { useState } from "react";
import { defaultStyles } from "react-json-view-lite";
import { JsonView } from "react-json-view-lite";
import { DateString } from "scripts";
import { NetworkLogType } from "types";

const NetworkLogComp: React.FC<{ data: NetworkLogType[] }> = ({ data }) => {
  const [expendedRowKeys, setExpendedRowKeys] = useState<string[]>([]);
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 24px" }}>
      <h3 className="mb-4">SSR Network</h3>
      <Table<NetworkLogType>
        bordered
        pagination={false}
        columns={[
          {
            title: "URL",
            render: (e) => {
              const url = new URL(e.url);
              return url.pathname;
            },
          },
          {
            title: "Method",
            render: (e) => e.method,
          },
          {
            title: "Status",
            render: (e) =>
              !e.statusCode && e ? (!e.end ? "Pending..." : e.statusCode) : "-",
          },
        ]}
        expandable={{
          expandedRowRender: (record) => <RequestContentComp data={record} />,
          expandedRowKeys: expendedRowKeys,
          onExpandedRowsChange: (keys) => setExpendedRowKeys(keys as string[]),
        }}
        dataSource={data.sort((a, b) => (a.start || 0) - (b.start || 0))}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default NetworkLogComp;

const RequestContentComp: React.FC<{ data: NetworkLogType }> = ({ data }) => {
  const ResponseContent = () => {
    if (!data.response) return null;
    try {
      const json = JSON.parse(data.response);
      return <JsonView data={json} style={defaultStyles} />;
    } catch {
      return <div dangerouslySetInnerHTML={{ __html: data.response }}></div>;
    }
  };
  const items = [
    {
      key: "network",
      label: "Network",
      children: (
        <Descriptions layout="vertical" column={12}>
          <Descriptions.Item span={4} label="Method">
            {data.method}
          </Descriptions.Item>
          <Descriptions.Item span={8} label="Status">
            {data.statusCode}
          </Descriptions.Item>
          <Descriptions.Item span={12} label="URL">
            {data.url}
          </Descriptions.Item>
          <Descriptions.Item span={4} label="Start">
            {DateString(data.start ? new Date(data.start) : new Date())}
          </Descriptions.Item>
          <Descriptions.Item span={4} label="End">
            {data.end
              ? DateString(new Date(data.end), "{h:2}:{m:2}:{s:2}")
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item span={4} label="Duration">
            {data.end && data.start ? `${data.end - data.start} ms` : "-"}
          </Descriptions.Item>
          <Descriptions.Item span={12} label="Description">
            {data.description}
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: "params",
      label: "Params",
      children: data.url?.length ? (
        <Descriptions layout="vertical" column={12}>
          {Object.entries(new URL(data.url).searchParams).map(
            ([key, value]) => (
              <Descriptions.Item key={key} span={12} label={key}>
                {value}
              </Descriptions.Item>
            ),
          )}
        </Descriptions>
      ) : null,
    },
    {
      key: "payload",
      label: "Payload",
      children: <JsonView data={JSON.parse(data.body)} style={defaultStyles} />,
    },
    {
      key: "response",
      label: "Response",
      children: <ResponseContent />,
    },
    {
      key: "response-headers",
      label: "Response Headers",
      children: (
        <JsonView
          data={JSON.parse(data.responseHeaders || "{}")}
          style={defaultStyles}
        />
      ),
    },
    {
      key: "setted-headers",
      label: "Setted Headers",
      children: (
        <JsonView
          data={JSON.parse(data.setedHeaders || "{}")}
          style={defaultStyles}
        />
      ),
    },
  ];
  const [activeKey, setActiveKey] = useState<(typeof items)[number]["key"]>(
    items[0].key,
  );
  return (
    <Tabs
      activeKey={activeKey}
      items={items}
      onChange={(e: any) => setActiveKey(e)}
    />
  );
};
