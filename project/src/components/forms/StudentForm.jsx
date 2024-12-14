import React from "react";

export default function StudentForm({ student, onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState(
    student || {
      name: "",
      id: "",
      level: "",
      email: "",
      password: "",
      visits: 0,
      trainingDays: 0,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800 text-center">
        {student ? "Update Student Information" : "Add New Student"}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter student name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter student ID"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Level
          </label>
          <input
            type="text"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter student level"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter student email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter password"
            required={!student}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Visits (0-4)
          </label>
          <input
            type="number"
            name="visits"
            min="0"
            max="4"
            value={formData.visits}
            onChange={handleChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Number of visits"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Training Days
          </label>
          <input
            type="number"
            name="trainingDays"
            min="1"
            max="90"
            value={formData.trainingDays}
            onChange={handleChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Number of training days"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          {student ? "Update" : "Add"} Student
        </button>
      </div>
    </form>
  );
}
