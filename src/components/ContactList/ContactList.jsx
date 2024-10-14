import styles from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import {
  selectFilteredContacts,
  selectIsLoading,
} from '../../redux/contactsSlice';
import Loader from '../Loader/Loader';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={styles.listContainer}>
      {isLoading && <Loader />}
      <ul className={styles.contactList}>
        {contacts.map(contact => (
          <li className={styles.contactListItem} key={contact.id}>
            <Contact user={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
