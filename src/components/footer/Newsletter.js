import Link from 'next/link';
import styles from './styles.module.scss'

function Newsletter() {
    return ( 
        <div className={styles.footer__newsletter}>
<h3>SIGN UP FOR OUR NEWSLETTER</h3>
<div className={styles.footer__flex}>
    <input type='email' placeholder='YOUR EMAIL ADDRESS'/>
    <button className={styles.btn_primary}>SUBSCRIBE</button>
</div>
<p>By clicking SUBSCRIBE you are agreeing with <Link href='#'>our Privacy and Cookie Policy</Link></p>
        </div>
     );
}

export default Newsletter;