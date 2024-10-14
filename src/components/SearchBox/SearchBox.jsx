import { useDispatch } from 'react-redux';
import styles from './SearchBox.module.css';
import { changeFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    dispatch(changeFilter(event.target.value.toLowerCase()));
  };

  return (
    <div className={styles.searchContainer}>
      <label className={styles.searchLabel}>
        Find contact by name
        <input
          className={styles.searchInput}
          type='text'
          onChange={handleSearch}
        />
      </label>
    </div>
  );
};

export default SearchBox;
