import React from "react";

interface ServiceCardProps {
  icon: React.ReactNode,
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
      <div className="flex justify-center items-center mx-auto mb-4 h-12 w-12 bg-gray-100 rounded-full ">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
