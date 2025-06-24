import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus,
  X,
  ClipboardList,
  BookOpen,
  Trash,
  Calendar,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API = 'https://todo-app-api-theta.vercel.app/api';

export default function CourseTodoApp() {
  const [courses, setCourses] = useState([]);
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');

  const [selectedCourse, setSelectedCourse] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoDate, setTodoDate] = useState('');
  const [todoSection, setTodoSection] = useState('');
  const [todoType, setTodoType] = useState('Theory');
  const [todos, setTodos] = useState([]);

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showTodoForm, setShowTodoForm] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchTodos();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/courses`);
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`);
      setTodos(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([]);
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!courseCode.trim() || !courseName.trim()) {
      alert('Please enter both course code and name.');
      return;
    }
    try {
      await axios.post(`${API}/courses`, { courseCode: courseCode.trim(), courseName: courseName.trim() });
      setCourseCode('');
      setCourseName('');
      setShowCourseForm(false);
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course.');
    }
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse) {
      alert('Please select a course.');
      return;
    }
    if (!todoTitle.trim()) {
      alert('Please enter a todo title.');
      return;
    }
    if (!todoDate) {
      alert('Please select a due date.');
      return;
    }
    if (!todoSection) {
      alert('Please select a section.');
      return;
    }
    try {
      await axios.post(`${API}/todos`, {
        course: selectedCourse,
        title: todoTitle.trim(),
        description: todoDescription.trim(),
        dueDate: todoDate,
        section: todoSection,
        type: todoType,
      });
      setSelectedCourse('');
      setTodoTitle('');
      setTodoDescription('');
      setTodoDate('');
      setTodoSection('');
      setTodoType('Theory');
      setShowTodoForm(false);
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add todo.');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await axios.delete(`${API}/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course.');
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    try {
      await axios.delete(`${API}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1427] via-[#112b3c] to-[#0c1427] p-8 text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-center mb-12 text-teal-400 drop-shadow-lg flex items-center justify-center gap-3"
        >
          <BookOpen size={48} /> Course Todo Manager
        </motion.h1>

        {/* Buttons row */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-6">
          <button
            onClick={() => setShowCourseForm((v) => !v)}
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 transition-colors font-semibold shadow-lg text-gray-900"
          >
            {showCourseForm ? <X size={24} /> : <Plus size={24} />}
            {showCourseForm ? 'Close Course Form' : 'Add New Course'}
          </button>

          <button
            onClick={() => setShowTodoForm((v) => !v)}
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 transition-colors font-semibold shadow-lg text-gray-900"
          >
            {showTodoForm ? <X size={24} /> : <Plus size={24} />}
            {showTodoForm ? 'Close Todo Form' : 'Add New Todo'}
          </button>
        </div>

        {/* Forms - appear below buttons */}
        <div className="max-w-xl mx-auto space-y-12 mb-12">
          <AnimatePresence>
            {showCourseForm && (
              <motion.form
                onSubmit={handleCourseSubmit}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#112b3c] rounded-2xl p-8 shadow-lg border border-teal-500"
              >
                <h2 className="text-2xl font-bold mb-6 text-amber-400 flex items-center gap-3">
                  <ClipboardList size={28} />
                  Add New Course
                </h2>
                <input
                  type="text"
                  placeholder="Course Code (e.g. CSE101)"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  required
                  className="w-full mb-4 px-4 py-3 rounded-lg bg-[#0c1427] border border-teal-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="text"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                  className="w-full mb-6 px-4 py-3 rounded-lg bg-[#0c1427] border border-teal-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 transition-colors text-gray-900 font-semibold py-3 rounded-lg shadow-md flex justify-center items-center gap-3"
                >
                  <Plus size={20} /> Add Course
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showTodoForm && (
              <motion.form
                onSubmit={handleTodoSubmit}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#112b3c] rounded-2xl p-8 shadow-lg border border-amber-500"
              >
                <h2 className="text-2xl font-bold mb-6 text-teal-400 flex items-center gap-3">
                  <FileText size={28} />
                  Add New Todo
                </h2>

                <select
                  className="w-full mb-4 px-4 py-3 rounded-lg bg-[#0c1427] border border-amber-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map(({ _id, courseCode, courseName }) => (
                    <option key={_id} value={_id}>
                      {courseCode} - {courseName}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Todo Title"
                  value={todoTitle}
                  onChange={(e) => setTodoTitle(e.target.value)}
                  required
                  className="w-full mb-4 px-4 py-3 rounded-lg bg-[#0c1427] border border-amber-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />

                <textarea
                  placeholder="Description (optional)"
                  value={todoDescription}
                  onChange={(e) => setTodoDescription(e.target.value)}
                  rows={3}
                  className="w-full mb-4 px-4 py-3 rounded-lg bg-[#0c1427] border border-amber-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                />

                <select
                  className="w-full mb-4 px-4 py-3 rounded-lg bg-[#0c1427] border border-amber-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  value={todoSection}
                  onChange={(e) => setTodoSection(e.target.value)}
                  required
                >
                  <option value="">Select Section</option>
                  <option value="62_C">62_C</option>
                  <option value="62_C1">62_C1</option>
                  <option value="62_C2">62_C2</option>
                </select>

                <select
                  className="w-full mb-6 px-4 py-3 rounded-lg bg-[#0c1427] border border-amber-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  value={todoType}
                  onChange={(e) => setTodoType(e.target.value)}
                  required
                >
                  <option value="Theory">Theory</option>
                  <option value="Lab">Lab</option>
                </select>

                <input
                  type="date"
                  value={todoDate}
                  onChange={(e) => setTodoDate(e.target.value)}
                  required
                  className="w-full mb-6 px-4 py-3 rounded-lg bg-[#0c1427] border border-amber-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />

                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 transition-colors text-gray-900 font-semibold py-3 rounded-lg shadow-md flex justify-center items-center gap-3"
                >
                  <Calendar size={20} /> Add Todo
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Courses List */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-400 mb-6 border-b border-amber-600 pb-2 max-w-max flex items-center gap-3">
            <BookOpen size={28} /> All Courses
          </h2>
          {courses.length === 0 ? (
            <p className="text-gray-400 italic">No courses available. Add some!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map(({ _id, courseCode, courseName }) => (
                <motion.div
                  key={_id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#112b3c] rounded-xl p-5 shadow-lg flex justify-between items-center border border-teal-500"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-teal-300">{courseCode}</h3>
                    <p className="text-gray-300">{courseName}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCourse(_id)}
                    className="text-amber-400 hover:text-amber-600 transition-colors"
                    aria-label="Delete course"
                  >
                    <Trash size={22} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Todos List */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-amber-400 border-b border-amber-600 pb-2 max-w-max flex items-center gap-3">
            <ClipboardList size={28} /> All Todos
          </h2>
          {todos.length === 0 ? (
            <p className="text-gray-400 italic">No todos available. Add some!</p>
          ) : (
            <div className="space-y-5 max-w-4xl mx-auto">
              {todos.map(({ _id, title, description, dueDate, course, section, type }) => (
                <motion.div
                  key={_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#112b3c] rounded-xl p-6 shadow-lg border border-teal-400 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-teal-300">
                      {title}{' '}
                      <span className="text-amber-400 text-sm font-medium">
                        ({course?.courseCode || 'Unknown'})
                      </span>
                    </h3>
                    {description && <p className="text-gray-300 mt-1">{description}</p>}
                    <p className="text-gray-400 mt-2">
                      <span className="font-semibold">Section:</span> {section} |{' '}
                      <span className="font-semibold">Type:</span> {type}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Due: {new Date(dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteTodo(_id)}
                    className="text-amber-400 hover:text-amber-600 transition-colors"
                    aria-label="Delete todo"
                  >
                    <Trash size={22} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
