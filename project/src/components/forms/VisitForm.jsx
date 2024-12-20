import { useState, useEffect } from 'react';

export default function VisitForm({ visit, onSubmit, onCancel }) {
    const [company, setCompany] = useState('');
    const [date, setDate] = useState('');

    // إذا كان هناك زيارة يتم تعديلها، نقوم بتحميل البيانات
    useEffect(() => {
        if (visit) {
            setCompany(visit.company);
            setDate(visit.date);
        }
    }, [visit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!company || !date) {
            alert('Please fill in all fields.');
            return;
        }
        onSubmit({ company, date });
        setCompany('');
        setDate('');
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
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
                    {visit ? 'Edit Visit' : 'Add Visit'}
                </button>
            </div>
        </form>
    );
}
