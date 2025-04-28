import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function ReportedIncidents() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/crime");
        setReports(res.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = filter
    ? reports.filter((r) => r.crimeType === filter)
    : reports;

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
        <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Loading incidents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex flex-col p-4">
      <div className="flex items-center justify-between mb-4 px-4">
        <button
          onClick={() => navigate('/report')}
          className="flex items-center gap-2 bg-white hover:bg-white/90 text-indigo-900 px-6 py-2.5 rounded-full font-medium transition-colors duration-200"
        >
          <MapPinIcon className="h-5 w-5" />
          Report New Incident
        </button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white/20 text-white border-0 px-6 py-2.5 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer hover:bg-white/30 transition-colors duration-200"
        >
          <option value="">All Types</option>
          <option value="Theft">Theft</option>
          <option value="Assault">Assault</option>
          <option value="Burglary">Burglary</option>
          <option value="Vandalism">Vandalism</option>
          <option value="Fraud">Fraud</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid gap-4 p-4">
          {filteredReports.map((report) => (
            <div 
              key={report.id} 
              className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all duration-300 border border-white/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                    report.crimeType === "Theft"
                      ? "bg-yellow-200/90 text-yellow-900"
                      : report.crimeType === "Assault"
                      ? "bg-red-200/90 text-red-900"
                      : report.crimeType === "Burglary"
                      ? "bg-pink-200/90 text-pink-900"
                      : report.crimeType === "Vandalism"
                      ? "bg-blue-200/90 text-blue-900"
                      : report.crimeType === "Fraud"
                      ? "bg-green-200/90 text-green-900"
                      : "bg-gray-200/90 text-gray-900"
                  }`}>
                    {report.crimeType}
                  </span>
                  <p className="text-white font-medium mb-2">{report.description}</p>
                  <p className="text-white/80 text-sm mb-1">{report.locationName}</p>
                </div>
                <span className="text-xs text-white/80">
                  {new Date(report.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/80">
                <MapPinIcon className="h-4 w-4" />
                <span>Lat: {report.latitude.toFixed(4)}, Long: {report.longitude.toFixed(4)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 