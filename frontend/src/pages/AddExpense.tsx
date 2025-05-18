import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import { useNavigate } from "react-router-dom";

const AddExpensePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
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
  const [period, setPeriod] = useState("Add-Expense");

  const onFinish = (values: any) => {
    console.log("Budget Added:", values);
  };

  const onPeriodChange = (e: any) => {
    setPeriod(e.target.value);
    // Navigate based on selection
    if (e.target.value === "Add-Expense") {
      navigate("/dashboard/finances/add-expense");
    } else if (e.target.value === "Add-Budget") {
      navigate("/dashboard/finances/add-budget");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add Expense</h2>
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
            Add Expense
          </h2>
          <p className="text-gray-500 mb-4">Track what you spend.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Title with Mail Icon */}
            <div className="relative">
              <label className="block text-sm font-medium">Title</label>
              <MailOutlined className="absolute top-10 left-3 text-gray-400" />
              <input
                type="text"
                name="title"
                placeholder='e.g. "Dinner at hostel"'
                className="mt-1 w-full border rounded-lg p-2 pl-10"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="">Select a category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
            </div>

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

            {/* Date */}
            <div>
              <label className="block text-sm font-medium">Date</label>
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
            + Add Expense
          </button>
        </div>
      </main>
    </div>
  );
};

export default AddExpensePage;
