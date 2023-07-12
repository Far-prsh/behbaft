import styles from './styles.module.scss'

function Payment() {
    return ( 
        <div className={styles.footer__payment}>
<h3>
    WE ACCEPT
</h3>
<div className={styles.footer__flexwrap}>
    <img src="../../../images/mastercard.webp" alt='master-card'/>
    <img src="../../../images/paypal.webp" alt='master-card'/>
    <img src="../../../images/visa.webp" alt='master-card'/>
</div>
        </div>
     );
}

export default Payment;