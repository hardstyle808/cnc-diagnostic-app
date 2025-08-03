'use client'

import React, { useState, useEffect } from 'react';
import Forum from './Forum.js';

const CNCDiagnosticApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedError, setSelectedError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showForum, setShowForum] = useState(false);
  const [errorCodes, setErrorCodes] = useState([]);
  const [forumTopics, setForumTopics] = useState([]);
  const [machineSpecs, setMachineSpecs] = useState({});


  useEffect(() => {
    fetch('http://localhost:5000/api/errors')
      .then(res => res.json())
      .then(data => setErrorCodes(data))
      .catch(err => console.error("Failed to fetch error codes:", err));

    fetch('http://localhost:5000/api/forums')
      .then(res => res.json())
      .then(data => setForumTopics(data))
      .catch(err => console.error("Failed to fetch forum topics:", err));

    // You would also fetch machine specs from your backend
    // For now, let's keep it as a static object or fetch from a dedicated endpoint
    setMachineSpecs({
        model: 'ROVER A SMART 1632',
        manufacturer: 'BIESSE',
        serialNumber: '1000064667',
        weight: '400 kg',
        power: '19.2 kW',
        voltage: '400 VAC',
        current: '33 A',
        frequency: '50 Hz',
        powerPhases: '3'
    });
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setSearchQuery('E001');
      setActiveTab('search');
    }, 2000);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      case 'Expert': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const errorCodesArray = Object.values(errorCodes);
  const filteredErrors = errorCodesArray.filter(error => 
    error.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    error.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    error.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // SVG Icons (keeping the same as before)
  const HomeIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  const SearchIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const CameraIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const WrenchIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const BookIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );

  const SettingsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const UsersIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const ChevronRight = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
    </svg>
  );

  const CheckCircle = () => (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const AlertTriangle = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  );

  const renderHome = () => (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center">
          <WrenchIcon />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">CNC Diagnostics</h1>
        <p className="text-gray-600">BIESSE ROVER A SMART 1632</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleScan}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
        >
          <CameraIcon />
          <span className="text-lg font-semibold block mt-2">Scan Error</span>
        </button>
        
        <button
          onClick={() => setActiveTab('search')}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
        >
          <SearchIcon />
          <span className="text-lg font-semibold block mt-2">Manual Search</span>
        </button>
      </div>

      {/* Recent Errors */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Issues</h3>
        <div className="space-y-3">
          {errorCodesArray.slice(0, 3).map((error) => (
            <button
              key={error.code}
              onClick={() => {
                setSelectedError(error);
                setActiveTab('guide');
              }}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  error.severity === 'high' ? 'bg-red-500' : 
                  error.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-800">{error.code}</span>
                    <span className="text-xs text-gray-500">({error.category})</span>
                  </div>
                  <p className="text-sm text-gray-600">{error.title}</p>
                </div>
              </div>
              <ChevronRight />
            </button>
          ))}
        </div>
      </div>

      {/* Machine Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <CheckCircle />
          <span className="text-lg font-semibold text-gray-800">Machine Status: Operational</span>
        </div>
        <p className="text-sm text-gray-600">Last maintenance: 3 days ago</p>
        <p className="text-xs text-gray-500 mt-1">Total errors resolved: 47</p>
      </div>

      {/* Forum Preview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Community Forum</h3>
          <button 
            onClick={() => setShowForum(true)}
            className="text-blue-600 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {forumTopics.slice(0, 2).map((topic) => (
            <div key={topic.id} className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">{topic.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{topic.preview}</p>
                  <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                    <span>by {topic.author}</span>
                    <span>•</span>
                    <span>{topic.replies} replies</span>
                    <span>•</span>
                    <span>{topic.lastReply}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  topic.status === 'solved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {topic.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="p-6 space-y-6">
      {/* Search Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Code Lookup</h2>
        <p className="text-gray-600">Enter error code or describe the issue</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Enter error code (e.g., E001) or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Camera Scan Button */}
      <button
        onClick={handleScan}
        disabled={isScanning}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg font-semibold text-lg transform transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
      >
        {isScanning ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Scanning Display...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <CameraIcon />
            <span>Scan Error Display</span>
          </div>
        )}
      </button>

      {/* Error Results */}
      <div className="space-y-3">
        {filteredErrors.map((error) => (
          <button
            key={error.code}
            onClick={() => {
              setSelectedError(error);
              setActiveTab('guide');
            }}
            className="w-full bg-white rounded-2xl shadow-lg p-4 text-left transform transition-all hover:scale-102 active:scale-98"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-bold text-lg text-gray-800">{error.code}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(error.severity)}`}>
                    {error.severity.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(error.difficulty)}`}>
                    {error.difficulty}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{error.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{error.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>⏱ {error.estimatedTime}</span>
                  <span>📁 {error.category}</span>
                  <span>🔧 {error.steps?.length || 0} steps</span>
                </div>
              </div>
              <AlertTriangle className={`w-6 h-6 ml-3 ${
                error.severity === 'high' ? 'text-red-500' : 
                error.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
              }`} />
            </div>
          </button>
        ))}
      </div>

      {filteredErrors.length === 0 && searchQuery && (
        <div className="text-center py-8">
          <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Results Found</h3>
          <p className="text-gray-500">Try searching for a different error code or category</p>
        </div>
      )}
    </div>
  );

  const renderTroubleshooting = () => {
    if (!selectedError) {
      return (
        <div className="p-6 text-center">
          <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600">Select an Error Code</h3>
          <p className="text-gray-500">Choose an error from the search tab to see troubleshooting steps</p>
        </div>
      );
    }

    const steps = selectedError.steps || [];

    return (
      <div className="p-6 space-y-6">
        {/* Error Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-4 h-4 rounded-full ${
              selectedError.severity === 'high' ? 'bg-red-500' : 
              selectedError.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`}></div>
            <span className="font-bold text-xl text-gray-800">{selectedError.code}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedError.difficulty)}`}>
              {selectedError.difficulty}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedError.title}</h2>
          <p className="text-gray-600 mb-4">{selectedError.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>⏱ Time: {selectedError.estimatedTime}</div>
            <div>🔧 Steps: {steps.length}</div>
            <div>📁 Category: {selectedError.category}</div>
            <div>🛠 Difficulty: {selectedError.difficulty}</div>
          </div>
        </div>

        {/* Symptoms & Causes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <h4 className="font-semibold text-red-800 mb-3">⚠️ Symptoms</h4>
            <ul className="space-y-1 text-sm text-red-700">
              {selectedError.symptoms?.map((symptom, index) => (
                <li key={index}>• {symptom}</li>
              ))}
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <h4 className="font-semibold text-yellow-800 mb-3">🔍 Common Causes</h4>
            <ul className="space-y-1 text-sm text-yellow-700">
              {selectedError.causes?.map((cause, index) => (
                <li key={index}>• {cause}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Community Help */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-3">Need More Help?</h4>
          <div className="space-y-3">
            <button 
               onClick={() => setShowForum(true)}
              className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-xl text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <UsersIcon />
              <span>Ask the Community</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-green-50 rounded-xl text-green-700 hover:bg-green-100 transition-colors">
              <PlayIcon />
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSpecs = () => (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Machine Specifications</h2>
        <p className="text-gray-600">BIESSE ROVER A SMART 1632</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(machineSpecs).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
              <span className="font-medium text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </span>
              <span className="font-semibold text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="pb-20">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'search' && renderSearch()}
        {activeTab === 'guide' && renderTroubleshooting()}
        {activeTab === 'specs' && renderSpecs()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'
            }`}
          >
            <HomeIcon />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'search' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'
            }`}
          >
            <SearchIcon />
            <span className="text-xs font-medium">Search</span>
          </button>
          
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'guide' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'
            }`}
          >
            <BookIcon />
            <span className="text-xs font-medium">Guide</span>
          </button>
          
          <button
            onClick={() => setActiveTab('specs')}
            className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'specs' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'
            }`}
          >
            <SettingsIcon />
            <span className="text-xs font-medium">Specs</span>
          </button>
        </div>
      </div>

      {/* Scanning Overlay */}
      {isScanning && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Scanning Error Display</h3>
            <p className="text-gray-600">Point camera at machine display...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CNCDiagnosticApp;