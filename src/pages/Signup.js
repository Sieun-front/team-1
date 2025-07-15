// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
        nickname: '',
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post('/dj/registration/', {
                username: form.username,

                password1: form.password,
                password2: form.password,
                nickname: form.nickname,
            });

            // 성공 시 토큰 저장
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            // axios 기본 헤더에도 세팅
            api.setAuthHeader(data.access);

            // 가입 완료 후 로그인 페이지로 이동
            navigate('/login');
        } catch (err) {
            const status = err.response?.status ?? 500;
            const errors = err.response?.data ?? {};
            console.error(`회원가입 실패 [${status}] ▶`, errors);

            let message = '회원가입에 실패했습니다.';
            if (errors.username) message = errors.username[0];
            else if (errors.password) message = errors.password[0];
            else if (errors.nickname) message = errors.nickname[0];
            else if (typeof errors.detail === 'string') message = errors.detail;

            alert(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-xl"
                    required
                />

                <input
                    name="nickname"
                    type="text"
                    placeholder="Nickname"
                    value={form.nickname}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-xl"
                    required
                />

                <input
                    name="password"
                    type="password"
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
}
