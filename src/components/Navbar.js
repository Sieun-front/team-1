import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav
            style={{
                backgroundColor: '#f4f4f4',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ddd',
            }}
        >
            <h1 style={{ margin: 0 }}>Movie Night</h1>
            <div>
                <Link to="/" style={{ marginRight: '1rem', color: '#181617' }}>
                    Home
                </Link>
                <Link to="/login" style={{ marginRight: '1rem', color: '#181617' }}>
                    Log in
                </Link>
                <Link to="/signup" style={{ marginRight: '1rem', color: '#181617' }}>
                    Sign up
                </Link>
            </div>
        </nav>
    );
}
