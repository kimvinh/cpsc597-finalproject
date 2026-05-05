import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Details from '../Components/Details';
import { useState } from 'react';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedAttack, setSelectedAttack] = useState(null);

  if (!location.state) {
    return <Navigate to="/dashboard" replace />;
  }

  const { results, filename } = location.state;
  const totalData = results.numerical_data.length;

  return (
    <section
      id="result"
      className="flex grow justify-center items-center w-full bg-gray-50 p-4 md:p-10"
    >
      <div className="flex flex-col w-full max-w-5xl bg-white shadow-2xl border border-gray-100 rounded-2xl p-8 animate-fade-in-up">
        <div className="flex flex-row justify-between items-center border-b pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              Network Traffic Analysis Result
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Uploaded File:{' '}
              <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                {filename}
              </span>
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex justify-center items-center space-x-2 mt-4 px-6 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-300 font-bold transition-all"
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <span>Try Another File</span>
          </button>
        </div>

        <div className="bg-indigo-50 border border-blue-100 rounded-xl p-8 mb-10 flex flex-col items-center justify-center text-center shadow-inner">
          <span className="text-blue-800 text-sm font-bold uppercase tracking-wider mb-2">
            Total Network Traffics Analyzed
          </span>
          <span className="text-6xl font-black text-blue-600 text-shadow-xs">
            {totalData}
          </span>
        </div>

        <div className="w-full">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Network Traffic Classification
          </h3>
          <div className="grid grid-cols-3 gap-6">
            {Object.entries(results.summary)
              .sort(([, a], [, b]) => b - a)
              .map(([key, value]) => {
                const isNormal = key === 'Normal';
                return (
                  <div
                    key={key}
                    className={`cursor-pointer flex flex-col p-4 rounded-xl border-2 hover:-translate-y-1 hover:shadow-md transition-all ${
                      isNormal
                        ? 'bg-green-50/50 border-green-100 hover:border-green-300'
                        : 'bg-red-50/50 border-red-100 hover:border-red-300'
                    }`}
                    onClick={() => setSelectedAttack(key)}
                  >
                    <div
                      className={`flex justify-between items-center ${isNormal ? 'text-green-700' : 'text-red-700'}`}
                    >
                      <span className={'text-lg font-bold'}>{key}</span>
                      <span className="font-mono text-xl">{value}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Details
        isOpen={selectedAttack !== null}
        onClose={() => setSelectedAttack(null)}
        type={selectedAttack}
        records={results.details}
      />
    </section>
  );
};

export default Result;
