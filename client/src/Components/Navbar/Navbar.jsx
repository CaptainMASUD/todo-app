import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Events' },
    { path: '/about', label: 'About Us' },
  ];

  const linkClasses = ({ isActive }) =>
    `font-medium text-sm transition px-2 py-1 rounded-md ${
      isActive ? 'bg-teal-600 text-white' : 'text-teal-300 hover:text-indigo-300'
    }`;

  return (
    <nav className="bg-slate-900 text-teal-300 shadow-sm sticky top-0 z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-teal-400">SkyFall</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ path, label }) => (
            <NavLink key={path} to={path} className={linkClasses}>
              {label}
            </NavLink>
          ))}
          <a
            href="https://discord.gg/bFKWFbXgPZ"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-teal-600 hover:to-indigo-600 transition"
          >
            Join Discord
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-teal-300">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="md:hidden bg-slate-900 border-t border-slate-700 overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-4">
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={linkClasses}
                >
                  {label}
                </NavLink>
              ))}
              <a
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white text-center px-4 py-2 rounded-lg text-sm font-semibold hover:from-teal-600 hover:to-indigo-600 transition"
              >
                Join Discord
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
