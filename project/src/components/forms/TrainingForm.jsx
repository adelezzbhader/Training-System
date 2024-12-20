import { useState, useEffect } from 'react';

export default function TrainingForm({ training, onSubmit, onCancel }) {
    const [company, setCompany] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // إذا كان هناك تدريب يتم تعديله، نقوم بتحميل البيانات
    useEffect(() => {
        if (training) {
            setCompany(training.company);
            setStartDate(training.startDate);
            setEndDate(training.endDate);
        }
    }, [training]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (new Date(startDate) > new Date(endDate)) {
            alert('Start date cannot be after end date.');
            return;
        }
        onSubmit({ company, startDate, endDate });
        setCompany('');
        setStartDate('');
        setEndDate('');
        onCancel(); // إغلاق النافذة بعد الحفظ
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-600"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-600"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-600"
                    required
                />
            </div>
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {training ? 'Edit Training' : 'Add Training'}
                </button>
            </div>
        </form>
    );
}
