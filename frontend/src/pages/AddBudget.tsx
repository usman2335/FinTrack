import React, { useState } from "react";
import { Radio } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AddBudgetPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    amount: "",
    date: "",
    note: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Expense Data:", formData);
    // TODO: Integrate with backend
  };
  const navigate = useNavigate();
  const [period, setPeriod] = useState("Add-Budget");

  // const onFinish = (values: any) => {
  //   console.log("Budget Added:", values);
  // };

  const onPeriodChange = (e: any) => {
    setPeriod(e.target.value);
    if (e.target.value === "Add-Expense") {
      navigate("/dashboard/finances/add-expense");
    } else if (e.target.value === "Add-Budget") {
      navigate("/dashboard/finances/add-budget");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      className="flex-1 p-6 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add Budget</h2>
        <div className="flex space-x-2">
          <Radio.Group
            onChange={onPeriodChange}
            value={period}
            optionType="button"
            buttonStyle="solid"
            className="mb-6"
          >
            <Radio.Button value="Add-Expense">+ Add Expense</Radio.Button>
            <Radio.Button value="Add-Budget">Add Budget +</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4 text-primary-blue">
          Add Budget
        </h2>
        <p className="text-gray-500 mb-4">Set Limits to manage better.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Amount with Lock Icon */}
          <div className="relative">
            <label className="block text-sm font-medium">Amount</label>
            <LockOutlined className="absolute top-10 left-3 text-gray-400" />
            <input
              type="number"
              name="amount"
              placeholder="e.g. 500"
              className="mt-1 w-full border rounded-lg p-2 pl-10"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          {/* Time Period with Clock Icon */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium">Start Time</label>
              <input
                type="time"
                name="startTime"
                className="mt-1 w-full border rounded-lg p-2"
                value={formData.startTime}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium">End Time</label>
              <input
                type="time"
                name="endTime"
                className="mt-1 w-full border rounded-lg p-2"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              name="date"
              className="mt-1 w-full border rounded-lg p-2"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          {/*End Date */}
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              name="date"
              className="mt-1 w-full border rounded-lg p-2"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Note */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Note (optional)</label>
          <textarea
            name="note"
            placeholder="Add additional details (optional)"
            className="mt-1 w-full border rounded-lg p-2"
            rows={4}
            value={formData.note}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
        >
          Add Budget +
        </button>
      </div>
    </motion.div>
  );
};

export default AddBudgetPage;
