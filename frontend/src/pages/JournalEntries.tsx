import { motion } from "framer-motion";
import JournalSummaryTable from "../components/TransactionsTable/JournalTable";

const JournalEntries = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      className="md:p-6 flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">Journal Entries</h1>
      <p className="text-gray-500">
        Review and reflect on your spending habits.”
      </p>
      <h2 className="text-xl font-bold text-primary-blue">
        Daily Transaction Summary
      </h2>
      <JournalSummaryTable />
    </motion.div>
  );
};

export default JournalEntries;
