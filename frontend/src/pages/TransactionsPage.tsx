import { AllTransactionsTable } from "../components/TransactionsTable/TransactionsTable";
import { motion } from "framer-motion";

const TransactionsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      className="md:p-6 flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">Transactions</h1>
      <p className="text-gray-500">
        View, filter, and track your financial activity in detail.
      </p>
      <AllTransactionsTable />
    </motion.div>
  );
};

export default TransactionsPage;
