import { BiArrowFromRight, BiRightArrowAlt } from 'react-icons/bi';
import styles from './styles.module.scss'

function PrimaryBtn({type, text}) {
    return ( 
        <button className={styles.btn_primary} type={type}>
            {text}
        </button>
     );
}

export default PrimaryBtn;