import React, { useState, useEffect } from "react";

export default function EditIncome({ source, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
    note: "",
    iconKey: "",
  });

  useEffect(() => {
    if (source) {
      setFormData({
        name: source.name || "",
        amount: source.amount || "",
        date: source.date ? new Date(source.date).toISOString().substr(0, 10) : "",
        category: source.category || "",
        note: source.note || "",
        iconKey: source.iconKey || "",
      });
    }
  }, [source]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-white">Edit Income</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
            <input 
              type="text" name="name" value={formData.name} onChange={handleChange} 
              className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Amount</label>
            <input 
              type="number" name="amount" value={formData.amount} onChange={handleChange} 
              className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
              required 
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Date</label>
            <input 
              type="date" name="date" value={formData.date} onChange={handleChange} 
              className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
            <input 
              type="text" name="category" value={formData.category} onChange={handleChange} 
              className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Note</label>
            <textarea
              name="note" value={formData.note} onChange={handleChange} 
              className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>
          {/* Optionally add iconKey input or dropdown here */}

          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
