import { Table } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import getTransactions from "../../data/transactions"; // same as your TransactionsTable import path

interface JournalEntry {
  date: string;
  totalSpent: number;
  transactionCount: number;
}
interface Transaction {
  id: number;
  title: string;
  date: string;
  amount: number;
  type: string;
  category: string;
}

const JournalTable = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndGroup = async () => {
      setLoading(true);
      const transactions: Transaction[] = await getTransactions();

      // Group by date
      const grouped: Record<string, { total: number; count: number }> = {};

      transactions.forEach(({ date, amount }) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        if (!grouped[formattedDate]) {
          grouped[formattedDate] = { total: 0, count: 0 };
        }
        grouped[formattedDate].total += amount;
        grouped[formattedDate].count += 1;
      });

      // Convert grouped data to array
      const groupedEntries: JournalEntry[] = Object.entries(grouped).map(
        ([date, { total, count }]) => ({
          date,
          totalSpent: total,
          transactionCount: count,
        })
      );

      // Sort descending by date (latest first)
      groupedEntries.sort((a, b) => (a.date < b.date ? 1 : -1));

      setEntries(groupedEntries);
      setLoading(false);
    };

    fetchAndGroup();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: JournalEntry, b: JournalEntry) =>
        dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "Number of Transactions",
      dataIndex: "transactionCount",
      key: "transactionCount",
      sorter: (a: JournalEntry, b: JournalEntry) =>
        a.transactionCount - b.transactionCount,
    },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (amount: number) => `PKR${amount.toFixed(2)}`,
      sorter: (a: JournalEntry, b: JournalEntry) => a.totalSpent - b.totalSpent,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={entries}
      loading={loading}
      pagination={{ pageSize: 10 }}
      rowKey="date"
      rowClassName={() => "custom-row"}
    />
  );
};

export default JournalTable;
