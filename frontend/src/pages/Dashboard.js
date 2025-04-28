import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheckIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-4 drop-shadow-sm">
            Welcome to Police Emergency System
          </h1>
          <p className="text-xl text-gray-800 mb-12">
            Your safety is our priority. Access emergency services and stay
            informed.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Emergency Services Card */}
            <div className="bg-white shadow-xl rounded-2xl border border-red-100 hover:shadow-2xl transition-shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                    <PhoneIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Emergency Services
                    </h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Quick access to emergency contacts and SOS features
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/emergency-contacts"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    View Contacts
                  </Link>
                </div>
              </div>
            </div>

            {/* Safety Tips Card */}
            <div className="bg-white shadow-xl rounded-2xl border border-yellow-100 hover:shadow-2xl transition-shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Safety Tips
                    </h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Learn how to stay safe and handle emergency situations
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/safety-tips"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                  >
                    View Tips
                  </Link>
                </div>
              </div>
            </div>

            {/* Report Incident Card */}
            <div className="bg-white shadow-xl rounded-2xl border border-indigo-100 hover:shadow-2xl transition-shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                    <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Report Incident
                    </h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Report incidents or suspicious activities
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/report-incident"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Report Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
