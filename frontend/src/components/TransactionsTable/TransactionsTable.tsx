import { Table, Tag, type TableProps } from "antd";
import transactions from "../../data/transactions";
import "./TransactionsTable.css";
import getTransactions from "../../data/transactions";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

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
    render: (date) => dayjs(date).format("YYYY-MM-DD"),
    sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    sorter: (a, b) => a.amount - b.amount,
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
];
const TransactionsTable = ({ pagination }: TransactionsTableProps) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions();
      setTransactions(data);
      console.log(data);
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <Table<DataType>
        columns={columns}
        dataSource={
          pagination == false ? transactions.slice(0, 5) : transactions
        }
        pagination={pagination === false ? false : { pageSize: 8 }}
        style={{ height: "100%", width: "100%" }}
        rowClassName={() => "custom-row"}
      />
    </div>
  );
};

const AllTransactionsTable = () => {
  return (
    <div>
      {/* <Table<DataType>
        columns={columns}
        dataSource={transactions}
        style={{ height: "100%", width: "100%" }}
        rowClassName={() => "custom-row"}
        pagination={{
          pageSize: 8,
        }}
      /> */}
    </div>
  );
};

export { TransactionsTable, AllTransactionsTable };
