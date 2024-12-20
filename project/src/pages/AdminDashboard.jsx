import { useState } from 'react';
import { FiLogOut, FiEdit2, FiTrash2, FiEye, FiPlus } from 'react-icons/fi';
import Modal from '../components/ui/Modal';
import StudentForm from '../components/forms/StudentForm';
import VisitForm from '../components/forms/VisitForm';
import TrainingForm from '../components/forms/TrainingForm';

export default function AdminDashboard() {
    const [students, setStudents] = useState([
        { id: '1', name: 'John ', level: '1', visits: 0, trainingDuration: 0 },
        { id: '2', name: 'Adel ', level: '2', visits: 0, trainingDuration: 0 },
        { id: '3', name: 'ahmed ', level: '1', visits: 0, trainingDuration: 0 },
        { id: '4', name: 'Jane ', level: '2', visits: 0, trainingDuration: 0 },
        { id: '5', name: 'Doe ', level: '1', visits: 0, trainingDuration: 0 },
        { id: '6', name: 'Smith', level: '2', visits: 0, trainingDuration: 0 },
        { id: '7', name: 'tantawy', level: '1', visits: 0, trainingDuration: 0 },
        { id: '8', name: 'mina', level: '2', visits: 0, trainingDuration: 0 },
        { id: '9', name: 'mostafa', level: '1', visits: 0, trainingDuration: 0 },
        { id: '10', name: 'cyrle', level: '2', visits: 0, trainingDuration: 0 },
    ]);

    const [visits, setVisits] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLevel, setFilterLevel] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showVisitForm, setShowVisitForm] = useState(false);
    const [showTrainingForm, setShowTrainingForm] = useState(false);
    const [currentStudentId, setCurrentStudentId] = useState(null);
    const [editingVisit, setEditingVisit] = useState(null);  // لحفظ الزيارة التي يتم تعديلها
    const [editingTraining, setEditingTraining] = useState(null);  // لحفظ التدريب الذي يتم تعديله

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

    const handleAddVisit = (visit) => {
        setVisits([...visits, { ...visit, id: Date.now().toString(), studentId: currentStudentId }]);
        setShowVisitForm(false);
    };

    const handleAddTraining = (training) => {
        setTrainings([...trainings, { ...training, id: Date.now().toString(), studentId: currentStudentId }]);
        setShowTrainingForm(false);
    };

    const handleDeleteVisit = (id) => {
        setVisits(visits.filter(visit => visit.id !== id));
    };

    const handleDeleteTraining = (id) => {
        setTrainings(trainings.filter(training => training.id !== id));
    };

    const handleShowInfo = (student) => {
        setSelectedStudent(student);
        setShowInfoModal(true);
    };

    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Difference in days
        return `${diff} days`;
    };

    // جديد: دالة تعديل الزيارة
    const handleEditVisit = (visit) => {
        setEditingVisit(visit);
        setShowVisitForm(true);
    };

    // جديد: دالة تعديل التدريب
    const handleEditTraining = (training) => {
        setEditingTraining(training);
        setShowTrainingForm(true);
    };

    const filteredStudents = students.filter(student => {
        const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = filterLevel ? student.level === filterLevel : true;
        return matchesName && matchesLevel;
    });

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-6 bg-blue-600 text-white shadow-md">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button className="flex items-center gap-2 font-semibold hover:text-red-200">
                    <FiLogOut className="h-6 w-6" />
                    Logout
                </button>
            </header>

            <main className="p-6 flex-1">
                <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Students</h2>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                        >
                            + Add Student
                        </button>
                    </div>

                    <div className="mb-6 flex gap-4">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            value={filterLevel}
                            onChange={(e) => setFilterLevel(e.target.value)}
                            className="px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="">All Levels</option>
                            <option value="1">Level 1</option>
                            <option value="2">Level 2</option>
                            <option value="3">Level 3</option>
                            <option value="4">Level 4</option>
                        </select>
                    </div>

                    {filteredStudents.length > 0 ? (
                        <table className="w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border-b">Name</th>
                                    <th className="px-4 py-2 border-b">ID</th>
                                    <th className="px-4 py-2 border-b">Level</th>
                                    <th className="px-4 py-2 border-b">Visits</th>
                                    <th className="px-4 py-2 border-b">Training Duration</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                    <th className="px-4 py-2 border-b">Add Visit</th>
                                    <th className="px-4 py-2 border-b">Add Training</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b">{student.name}</td>
                                        <td className="px-4 py-2 border-b">{student.id}</td>
                                        <td className="px-4 py-2 border-b">{student.level}</td>
                                        <td className="px-4 py-2 border-b">{visits.filter(visit => visit.studentId === student.id).length}</td>
                                        <td className="px-4 py-2 border-b">{trainings.filter(training => training.studentId === student.id).reduce((acc, training) => acc + parseInt(calculateDuration(training.startDate, training.endDate)), 0)} days</td>
                                        <td className="px-4 py-2 border-b flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingStudent(student);
                                                    setShowModal(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <FiEdit2 className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => setStudents(students.filter(s => s.id !== student.id))}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FiTrash2 className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleShowInfo(student)}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <FiEye className="h-5 w-5" />
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            <button
                                                onClick={() => {
                                                    setCurrentStudentId(student.id);
                                                    setShowVisitForm(true);
                                                }}
                                                className="bg-blue-600 text-white px-2 py-1 rounded"
                                            >
                                                + Add Visit
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            <button
                                                onClick={() => {
                                                    setCurrentStudentId(student.id);
                                                    setShowTrainingForm(true);
                                                }}
                                                className="bg-blue-600 text-white px-2 py-1 rounded"
                                            >
                                                + Add Training
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No students found.</p>
                    )}

                    {/* Modal تعديل الطالب */}
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add/Edit Student">
                        <StudentForm
                            student={editingStudent}
                            onSubmit={handleAddOrUpdateStudent}
                            onCancel={() => setShowModal(false)}
                        />
                    </Modal>

                    {/* Modal عرض معلومات الطالب */}
                    <Modal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} title="Student Info" className="w-[80vw] h-[80vh]">
                        <h3 className="text-lg font-semibold mb-4">Visits</h3>
                        <table className="w-full border-collapse border border-gray-200 mb-6">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border-b">Company</th>
                                    <th className="px-4 py-2 border-b">Date</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                              {visits.filter(visit => visit.studentId === selectedStudent?.id).map(visit => (
                                  <tr key={visit.id} className="hover:bg-gray-50">
                                      <td className="px-4 py-2 border-b">{visit.company}</td>
                                      <td className="px-4 py-2 border-b">{visit.date}</td>
                                      <td className="px-4 py-2 border-b flex gap-2">
                                          <button
                                              onClick={() => handleEditVisit(visit)}
                                              className="text-blue-600 hover:text-blue-800"
                                          >
                                              <FiEdit2 />
                                          </button>
                                          <button
                                              onClick={() => handleDeleteVisit(visit.id)}
                                              className="text-red-600 hover:text-red-800"
                                          >
                                              <FiTrash2 />
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                        </table>

                        <h3 className="text-lg font-semibold mb-4">Trainings</h3>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border-b">Company</th>
                                    <th className="px-4 py-2 border-b">Start Date</th>
                                    <th className="px-4 py-2 border-b">End Date</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                          <tbody>
                            {trainings.filter(training => training.studentId === selectedStudent?.id).map(training => (
                                <tr key={training.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{training.company}</td>
                                    <td className="px-4 py-2 border-b">{training.startDate}</td>
                                    <td className="px-4 py-2 border-b">{training.endDate}</td>
                                    <td className="px-4 py-2 border-b flex gap-2">
                                        <button
                                            onClick={() => handleEditTraining(training)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEdit2 />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTraining(training.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        </table>
                    </Modal>

                    <Modal isOpen={showVisitForm} onClose={() => setShowVisitForm(false)} title="Add/Edit Visit">
                        <VisitForm
                            visit={editingVisit} // تمرير الزيارة المعدلة
                            onSubmit={(visitData) => {
                                if (editingVisit) {
                                    // تعديل الزيارة
                                    setVisits(visits.map(v => v.id === editingVisit.id ? { ...v, ...visitData } : v));
                                } else {
                                    // إضافة زيارة جديدة
                                    handleAddVisit(visitData);
                                }
                                setEditingVisit(null); // إغلاق نموذج التعديل بعد الانتهاء
                            }}
                            onCancel={() => setShowVisitForm(false)}
                        />
                    </Modal>

                    <Modal isOpen={showTrainingForm} onClose={() => setShowTrainingForm(false)} title="Add/Edit Training">
                        <TrainingForm
                            training={editingTraining} // تمرير التدريب المعدل
                            onSubmit={(trainingData) => {
                                if (editingTraining) {
                                    // تعديل التدريب
                                    setTrainings(trainings.map(t => t.id === editingTraining.id ? { ...t, ...trainingData } : t));
                                } else {
                                    // إضافة تدريب جديد
                                    handleAddTraining(trainingData);
                                }
                                setEditingTraining(null); // إغلاق نموذج التعديل بعد الانتهاء
                            }}
                            onCancel={() => setShowTrainingForm(false)}
                        />
                    </Modal>
                </div>
            </main>
        </div>
    );
}
