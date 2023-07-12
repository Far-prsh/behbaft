import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import styles from './styles.module.scss'

function Socials() {
    return ( 
        <div className={styles.footer__socials}>
            <section>
                <h3>STAY CONNECTED</h3>
                <ul>
                    <li>
                        <a href='#' target='_blank' rel='noopener noreferrer'>
                            <FaFacebookF/>
                        </a>
                    </li>
                    <li>
                        <a href='#' target='_blank' rel='noopener noreferrer'>
                            <FaInstagram/>
                        </a>
                    </li>
                    <li>
                        <a href='#' target='_blank' rel='noopener noreferrer'>
                            <FaWhatsapp/>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
     );
}

export default Socials;