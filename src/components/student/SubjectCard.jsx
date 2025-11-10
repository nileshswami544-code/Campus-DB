import React from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiArrowRight } from 'react-icons/fi';

const SubjectCard = ({ subject }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-university-blue text-white p-4">
        <h3 className="text-lg font-semibold">{subject.name}</h3>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600">Course: {subject.course}</p>
          <p className="text-sm text-gray-600">Department: {subject.department}</p>
          <p className="text-sm text-gray-600">Year: {subject.year}</p>
          <p className="text-sm text-gray-600">Semester: {subject.sem}</p>
        </div>
        <Link 
          to={`/student/subject/${subject.id}`}
          className="flex items-center justify-center bg-university-blue text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          <span className="mr-2">View Materials</span>
          <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default SubjectCard;