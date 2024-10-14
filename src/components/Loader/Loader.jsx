import { Circles } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Circles
        visible={true}
        height={80}
        width={80}
        color='#3498db'
        ariaLabel='circles-loading'
      />
    </div>
  );
};

export default Loader;
