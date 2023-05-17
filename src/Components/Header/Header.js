import './Header.scss';

const Header = () => {
    return (
        <div className='Header'>
            <div className='Header__Title'>
                <h3>Blog</h3>
            </div>
            <div className='Header__Content'>
                <span className='Header__Content__Circle'>S</span>
                <div>
                    <p>Sao Mỹ</p>
                    <p className='Header__Content__ID'>SM000002</p>
                </div>
            </div>
        </div>
    )
}

export default Header;
