import Link from 'next/link';
import { IoLocationSharp } from 'react-icons/Io5'
import styles from './styles.module.scss'

function Copyright({ country }) {
    return (
        <div className={styles.footer__copyright}>
            <section>
                2023 BEHBAFT | All Rights Reserved.
            </section>
            <section>
                <ul>
                    {data.map(link => (
                        <li key={link.name}>
<Link href={link.link}>{link.name}</Link>
                        </li>
                    ))}
                    <li>
                        <IoLocationSharp/> {country.name.toString()}
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default Copyright;

const data = [
    {
        name: "Privacy Center",
        link: "",
    },
    {
        name: "Privacy & Cookie Policy",
        link: "",
    },
    {
        name: "Manage Cookies",
        link: "",
    },
    {
        name: "Terms & Conditions",
        link: "",
    },
    {
        name: "Copyright Notice",
        link: "",
    },
];