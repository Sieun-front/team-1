const movies = [
    { id: 1, title: '외계+인 1부', image: 'https://image.tmdb.org/t/p/original/ynyN9hdxL5vq7GnSX8Fdz3TfoTE.jpg' },
    { id: 2, title: '탄생/재탄생', image: 'https://image.tmdb.org/t/p/original/zlEhsNfOKhbnfs5NTJ6zOZtoLBb.jpg' },
    {
        id: 3,
        title: '그대들은 어떻게 살 것인가',
        image: 'https://image.tmdb.org/t/p/original/kmoScy628A6JWv8mmd2ofrYv16T.jpg',
    },
    { id: 4, title: '스페이스 커뎃', image: 'https://image.tmdb.org/t/p/original/7rda0SRuIGA8BDC8FTYHAOyXaRj.jpg' },
    { id: 5, title: '존 윅 4', image: 'https://image.tmdb.org/t/p/original/h3LsdSBzhRnBebz4BTpAhh63PD3.jpg' },
    { id: 6, title: '나쁜 녀석들', image: 'https://image.tmdb.org/t/p/original/kNwqxVmtylfpnrcIjJuEuVwIHQC.jpg' },
    {
        id: 7,
        title: '고스트버스터즈: 오싹한 뉴욕',
        image: 'https://image.tmdb.org/t/p/original/mGzSIfzmcf9H91DS06cnka1SYrP.jpg"',
    },
    { id: 8, title: '비버리 힐스 캅', image: 'https://image.tmdb.org/t/p/original/eBJEvKkhQ0tUt1dBAcTEYW6kCle.jpg' },
];

export default function MovieList() {
    return (
        <div style={styles.container}>
            {movies.map((movie) => (
                <div key={movie.id} style={styles.card}>
                    <img src={movie.image} alt={movie.title} style={styles.image} />
                    <div style={styles.title}>{movie.title}</div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        padding: '2rem',
        width: '100%',
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
