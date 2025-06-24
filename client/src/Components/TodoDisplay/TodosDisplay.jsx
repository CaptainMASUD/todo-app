import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LayoutList,
  Grid3x3,
  Search,
  ListFilter,
  BookOpen,
  CalendarCheck,
  Layers,
  Tag,
} from 'lucide-react';
import { motion } from 'framer-motion';

const API = 'http://localhost:4000/api';

export default function TodoDisplay() {
  const [todos, setTodos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchTodos();
    fetchCourses();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const filteredTodos = todos.filter(todo => {
    return (
      (!search || todo.title.toLowerCase().includes(search.toLowerCase())) &&
      (!filterCourse || todo.course?._id === filterCourse) &&
      (!filterType || todo.type === filterType) &&
      (!filterSection || todo.section.toLowerCase().includes(filterSection.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-teal-400 mb-8 text-center"
        >
          Upcoming Tasks
        </motion.h1>

        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search todos..."
              className="w-full p-3 pl-10 rounded-xl bg-slate-800 border border-slate-600 text-white focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          </div>

          <div className="flex gap-3">
            <button
              className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-teal-600' : 'bg-slate-700'} transition`}
              onClick={() => setViewMode('list')}
              aria-label="List View"
            >
              <LayoutList />
            </button>
            <button
              className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-teal-600' : 'bg-slate-700'} transition`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
            >
              <Grid3x3 />
            </button>
            <button
              className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Toggle Filters"
            >
              <ListFilter />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <select
              className="p-3 rounded-lg bg-slate-800 border border-slate-600 text-white"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>

            <select
              className="p-3 rounded-lg bg-slate-800 border border-slate-600 text-white"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Theory">Theory</option>
              <option value="Lab">Lab</option>
            </select>

            <input
              type="text"
              placeholder="Section (e.g., 62_C1)"
              className="p-3 rounded-lg bg-slate-800 border border-slate-600 text-white"
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
            />
          </div>
        )}

        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'flex flex-col gap-3'}>
          {filteredTodos.map(todo => (
            <motion.div
              key={todo._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-slate-800 rounded-xl shadow-md hover:shadow-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-teal-500"
            >
              <div className="flex flex-col space-y-1 flex-grow min-w-0">
                <h3 className="text-xl font-semibold text-teal-300 truncate">{todo.title}</h3>
                {todo.description && (
                  <p className="text-slate-400 text-sm line-clamp-2">{todo.description}</p>
                )}
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} />
                    {todo.course?.courseCode} - {todo.course?.courseName}
                  </span>
                  <span
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${
                      todo.type === 'Lab' ? 'bg-teal-600 text-slate-900' : 'bg-indigo-600 text-white'
                    }`}
                  >
                    <Layers size={14} />
                    {todo.type}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-700 text-slate-300">
                    <Tag size={14} />
                    {todo.section}
                  </span>
                </div>
              </div>

              {/* Due date on right side */}
              <div className="mt-4 md:mt-0 md:ml-6 text-teal-400 font-semibold text-right min-w-[120px]">
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
