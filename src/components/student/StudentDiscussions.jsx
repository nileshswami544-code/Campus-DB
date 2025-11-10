import React, { useState } from 'react';
import { FiMessageSquare, FiPlus, FiSearch, FiFilter, FiThumbsUp, FiMessageCircle, FiClock } from 'react-icons/fi';

const StudentDiscussions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  // Mock discussion data
  const discussions = [
    {
      id: 1,
      title: "Help with Data Structures Assignment",
      content: "I'm stuck on the tree traversal problem. Can someone explain the approach?",
      author: "John Doe",
      category: "assignments",
      replies: 5,
      likes: 12,
      createdAt: "2 hours ago",
      isPinned: true
    },
    {
      id: 2,
      title: "Study group for Operating Systems",
      content: "Anyone interested in forming a study group for the upcoming exam?",
      author: "Jane Smith",
      category: "study-groups",
      replies: 8,
      likes: 20,
      createdAt: "5 hours ago",
      isPinned: false
    },
    {
      id: 3,
      title: "Best resources for Machine Learning?",
      content: "Looking for additional resources to understand ML concepts better.",
      author: "Mike Johnson",
      category: "resources",
      replies: 15,
      likes: 30,
      createdAt: "1 day ago",
      isPinned: false
    }
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || discussion.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewPost = (e) => {
    e.preventDefault();
    // In a real app, this would save the post to the backend
    console.log('New post:', newPost);
    setShowNewPost(false);
    setNewPost({ title: '', content: '', category: 'general' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Discussion Forum</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with peers, ask questions, and share knowledge
        </p>
      </div>

      {/* Search and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
          >
            <option value="">All Categories</option>
            <option value="general">General</option>
            <option value="assignments">Assignments</option>
            <option value="study-groups">Study Groups</option>
            <option value="resources">Resources</option>
            <option value="exams">Exams</option>
          </select>
          
          <button
            onClick={() => setShowNewPost(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <FiPlus className="mr-2" />
            New Post
          </button>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Create New Post</h2>
              
              <form onSubmit={handleNewPost}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                    placeholder="Enter post title..."
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                  >
                    <option value="general">General</option>
                    <option value="assignments">Assignments</option>
                    <option value="study-groups">Study Groups</option>
                    <option value="resources">Resources</option>
                    <option value="exams">Exams</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                    placeholder="Write your post content..."
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowNewPost(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.length > 0 ? (
          filteredDiscussions.map(discussion => (
            <div key={discussion.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {discussion.isPinned && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs rounded-full mr-2">
                        Pinned
                      </span>
                    )}
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs rounded-full mr-2">
                      {discussion.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">
                    {discussion.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {discussion.content}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="mr-4">By {discussion.author}</span>
                    <span className="flex items-center mr-4">
                      <FiClock className="mr-1" />
                      {discussion.createdAt}
                    </span>
                    <span className="flex items-center mr-4">
                      <FiThumbsUp className="mr-1" />
                      {discussion.likes}
                    </span>
                    <span className="flex items-center">
                      <FiMessageCircle className="mr-1" />
                      {discussion.replies} replies
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <FiMessageSquare className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No discussions found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Be the first to start a discussion!
            </p>
            <button
              onClick={() => setShowNewPost(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Start a Discussion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDiscussions;