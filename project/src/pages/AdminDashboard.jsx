import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../components/ui/Modal';
import StudentForm from '../components/forms/StudentForm';

export default function AdminDashboard() {
  const [students, setStudents] = useState([
    { id: '1', name: 'John Doe', level: '1', visits: 2, trainingDays: 30, email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', level: '2', visits: 3, trainingDays: 60, email: 'jane@example.com' },
    { id: '3', name: 'Adel Ezzat', level: '3', visits: 4, trainingDays: 90, email: 'adel@example.com' },
    { id: '4', name: 'Gaaml Ezzat', level: '4', visits: 4, trainingDays: 90, email: 'adel@example.com' },
    { id: '5', name: 'ahmed Ezzat', level: '2', visits: 4, trainingDays: 90, email: 'adel@example.com' },
    { id: '6', name: 'ali Ezzat', level: '1', visits: 4, trainingDays: 90, email: 'adel@example.com' },
    { id: '7', name: 'sos Ezzat', level: '2', visits: 4, trainingDays: 90, email: 'adel@example.com' },
    { id: '8', name: 'maa Ezzat', level: '3', visits: 4, trainingDays: 90, email: 'adel@example.com' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleAddOrUpdateStudent = (studentData) => {
    if (editingStudent) {
      setStudents(students.map(student => 
        student.id === editingStudent.id ? studentData : student
      ));
    } else {
      setStudents([...students, { ...studentData, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setEditingStudent(null);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };

  const filteredStudents = students.filter(student => {
    const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel ? student.level === filterLevel : true;
    return matchesName && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-700">Admin Dashboard</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            + Add Student
          </button>
        </div>

        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Levels</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
          </select>
        </div>

        {filteredStudents.length > 0 ? (
          <div className="bg-gray-100 shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  {['Name', 'ID', 'Level', 'Visits', 'Training Days', 'Actions'].map(header => (
                    <th key={header} className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-100 transition-colors duration-200">
                    <td className="px-6 py-4 text-gray-700 font-medium">{student.name}</td>
                    <td className="px-6 py-4 text-gray-500">{student.id}</td>
                    <td className="px-6 py-4 text-gray-500">{student.level}</td>
                    <td className="px-6 py-4 text-gray-500">{student.visits}/4</td>
                    <td className="px-6 py-4 text-gray-500">{student.trainingDays}/90</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm">
            No students match the search criteria.
          </div>
        )}

        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingStudent ? 'Edit Student' : 'Add New Student'}
        >
          <StudentForm
            student={editingStudent}
            onSubmit={handleAddOrUpdateStudent}
            onCancel={handleCloseModal}
          />
        </Modal>
      </div>
    </div>
  );
}
