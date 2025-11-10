// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiBookOpen, FiUsers, FiAward, FiTrendingUp, FiClock, FiStar,
  FiCheckCircle, FiPlay, FiDownload, FiCalendar, FiMessageSquare,
  FiBarChart2, FiTarget, FiZap, FiShield, FiGlobe, FiCpu, 
  FiChevronDown, FiArrowRight, FiCheck
} from 'react-icons/fi';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    courses: 0,
    materials: 0,
    faculties: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        students: Math.min(prev.students + 50, 5000),
        courses: Math.min(prev.courses + 1, 50),
        materials: Math.min(prev.materials + 10, 500),
        faculties: Math.min(prev.faculties + 1, 100)
      }));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content: "CampusLearn has transformed how I study. All my materials are organized and easily accessible.",
      rating: 5,
      image: "https://picsum.photos/seed/sarah/100/100.jpg"
    },
    {
      name: "Michael Chen",
      role: "MBA Student",
      content: "The personalized dashboard helps me focus on what's important for my semester.",
      rating: 5,
      image: "https://picsum.photos/seed/michael/100/100.jpg"
    },
    {
      name: "Emily Rodriguez",
      role: "Civil Engineering Student",
      content: "I love how I can access all my study materials from anywhere, even on my phone.",
      rating: 5,
      image: "https://picsum.photos/seed/emily/100/100.jpg"
    }
  ];

  const features = [
    {
      icon: <FiBookOpen className="text-3xl" />,
      title: "Rich Learning Materials",
      description: "Access comprehensive notes, presentations, videos, and interactive content"
    },
    {
      icon: <FiTarget className="text-3xl" />,
      title: "Personalized Learning",
      description: "Get content tailored to your course, department, and learning preferences"
    },
    {
      icon: <FiBarChart2 className="text-3xl" />,
      title: "Progress Tracking",
      description: "Monitor your learning progress with detailed analytics and insights"
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: "Collaborative Learning",
      description: "Connect with peers, join study groups, and participate in discussions"
    },
    {
      icon: <FiZap className="text-3xl" />,
      title: "Quick Access",
      description: "Instantly find what you need with our powerful search and filtering"
    },
    {
      icon: <FiShield className="text-3xl" />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security measures"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="text-center text-white">
            <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <FiZap className="mr-2" />
              <span className="text-sm font-medium">New: AI-Powered Learning Recommendations</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to CampusLearn
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Your comprehensive learning platform for accessing course materials, tracking progress, and connecting with peers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link 
                to="/login" 
                className="group bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                Student Login
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/signup" 
                className="group bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Sign Up Now
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="flex justify-center">
              <div className="animate-bounce">
                <FiChevronDown className="text-3xl" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse delay-150"></div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiUsers className="text-2xl text-blue-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{animatedStats.students.toLocaleString()}+</h3>
              <p className="text-gray-600">Active Students</p>
            </div>
            
            <div className="text-center group">
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FiBookOpen className="text-2xl text-green-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{animatedStats.courses}+</h3>
              <p className="text-gray-600">Courses</p>
            </div>
            
            <div className="text-center group">
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <FiDownload className="text-2xl text-purple-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{animatedStats.materials.toLocaleString()}+</h3>
              <p className="text-gray-600">Study Materials</p>
            </div>
            
            <div className="text-center group">
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <FiAward className="text-2xl text-orange-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{animatedStats.faculties}+</h3>
              <p className="text-gray-600">Expert Faculties</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose CampusLearn?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in your academic journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="flex justify-center mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied students who are already using CampusLearn.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex mb-2">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 italic mb-4">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <p className="font-semibold text-gray-800">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-indigo-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join CampusLearn today and take control of your academic journey.
          </p>
          <Link 
            to="/signup" 
            className="group inline-flex items-center bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Now
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;