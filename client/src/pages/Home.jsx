import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col grow w-full">
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 bg-gray-100 shadow-sm border-b border-gray-200">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            New Powered{' '}
            <span className="text-blue-600">Intrusion Detection</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            A new solution to the traditional system by applying Artificial
            Intelligence to enhance and provide a highly precise security tool
            for analyzing network traffic, detecting anomalies, and identifying
            malicious attacks.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Explore Now
            </Link>
            <Link
              to="/info"
              className="px-8 py-3 text-lg font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-yellow-600">
            Integrated by An Advanced Machine Learning Model
          </h2>
          <p className="text-gray-500 mt-4">
            Built to monitor network traffic flows that may contain either known
            or unknown threats with high accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 text-2xl">
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
                  d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              XGBoost Model
            </h3>
            <p className="text-gray-600 leading-relaxed">
              A trained extreme gradient boosting (XGBoost) algorithm that
              achieves 76% accuracy for categorzing across 10 distinct types of
              attacks.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6 text-2xl">
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
                  d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Threat Classification
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Be able to categorize your network traffic into Normal or threats,
              such as DoS, Exploits, Fuzzers, Reconnaissance, and etc.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6 text-2xl">
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
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Analysis and Result
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Accept up to 42 network traffic features per record for analyzing,
              and instantly delivery the outcome in the comprehensive dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
