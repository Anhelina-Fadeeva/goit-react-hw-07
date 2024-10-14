import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './contactsOps';
import { selectNameFilter } from './filtersSlice';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      })
      .addMatcher(
        isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchContacts.fulfilled, addContact.fulfilled, deleteContact.fulfilled),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
