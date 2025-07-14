// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Signup = () => {
    // export default function PostDetail() 이거랑 똑같은건데, 협업시엔 걍 이렇게
    // const Signup = () => {}하고 마지막 줄에 export default Signup; 쓰는게 낫대.
    const navigate = useNavigate();
    const [form, setForm] = useState({
        // 초기값 설정
        username: '',
        email: '',
        password: '',
        nickname: '',
        university: '',
        location: '',
    }); // 이거 백이랑은 안맞춰도 됨. 그냥 리액트에서 state에 일시적으로 저장하는거지 백이랑 연결 x.
    // 근데 payload에선 백이랑 꼭 맞춰줘야 함.

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }; // ...form은 기존 폼 상태 복붙. [e.tartget.name]은 인풋의 name 속성, e.target.value는 바뀐 값. []의 키에 : 라는 값을 넣을거랑께.

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
