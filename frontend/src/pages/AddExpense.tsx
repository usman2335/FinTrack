import { useState } from "react";
import { DatePicker, Input, Radio, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const { TextArea } = Input;

const AddExpensePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    note: "",
  });
  // setFormData({
  //   title: "",
  //   category: "",
  //   amount: "",
  //   date: "",
  //   note: "",
  // });
  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //   >
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleSubmit = () => {
    console.log("Expense Data:", formData);
    // TODO: Integrate with backend
  };
  const navigate = useNavigate();
  const [period, setPeriod] = useState("Add-Expense");

  // const onFinish = (values: any) => {
  //   console.log("Budget Added:", values);
  // };

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
          className=""
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
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Title</label>
            <Input
              className="h-10 mt-5"
              placeholder='e.g. "Dinner at hostel"'
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Category</label>
            <Select
              className=" w-full"
              size="large"
              title="Category"
              showSearch
              placeholder="Select a category"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "1", label: "Food" },
                { value: "2", label: "Travel" },
                { value: "3", label: "Shopping" },
                { value: "4", label: "Health" },
                { value: "5", label: "Other" },
              ]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Amount</label>
            <Input
              className="h-10"
              placeholder='e.g. "500"'
              // value={formData.title}
              // onChange={handleChange}
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Date</label>
            <DatePicker className="h-10 w-full" />
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
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-800 "
          >
            + Add Expense
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddExpensePage;
