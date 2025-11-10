import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const MaterialManagement = () => {
  const { subjects, materials, addMaterial, updateMaterial, deleteMaterial } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [formData, setFormData] = useState({
    subjectId: '',
    type: 'notes',
    title: '',
    url: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingMaterial) {
      updateMaterial(editingMaterial.id, formData);
    } else {
      addMaterial(formData);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      subjectId: '',
      type: 'notes',
      title: '',
      url: ''
    });
    setIsFormOpen(false);
    setEditingMaterial(null);
  };

  const handleEdit = (material) => {
    setFormData({
      subjectId: material.subjectId,
      type: material.type,
      title: material.title,
      url: material.url
    });
    setEditingMaterial(material);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      deleteMaterial(id);
    }
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown';
  };

  // src/components/admin/MaterialManagement.jsx
// Add this at the beginning of the return statement in MaterialManagement.jsx

// If no materials, show empty state
if (materials.length === 0 && !loading) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Material Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Upload and manage study materials</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <FiFileText className="text-4xl text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No materials found</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Get started by uploading your first material.
        </p>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Upload Your First Material
        </button>
      </div>
    </div>
  );
}
  return (

    //rkd
    <div className="ml-64 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-university-blue">Material Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center bg-university-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FiPlus className="mr-2" /> Add Material
        </button>
      </div>
      
      {isFormOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingMaterial ? 'Edit Material' : 'Add New Material'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectId">
                  Subject
                </label>
                <select
                  id="subjectId"
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Select a subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              //rkd
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                  Material Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="notes">Notes</option>
                  <option value="ppt">PPT</option>
                  <option value="video">Video</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                  URL
                </label>
                <input
                  id="url"
                  name="url"
                  type="text"
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="https://example.com/material.pdf"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-university-blue text-white rounded-lg hover:bg-blue-700 transition"
              >
                {editingMaterial ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map(material => (
                <tr key={material.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {material.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSubjectName(material.subjectId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      material.type === 'notes' ? 'bg-green-100 text-green-800' :
                      material.type === 'ppt' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {material.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                    <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-university-blue hover:underline">
                      {material.url}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(material)}
                      className="text-university-blue hover:text-blue-700 mr-3"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(material.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaterialManagement;