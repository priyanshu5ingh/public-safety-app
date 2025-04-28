import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import { MapPinIcon, ExclamationTriangleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.75rem"
};

const center = {
  lat: 12.9716,
  lng: 77.5946,
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export default function CrimeMap() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

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

  if (isLoading || !isLoaded) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
        <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center">
      <div className="w-full max-w-7xl h-[90vh] mx-auto flex gap-4">
        <div className="flex-1 bg-white/30 backdrop-blur-sm rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/20">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-white" /> Crime Map
            </h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/30 border border-white/30 text-white px-3 py-1 rounded-lg text-sm focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none"
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
          <div className="h-[calc(90vh-4rem)]">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={center}
              options={options}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {filteredReports.map((report) => (
                <Marker
                  key={report.id}
                  position={{ lat: report.latitude, lng: report.longitude }}
                  onClick={() => setSelectedMarker(report)}
                  icon={{
                    url: `https://maps.google.com/mapfiles/ms/icons/${
                      report.crimeType === "Theft"
                        ? "yellow"
                        : report.crimeType === "Assault"
                        ? "red"
                        : report.crimeType === "Burglary"
                        ? "pink"
                        : report.crimeType === "Vandalism"
                        ? "blue"
                        : report.crimeType === "Fraud"
                        ? "green"
                        : "purple"
                    }-dot.png`
                  }}
                />
              ))}
              
              {selectedMarker && (
                <InfoWindow
                  position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-3 min-w-[250px]">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2 ${
                      selectedMarker.crimeType === "Theft"
                        ? "bg-yellow-200/90 text-yellow-900"
                        : selectedMarker.crimeType === "Assault"
                        ? "bg-red-200/90 text-red-900"
                        : selectedMarker.crimeType === "Burglary"
                        ? "bg-pink-200/90 text-pink-900"
                        : selectedMarker.crimeType === "Vandalism"
                        ? "bg-blue-200/90 text-blue-900"
                        : selectedMarker.crimeType === "Fraud"
                        ? "bg-green-200/90 text-green-900"
                        : "bg-gray-200/90 text-gray-900"
                    }`}>
                      {selectedMarker.crimeType}
                    </span>
                    <h3 className="font-bold text-sm mb-2">{selectedMarker.locationName}</h3>
                    <p className="text-sm text-gray-700 mb-2">{selectedMarker.description}</p>
                    <div className="text-xs space-y-1">
                      <p className="text-gray-500">
                        {new Date(selectedMarker.timestamp).toLocaleString()}
                      </p>
                      {selectedMarker.shareIdentity && (
                        <div className="mt-2 p-2 bg-blue-50 rounded-md">
                          <p className="text-blue-800 font-medium">Contact Information:</p>
                          <p className="text-blue-600">{selectedMarker.victimName}</p>
                          <p className="text-blue-600">{selectedMarker.contactNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>

        <div className="w-72 bg-white/30 backdrop-blur-sm rounded-xl p-4 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-1.5">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-300" /> Legend
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="text-sm text-white">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
                <span className="text-sm text-white">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span className="text-sm text-white">Low Risk</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-1.5">
              <ShieldCheckIcon className="h-5 w-5 text-green-300" /> Safety Tips
            </h3>
            <ul className="space-y-2 text-sm text-white">
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">•</span>
                <span>Avoid isolated areas after dark</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">•</span>
                <span>Keep valuables secure and out of sight</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">•</span>
                <span>Stay in well-lit areas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">•</span>
                <span>Be aware of surroundings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">•</span>
                <span>Report suspicious activities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
