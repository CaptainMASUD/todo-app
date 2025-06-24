import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInError,
} from '../../Redux/UserSlice/userSlice';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signInStart());
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch(signInSuccess(data.user));
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      dispatch(signInError(err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
