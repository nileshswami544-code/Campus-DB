// This file will be used for future API calls
// For now, we'll use mock data

export const api = {
  // User authentication
  login: async (email, password, userType) => {
    // Mock login logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  signup: async (userData) => {
    // Mock signup logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.some(u => u.email === userData.email)) {
          reject(new Error('User already exists'));
          return;
        }
        
        // Add new user
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        resolve(userData);
      }, 500);
    });
  },

  // Fetch subjects
  getSubjects: async () => {
    const response = await fetch('/data/subjects.json');
    return response.json();
  },

  // Fetch materials
  getMaterials: async () => {
    const response = await fetch('/data/materials.json');
    return response.json();
  }
};