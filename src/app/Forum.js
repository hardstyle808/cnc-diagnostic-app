import React, { useState } from 'react';

const Forum = ({ forumTopics, setForumTopics, setShowForum }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content, author };
    try {
      const response = await fetch('http://localhost:5000/api/forums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setForumTopics([data, ...forumTopics]);
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error('Failed to submit new post:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Community Forum</h2>
          <button onClick={() => setShowForum(false)} className="text-gray-500 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 mb-6">
          {forumTopics.map((topic) => (
            <div key={topic.id} className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-lg text-gray-800">{topic.title}</h3>
              <p className="text-gray-600">{topic.content}</p>
              <div className="text-xs text-gray-500 mt-2">by {topic.author}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Create a new post</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forum;
