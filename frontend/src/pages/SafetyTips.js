import React from "react";
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const SafetyTips = () => {
  const tips = [
    {
      title: "Emergency Preparedness",
      icon: ShieldCheckIcon,
      items: [
        "Always keep emergency numbers saved in your phone",
        "Know the location of the nearest police station",
        "Keep a first aid kit in your vehicle",
        "Have an emergency contact plan with family members",
      ],
    },
    {
      title: "Personal Safety",
      icon: ExclamationTriangleIcon,
      items: [
        "Be aware of your surroundings at all times",
        "Avoid walking alone in isolated areas",
        "Keep your valuables secure and out of sight",
        "Trust your instincts - if something feels wrong, it probably is",
      ],
    },
    {
      title: "Emergency Response",
      icon: PhoneIcon,
      items: [
        "Call emergency services immediately in case of danger",
        "Use the SOS button in this app for quick assistance",
        "Provide clear location details when reporting incidents",
        "Follow instructions from emergency responders",
      ],
    },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Safety Tips and Guidelines
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Stay informed and prepared with these essential safety guidelines
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tips.map((category) => (
              <div
                key={category.title}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                      <category.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="ml-5 text-lg font-medium text-gray-900">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {category.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;
