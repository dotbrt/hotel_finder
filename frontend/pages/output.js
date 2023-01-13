import { Table, Input, Button } from "antd";
export default function Output(props) {
    const keys = Object.keys(props[0]);
    console.log(props);
    const columns = [
        {
            title: "index",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "url",
            dataIndex: "url",
            key: "url",
        },
        {
            title: "owner",
            dataIndex: "owner",
            key: "owner",
        },
    ];
    return (
        <>
            <Table
                dataSource={Object.values(props)}
                columns={columns}
                // rowKey={(record) => record.url}
            />
        </>
    );
}
