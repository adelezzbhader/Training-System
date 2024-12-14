import { useState } from 'react';

export default function StudentDashboard() {
  const [studentData] = useState({
    name: 'John Doe',
    id: '12345',
    visits: [
      { date: '2024-03-01', location: 'Company A' },
      { date: '2024-03-15', location: 'Company B' },
    ],
    trainings: [
      { company: 'Tech Corp', duration: '2 months', startDate: '2024-01-01', endDate: '2024-02-29' },
      { company: 'Dev Inc', duration: '1 month', startDate: '2024-03-01', endDate: '2024-03-31' },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-6 shadow">
          <h1 className="text-3xl font-bold">Welcome, {studentData.name}!</h1>
          <p className="text-sm mt-2">ID: {studentData.id}</p>
        </div>

        {/* Progress Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Progress Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Visits Progress</h2>
              <p className="text-3xl font-bold text-indigo-600">{studentData.visits.length}/4</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${(studentData.visits.length / 4) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">Completed visits</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Training Progress</h2>
              <p className="text-3xl font-bold text-green-600">3/3</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: '100%' }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">Months completed</p>
            </div>
          </div>
        </div>

        {/* Visits History */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Visits History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentData.visits.map((visit, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{visit.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{visit.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Training History */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Training History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentData.trainings.map((training, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{training.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{training.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{training.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{training.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
