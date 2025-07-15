import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // 임시로 사용할 외부 API의 전체 URL을 직접 명시합니다.
                const tempApiUrl = 'https://thehotpotato.store/movies/';
                const res = await axios.get(tempApiUrl); // api 대신 axios를 직접 사용
                setMovies(res.data);
                console.log('임시 영화 목록 로딩 성공:', res.data); // 성공 시 데이터 확인용 로그 추가
            } catch (err) {
                console.error('영화 목록 로딩 실패 ▶', err);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div style={styles.container}>
            {movies.length === 0 ? (
                <p>영화를 불러오는 중이거나, 영화 데이터가 없습니다.</p>
            ) : (
                movies.map((movie) => (
                    <div key={movie.id} style={styles.card}>
                        <img src={movie.poster_url} alt={movie.title_kor} style={styles.image} />
                        <div style={styles.title}>{movie.title_kor}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MovieList;

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        padding: '3.5rem',
        maxWidth: '1000px',
        margin: '0 auto',
        boxSizing: 'border-box',
    },
    card: {
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        display: 'block',
    },
    title: {
        padding: '0.5rem',
        fontSize: '1rem',
        fontWeight: '500',
    },
};
