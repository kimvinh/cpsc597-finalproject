const Details = ({ isOpen, onClose, type, records }) => {
  if (!isOpen) return null;
  const filteredRecords = records.filter(
    (record) => record.prediction === type,
  );
  const isNormal = type === 'Normal';

  return (
    // The dark, semi-transparent backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose} // Closes modal if user clicks the dark background
    >
      {/* The Modal Container */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevents clicks inside the modal from closing it
      >
        {/* Modal Header */}
        <div
          className={`flex justify-between items-center p-6 border-b ${isNormal ? 'bg-green-50' : 'bg-red-50'}`}
        >
          <div>
            <h3
              className={`text-2xl font-extrabold ${isNormal ? 'text-green-800' : 'text-red-800'}`}
            >
              {type} Packets Detected
            </h3>
            <p className="text-sm font-semibold mt-1 text-gray-600">
              Showing {filteredRecords.length} isolated records
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors font-bold text-xl shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body / Scrollable Table */}
        <div className="p-6 overflow-auto bg-gray-50">
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100 sticky top-0 border-b border-gray-200 shadow-sm">
                <tr>
                  <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-wider">
                    Row ID
                  </th>
                  <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-wider">
                    Protocol
                  </th>
                  <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-wider">
                    AI Prediction
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-4 text-sm font-mono text-gray-600">
                      #{record.id}
                    </td>
                    <td className="p-4 text-sm text-gray-800 uppercase font-bold">
                      {record.protocol}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                          isNormal
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                        }`}
                      >
                        {record.prediction}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
