import { useState } from "react";
import { DatePicker, Input, Radio, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import dayjs from "dayjs"; // Make sure this is installed
import axios from "axios";
import Swal from "sweetalert2";
const { TextArea } = Input;

const AddExpensePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    note: "",
  });
  console.log(formData);

  const navigate = useNavigate();
  const [period, setPeriod] = useState("Add-Expense");

  const onPeriodChange = (e: any) => {
    setPeriod(e.target.value);
    if (e.target.value === "Add-Expense") {
      navigate("/dashboard/finances/add-expense");
    } else if (e.target.value === "Add-Budget") {
      navigate("/dashboard/finances/add-budget");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleDateChange = (date: any) => {
    const formatted = date ? dayjs(date).format("YYYY-MM-DD") : "";
    setFormData((prev) => ({ ...prev, date: formatted }));
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, note: e.target.value }));
  };

  const handleSubmit = async () => {
    console.log("Expense Data:", formData);
    const payload = {
      title: formData.title,
      category: formData.category,
      amount: Number(formData.amount),
      date: formData.date,
      note: formData.note,
    };
    const res = await axios.post(
      "http://localhost:5000/api/expenses",
      payload,
      {
        withCredentials: true,
      }
    );
    console.log("Response:", res.data);
    Swal.fire({
      title: "Expense Added!",
      text: "Your expense has been successfully added.",
      icon: "success",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      className="md:p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-center space-x-2">
        <Radio.Group
          onChange={onPeriodChange}
          value={period}
          size="large"
          optionType="button"
          buttonStyle="solid"
        >
          <Radio.Button value="Add-Expense">+ Add Expense</Radio.Button>
          <Radio.Button value="Add-Budget">Add Budget +</Radio.Button>
        </Radio.Group>
      </div>

      <div className="bg-white rounded-xl shadow p-6 w-full h-full">
        <h2 className="text-2xl font-bold mb-4 text-primary-blue">
          Add Expense
        </h2>
        <p className="text-gray-500 mb-4">Track what you spend.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Title</label>
            <Input
              className="h-10 mt-5"
              placeholder='e.g. "Dinner at hostel"'
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Category</label>
            <Select
              className="w-full"
              size="large"
              showSearch
              placeholder="Select a category"
              value={formData.category}
              onChange={handleCategoryChange}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "Food", label: "Food" },
                { value: "Travel", label: "Travel" },
                { value: "Shopping", label: "Shopping" },
                { value: "Health", label: "Health" },
                { value: "Other", label: "Other" },
              ]}
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Amount</label>
            <Input
              className="h-10"
              placeholder='e.g. "500"'
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Date</label>
            <DatePicker
              className="h-10 w-full"
              value={formData.date ? dayjs(formData.date) : null}
              onChange={handleDateChange}
            />
          </div>
        </div>

        {/* Note */}
        <div className="mb-6 flex flex-col gap-2">
          <label className="block text-sm font-medium">Note (optional)</label>
          <TextArea
            showCount
            maxLength={100}
            placeholder="Add additional details (optional)"
            style={{ height: 120, resize: "none" }}
            value={formData.note}
            onChange={handleNoteChange}
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-800"
          >
            + Add Expense
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddExpensePage;
