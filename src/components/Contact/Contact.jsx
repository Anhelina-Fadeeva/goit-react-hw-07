import { useDispatch } from 'react-redux';
import styles from './Contact.module.css';
import { deleteContact } from '../../redux/contactsOps';

const Contact = ({ user }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact(user.id));

  const formatUserName = (name) => 
    `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactInfo}>
        <p className={styles.contactName}>
          {formatUserName(user.name)}
        </p>
        <p className={styles.contactPhone}>{user.number}</p>
      </div>
      <button
        className={styles.deleteButton}
        type='button'
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
