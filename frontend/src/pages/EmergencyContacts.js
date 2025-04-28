import React from "react";
import { PhoneIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

const EmergencyContacts = () => {
  const contacts = [
    {
      name: "Police Emergency",
      number: "100",
      description: "For immediate police assistance",
      icon: PhoneIcon,
      color: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      name: "Ambulance",
      number: "108",
      description: "For medical emergencies",
      icon: PhoneIcon,
      color: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      name: "Fire Department",
      number: "101",
      description: "For fire emergencies",
      icon: PhoneIcon,
      color: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      name: "Women's Helpline",
      number: "1091",
      description: "24/7 support for women",
      icon: PhoneIcon,
      color: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      name: "Child Helpline",
      number: "1098",
      description: "For child protection",
      icon: PhoneIcon,
      color: "bg-green-100",
      textColor: "text-green-600",
    },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Emergency Contacts
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Quick access to emergency services and support
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <div
                key={contact.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 ${contact.color} rounded-md p-3`}
                    >
                      <contact.icon
                        className={`h-6 w-6 ${contact.textColor}`}
                      />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">
                        {contact.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {contact.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      href={`tel:${contact.number}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <PhoneIcon className="h-5 w-5 mr-2" />
                      Call {contact.number}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-indigo-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">
            Important Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <MapPinIcon className="h-6 w-6 text-indigo-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-indigo-900">
                  Location Services
                </h3>
                <p className="mt-2 text-indigo-700">
                  Enable location services in your phone settings to help
                  emergency services locate you quickly.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <ClockIcon className="h-6 w-6 text-indigo-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-indigo-900">
                  Response Time
                </h3>
                <p className="mt-2 text-indigo-700">
                  Emergency services aim to respond within minutes. Stay on the
                  line and provide clear information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
