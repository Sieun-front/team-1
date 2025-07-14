import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                username: form.username,
                password: form.password,
            };
            const res = await api.post('/dj/login/', payload);
            console.log('로그인 성공:', res.data);
            localStorage.setItem('token', res.data.access);

            navigate('/home');
        } catch (err) {
            const data = err.response?.data;
            console.error('로그인 실패 ▶', data);

            const msg =
                data?.username?.[0] || data?.password?.[0] || data?.non_field_errors?.[0] || '로그인에 실패했습니다.';
            alert(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-xl"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mb-6 px-4 py-2 border rounded-xl"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}
