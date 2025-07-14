import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';

function App() {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null); // 상세 정보 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [loadingDetail, setLoadingDetail] = useState(false); // 상세 로딩 상태
    const [detailError, setDetailError] = useState(null); // 상세 에러 상태
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [isSignup, setIsSignup] = useState(false); // 회원가입 상태

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    useEffect(() => {
        if (isLoggedIn) {
            console.log('Fetching movie list from API...');
            fetch('http://43.200.28.219:1313/movies/list/')
                .then((response) => {
                    console.log('API response:', response);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Fetched movie data:', data);
                    setMovies(data);
                })
                .catch((error) => {
                    console.error('Failed to fetch movies:', error);
                    alert('Failed to fetch movies. Please check the API server.');
                });
        }
    }, [isLoggedIn]);

    const filteredMovies = movies.filter(
        (movie) => movie.title_kor.includes(searchQuery) || movie.title_eng.includes(searchQuery)
    );

    // 영화 카드 클릭 시 상세 정보 불러오기
    const handleMovieClick = (id) => {
        setLoadingDetail(true);
        setDetailError(null);
        fetch(`http://43.200.28.219:1313/movies/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setSelectedMovie(data);
                setIsModalOpen(true);
            })
            .catch((error) => {
                setDetailError('상세 정보를 불러오지 못했습니다.');
            })
            .finally(() => {
                setLoadingDetail(false);
            });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
        setDetailError(null);
    };

    return (
        <div className="App">
            <header>
                <nav
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        background: '#333',
                        color: '#fff',
                        alignItems: 'center',
                    }}
                >
                    <h1>Movie List</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'red',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    cursor: 'pointer',
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleLogin}
                                    style={{
                                        background: 'green',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '0.5rem 1rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setIsSignup(!isSignup)}
                                    style={{
                                        background: 'blue',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '0.5rem 1rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {isSignup ? 'Switch to Login' : 'Signup'}
                                </button>
                            </>
                        )}
                    </div>
                </nav>
                {isLoggedIn && (
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ marginTop: '1rem', padding: '0.5rem', width: '100%' }}
                    />
                )}
            </header>
            <main>
                {isLoggedIn ? (
                    <div className="movie-grid">
                        {filteredMovies.map((movie) => (
                            <div
                                key={movie.id}
                                className="movie-card"
                                onClick={() => handleMovieClick(movie.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={movie.poster_url} alt={movie.title_kor} />
                                <h2>{movie.title_kor}</h2>
                                <p>{movie.title_eng}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </main>
            {/* 모달 구현 */}
            {isModalOpen && (
                <div
                    className="modal-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                >
                    <div
                        className="modal-content"
                        style={{
                            background: '#fff',
                            padding: '2rem',
                            borderRadius: '8px',
                            minWidth: '300px',
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            position: 'relative',
                        }}
                    >
                        <button
                            onClick={closeModal}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.2rem' }}
                        >
                            닫기
                        </button>
                        {loadingDetail ? (
                            <p>로딩 중...</p>
                        ) : detailError ? (
                            <p style={{ color: 'red' }}>{detailError}</p>
                        ) : selectedMovie ? (
                            <div>
                                <img
                                    src={selectedMovie.poster_url}
                                    alt={selectedMovie.title_kor}
                                    style={{ width: '200px', marginBottom: '1rem' }}
                                />
                                <h2>{selectedMovie.title_kor}</h2>
                                <p>{selectedMovie.title_eng}</p>
                                <p>감독: {selectedMovie.director}</p>
                                <p>개봉일: {selectedMovie.release_date}</p>
                                <p>줄거리: {selectedMovie.synopsis}</p>
                                {/* 필요한 상세 정보 추가 */}
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
