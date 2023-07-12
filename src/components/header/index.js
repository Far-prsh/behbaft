import Main from './Main';
import Top from './Top';
import Ad from './ad';
import styles from './styles.module.scss'

function Header({ country }) {
    return (<>
        <header className={styles.header}>
            <Ad />
            <Top country={country}/>
            <Main/>
        </header>
    </>);
}

export default Header;