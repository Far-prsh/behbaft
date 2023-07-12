import Link from "next/link";
import styles from "./styles.module.scss";
import { signIn, signOut } from "next-auth/react";

function UserMenu({ session }) {
    return (
        <div className={styles.menu}>
            <h4>Welcome to Behbaft</h4>
            {session ? (
                <div className={styles.flex}>
                    <img src={session.user.image} alt="" className={styles.menu__img} />
                    <div className={styles.col}><span>Welcome back,</span>
                        <h3>{session.user.name}
                        </h3>
                        <span onClick={()=> signOut()}>Sign out</span></div>
                </div>
            ) : (
                <div className={styles.flex}>
                    <button className={styles.btn_primary}>Register</button>
                    <button className={styles.btn_secondary} onClick={()=> signIn()}>Login</button>
                </div>
            )}
            <ul>
                <li>
                    <Link href='/profile'>Account</Link>
                </li>
                <li>
                    <Link href='/profile/orders'>Orders</Link>
                </li>
                <li>
                    <Link href='/profile/messages'>Messages</Link>
                </li>
                <li>
                    <Link href='/profile/address'>Address</Link>
                </li>
                <li>
                    <Link href='/profile/wishlist'>Wishlist</Link>
                </li>

            </ul>
        </div>
    );
}

export default UserMenu;