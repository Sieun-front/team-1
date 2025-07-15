import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;
    const totalPages = Math.ceil(movies.length / itemsPerPage);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const tempApiUrl = 'https://thehotpotato.store/movies/';
                const res = await axios.get(tempApiUrl);
                setMovies(res.data);
            } catch (err) {
                console.error('영화 목록 로딩 실패 ▶', err);
            }
        };
        fetchMovies();
    }, []);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentMovies = movies.slice(indexOfFirst, indexOfLast);

    const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
    const handlePageClick = (num) => setCurrentPage(num);

    // 10단위 페이지 그룹 계산
    const pageGroup = Math.floor((currentPage - 1) / 10);
    const startPage = pageGroup * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);

    // 렌더할 페이지 번호 배열
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div style={styles.container}>
                {currentMovies.length === 0 ? (
                    <p>영화를 불러오는 중이거나, 영화 데이터가 없습니다.</p>
                ) : (
                    currentMovies.map((movie) => (
                        <div key={movie.id} style={styles.card}>
                            <img src={movie.poster_url} alt={movie.title_kor} style={styles.image} />
                            <div style={styles.title}>{movie.title_kor}</div>
                        </div>
                    ))
                )}
            </div>

            <div style={styles.pagination}>
                <button onClick={handlePrev} disabled={currentPage === 1}>
                    이전
                </button>

                {/* 이전 10단위로 점프 */}
                {startPage > 1 && <button onClick={() => handlePageClick(startPage - 1)}>...</button>}

                {pageNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => handlePageClick(num)}
                        style={{
                            fontWeight: currentPage === num ? 'bold' : 'normal',
                        }}
                    >
                        {num}
                    </button>
                ))}

                {/* 다음 10단위로 점프 */}
                {endPage < totalPages && <button onClick={() => handlePageClick(endPage + 1)}>...</button>}

                <button onClick={handleNext} disabled={currentPage === totalPages}>
                    다음
                </button>
            </div>
        </>
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
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '2rem',
    },
};
