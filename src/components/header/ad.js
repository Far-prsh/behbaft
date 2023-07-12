import styles from './styles.module.scss'
import Link from 'next/link';


function Ad() {
    return ( <>
    <Link href='/browse'>
        <div className={styles.ad}></div>
    </Link>
    </> );
}

export default Ad;