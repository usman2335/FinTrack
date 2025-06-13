import React, { useState } from "react";
import { DatePicker, Input, Radio, Select } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import axios from "axios";
import Swal from "sweetalert2";

const AddBudgetPage: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: "",
    budgetType: "", // Monthly or Weekly
    month: "",
    week: "",
    note: "",
  });
  // console.log(formData);
  const navigate = useNavigate();
  const [period, setPeriod] = useState("Add-Budget");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, budgetType: value }));
  };

  const handleMonthChange = (month: any) => {
    const dayOfMonth = dayjs(month).month() + 1;

    setFormData((prev) => ({
      ...prev,
      month: month ? dayOfMonth.toString() : "",
    }));
  };

  const handleWeekChange = (week: any) => {
    const dayOfMonth = dayjs(week).date(); // 1 to 31
    const weekOfMonth = Math.ceil(dayOfMonth / 7); // 1 to 5
    setFormData((prev) => ({ ...prev, week: weekOfMonth.toString() }));
  };

  const handleSubmit = async () => {
    console.log("Form Data:", formData);
    try {
      const payload = {
        totalBudget: Number(formData.amount),
        budgetType: formData.budgetType,
        year: dayjs().year(),
        month: Number(formData.month),
        week: formData.week,
        note: formData.note,
      };
      console.log("Payload: ", payload);
      const res = await axios.post(
        "http://localhost:5000/api/budget",
        payload,
        { withCredentials: true }
      );
      console.log("Budget added:", res.data);
      Swal.fire({
        title: "Budget Added!",
        text: "Your budget has been successfully added.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

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
      className="md:p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-center space-x-2">
        <Radio.Group
          onChange={onPeriodChange}
          value={period}
          optionType="button"
          buttonStyle="solid"
          size="large"
        >
          <Radio.Button value="Add-Expense">+ Add Expense</Radio.Button>
          <Radio.Button value="Add-Budget">Add Budget +</Radio.Button>
        </Radio.Group>
      </div>

      <div className="bg-white rounded-xl shadow p-6 w-full">
        <h2 className="text-2xl font-bold mb-4 text-primary-blue">
          Add Budget
        </h2>
        <p className="text-gray-500 mb-4">Set Limits to manage better.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Amount */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Amount</label>
            <Input
              name="amount"
              type="number"
              className="h-10 mt-5"
              placeholder='e.g. "500"'
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          {/* Budget Type */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Category</label>
            <Select
              defaultActiveFirstOption
              className="w-full"
              size="large"
              title="Category"
              placeholder="Select a category"
              value={formData.budgetType}
              onChange={handleSelectChange}
              options={[
                { value: "Monthly", label: "Monthly" },
                { value: "Weekly", label: "Weekly" },
              ]}
            />
          </div>

          {/* Start Date (Month) */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Select Month</label>
            <DatePicker
              // defaultValue={dayjs()}
              picker="month"
              size="large"
              onChange={handleMonthChange}
            />
          </div>

          {/* End Date (Week) */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Select Week</label>
            <DatePicker
              disabled={formData.budgetType !== "Weekly"}
              picker="week"
              size="large"
              onChange={handleWeekChange}
            />
          </div>
        </div>

        {/* Note */}
        <div className="mb-6 flex flex-col gap-2">
          <label className="block text-sm font-medium">Note (optional)</label>
          <TextArea
            name="note"
            showCount
            maxLength={100}
            placeholder="Add additional details (optional)"
            style={{ height: 120, resize: "none" }}
            value={formData.note}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-800"
          >
            Add Budget +
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddBudgetPage;
