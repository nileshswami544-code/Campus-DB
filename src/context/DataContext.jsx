// src/context/DataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Try to fetch subjects data
        let subjectsData = [];
        try {
          const subjectsResponse = await fetch('/data/subjects.json');
          if (subjectsResponse.ok) {
            subjectsData = await subjectsResponse.json();
          }
        } catch (err) {
          console.warn('Could not fetch subjects from JSON, using fallback data');
        }
        
        // If no data from JSON, use fallback data
        if (subjectsData.length === 0) {
          subjectsData = [
            {
              id: 1,
              name: "Data Structures",
              code: "CS301",
              course: "BTech",
              department: "CSE",
              year: "2nd",
              sem: "3",
              description: "Study of data structures and algorithms",
              credits: "4",
              faculty: "Dr. Smith"
            },
            {
              id: 2,
              name: "Database Systems",
              code: "CS302",
              course: "BTech",
              department: "CSE",
              year: "2nd",
              sem: "3",
              description: "Introduction to database management systems",
              credits: "4",
              faculty: "Dr. Johnson"
            },
            {
              id: 3,
              name: "Operating Systems",
              code: "CS303",
              course: "BTech",
              department: "CSE",
              year: "3rd",
              sem: "5",
              description: "Study of operating system concepts",
              credits: "4",
              faculty: "Dr. Williams"
            }
          ];
        }
        
        // Try to fetch materials data
        let materialsData = [];
        try {
          const materialsResponse = await fetch('/data/materials.json');
          if (materialsResponse.ok) {
            materialsData = await materialsResponse.json();
          }
        } catch (err) {
          console.warn('Could not fetch materials from JSON, using fallback data');
        }
        
        // If no data from JSON, use fallback data
        if (materialsData.length === 0) {
          materialsData = [
            {
              id: 1,
              subjectId: 1,
              type: "notes",
              title: "Introduction to Arrays",
              url: "https://example.com/arrays.pdf",
              uploadedBy: "Dr. Smith",
              uploadDate: "2023-10-15"
            },
            {
              id: 2,
              subjectId: 1,
              type: "video",
              title: "Linked Lists Tutorial",
              url: "https://example.com/linkedlists.mp4",
              uploadedBy: "Dr. Smith",
              uploadDate: "2023-10-16"
            },
            {
              id: 3,
              subjectId: 2,
              type: "ppt",
              title: "Database Normalization",
              url: "https://example.com/normalization.pptx",
              uploadedBy: "Dr. Johnson",
              uploadDate: "2023-10-10"
            }
          ];
        }
        
        setSubjects(subjectsData);
        setMaterials(materialsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addSubject = (newSubject) => {
    setSubjects([...subjects, { ...newSubject, id: subjects.length + 1 }]);
  };

  const updateSubject = (id, updatedSubject) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? { ...subject, ...updatedSubject } : subject
    ));
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
    // Also delete materials associated with this subject
    setMaterials(materials.filter(material => material.subjectId !== id));
  };

  const addMaterial = (newMaterial) => {
    setMaterials([...materials, { 
      ...newMaterial, 
      id: materials.length + 1,
      addedDate: new Date().toISOString()
    }]);
  };

  const updateMaterial = (id, updatedMaterial) => {
    setMaterials(materials.map(material => 
      material.id === id ? { ...material, ...updatedMaterial } : material
    ));
  };

  const deleteMaterial = (id) => {
    setMaterials(materials.filter(material => material.id !== id));
  };

  const getMaterialsBySubject = (subjectId) => {
    return materials.filter(material => material.subjectId === subjectId);
  };

  const getSubjectsByFilters = (filters) => {
    return subjects.filter(subject => {
      let matches = true;
      
      if (filters.course && subject.course !== filters.course) {
        matches = false;
      }
      
      if (filters.department && subject.department !== filters.department) {
        matches = false;
      }
      
      if (filters.year && subject.year !== filters.year) {
        matches = false;
      }
      
      if (filters.sem && subject.sem !== filters.sem) {
        matches = false;
      }
      
      return matches;
    });
  };

  const value = {
    subjects,
    materials,
    loading,
    error,
    addSubject,
    updateSubject,
    deleteSubject,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getMaterialsBySubject,
    getSubjectsByFilters
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};