import { Table, Tag, type TableProps } from "antd";
import transactions from "../../data/transactions";
import "./TransactionsTable.css";

interface DataType {
  id: number;
  title: string;
  date: string;
  amount: number;
  type: string;
  category: string;
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
    title: "Category",
    key: "category",
    dataIndex: "category",
    render: (_, { category }) => (
      <>
        <Tag color="blue">{category}</Tag>
      </>
    ),
    filters: [
      {
        text: "Salary",
        value: "Salary",
      },
      {
        text: "Groceries",
        value: "Groceries",
      },
    ],
    onFilter: (value, record) => record.category.startsWith(value as string),
    filterSearch: true,
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
    filters: [
      {
        text: "Income",
        value: "income",
      },
      {
        text: "Expense",
        value: "expense",
      },
    ],
    onFilter: (value, record) => record.type.startsWith(value as string),
    filterSearch: true,
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
        rowClassName={() => "custom-row"}
      />
    </div>
  );
};

const AllTransactionsTable = () => {
  return (
    <div>
      <Table<DataType>
        columns={columns}
        dataSource={transactions}
        style={{ height: "100%", width: "100%" }}
        rowClassName={() => "custom-row"}
        pagination={{
          pageSize: 8,
        }}
      />
    </div>
  );
};

export { TransactionsTable, AllTransactionsTable };
