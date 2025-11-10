import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { FiDownload, FiExternalLink } from 'react-icons/fi';

const SubjectDetails = () => {
  const { id } = useParams();
  const { subjects, materials } = useData();
  const [subject, setSubject] = useState(null);
  const [activeTab, setActiveTab] = useState('notes');
  const [filteredMaterials, setFilteredMaterials] = useState({
    notes: [],
    ppts: [],
    videos: []
  });

  useEffect(() => {
    const foundSubject = subjects.find(s => s.id === parseInt(id));
    setSubject(foundSubject);
    
    if (foundSubject) {
      const subjectMaterials = materials.filter(m => m.subjectId === parseInt(id));
      
      setFilteredMaterials({
        notes: subjectMaterials.filter(m => m.type === 'notes'),
        ppts: subjectMaterials.filter(m => m.type === 'ppt'),
        videos: subjectMaterials.filter(m => m.type === 'video')
      });
    }
  }, [id, subjects, materials]);

  if (!subject) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-university-blue mb-4">Subject Not Found</h2>
          <p className="text-gray-600">The subject you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-university-blue mb-6">{subject.name}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex flex-wrap border-b">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'notes' 
                  ? 'text-university-blue border-b-2 border-university-blue' 
                  : 'text-gray-600 hover:text-university-blue'
              }`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'ppts' 
                  ? 'text-university-blue border-b-2 border-university-blue' 
                  : 'text-gray-600 hover:text-university-blue'
              }`}
              onClick={() => setActiveTab('ppts')}
            >
              PPTs
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'videos' 
                  ? 'text-university-blue border-b-2 border-university-blue' 
                  : 'text-gray-600 hover:text-university-blue'
              }`}
              onClick={() => setActiveTab('videos')}
            >
              Videos
            </button>
          </div>
        </div>
        
        <div className="min-h-[300px]">
          {activeTab === 'notes' && (
            <div>
              {filteredMaterials.notes.length > 0 ? (
                <div className="space-y-4">
                  {filteredMaterials.notes.map(material => (
                    <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h3 className="font-medium">{material.title}</h3>
                        <p className="text-sm text-gray-600">PDF Document</p>
                      </div>
                      <div className="flex space-x-2">
                        <a 
                          href={material.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-university-blue hover:underline"
                        >
                          <FiExternalLink className="mr-1" /> View
                        </a>
                        <a 
                          href={material.url} 
                          download
                          className="flex items-center text-university-blue hover:underline"
                        >
                          <FiDownload className="mr-1" /> Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No notes available for this subject.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'ppts' && (
            <div>
              {filteredMaterials.ppts.length > 0 ? (
                <div className="space-y-4">
                  {filteredMaterials.ppts.map(material => (
                    <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h3 className="font-medium">{material.title}</h3>
                        <p className="text-sm text-gray-600">PowerPoint Presentation</p>
                      </div>
                      <div className="flex space-x-2">
                        <a 
                          href={material.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-university-blue hover:underline"
                        >
                          <FiExternalLink className="mr-1" /> View
                        </a>
                        <a 
                          href={material.url} 
                          download
                          className="flex items-center text-university-blue hover:underline"
                        >
                          <FiDownload className="mr-1" /> Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No PPTs available for this subject.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'videos' && (
            <div>
              {filteredMaterials.videos.length > 0 ? (
                <div className="space-y-4">
                  {filteredMaterials.videos.map(material => (
                    <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h3 className="font-medium">{material.title}</h3>
                        <p className="text-sm text-gray-600">Video Resource</p>
                      </div>
                      <div className="flex space-x-2">
                        <a 
                          href={material.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-university-blue hover:underline"
                        >
                          <FiExternalLink className="mr-1" /> Watch
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No videos available for this subject.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectDetails;