import { Table, Tag, type TableProps } from "antd";
import transactions from "../../data/transactions";

interface DataType {
  id: number;
  title: string;
  date: string;
  amount: number;
  type: string;
}
interface TransactionsTableProps {
  rowLimit?: number;
  pagination?: boolean;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Type",
    key: "type",
    dataIndex: "type",
    render: (_, { type }) => (
      <>
        <Tag color={type === "income" ? "green" : "volcano"}>
          {type.toUpperCase()}
        </Tag>
      </>
    ),
  },
];
const TransactionsTable = ({
  rowLimit,
  pagination,
}: TransactionsTableProps) => {
  const dataToShow = rowLimit ? transactions.slice(0, rowLimit) : transactions;
  return (
    <div>
      <Table<DataType>
        columns={columns}
        dataSource={dataToShow}
        pagination={pagination === false ? false : undefined}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default TransactionsTable;
