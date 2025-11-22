import '../css/home.css';
import { Link } from 'react-router-dom';

function DownLinks() {
    return (
        <div className='down-nav'>
            <div className='down-nav-links'>
                <Link to="/">
                    <img src='/Images/Icones/market.svg' alt='Home' />
                </Link>
                <Link to="/pageCommandes">
                    <img src='/Images/Icones/location.svg' alt='Home' />
                </Link>
                <Link to="/pageLikes">
                    <img src='/Images/Icones/market.svg' alt='Home' />
                </Link>
                <Link to="/PageOffre">
                    <img src='/Images/Icones/profile.svg' alt='Home' />
                </Link>
            </div>
        </div>
    )
}
export default DownLinks;