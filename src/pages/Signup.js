// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        // 초기값 설정
        username: '',
        email: '',
        password: '',
        nickname: '',
        university: '',
        location: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                username: form.username,
                email: form.email,
                password1: form.password,
                password2: form.password,
                nickname: form.nickname,
                university: form.university,
                location: form.location,
            };
            const res = await api.post('/dj/registration/', payload);
            console.log('회원가입 성공:', res.data);
            navigate('/'); // 로그인 페이지로 이동
        } catch (err) {
            const status = err.response?.status;
            const data = err.response?.data;
            console.error(`회원가입 실패 [${status}] ▶`, data);

            let message = '회원가입에 실패했습니다.';
            if (data) {
                if (data.username) message = data.username[0];
                else if (data.email) message = data.email[0];
                else if (data.password1) message = data.password1[0];
                else if (data.nickname) message = data.nickname[0];
                else if (data.university) message = data.university[0];
                else if (data.location) message = data.location[0];
                else if (typeof data.detail === 'string') message = data.detail;
            }
            alert(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

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
                    type="text"
                    name="nickname"
                    placeholder="Nickname"
                    value={form.nickname}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-xl"
                    required
                />
                <input
                    type="text"
                    name="university"
                    placeholder="University"
                    value={form.university}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-xl"
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-xl"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
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
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
