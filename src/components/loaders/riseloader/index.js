import styles from './styles.module.css'
import { RiseLoader } from 'react-spinners';

function RiseLoaderSpinner({loading}) {
    return ( 
        <>
        <div className={styles.loader}>
            <RiseLoader loading={loading} color='#ff288c'/>
        </div>
        </>
     );
}

export default RiseLoaderSpinner;