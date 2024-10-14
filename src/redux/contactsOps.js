import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://670ce6927e5a228ec1d1d1f9.mockapi.io/';

const handleError = (error, thunkApi) => thunkApi.rejectWithValue(error.message);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return handleError(error, thunkApi);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkApi) => {
    try {
      const response = await axios.post('/contacts', newContact);
      return response.data;
    } catch (error) {
      return handleError(error, thunkApi);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      return handleError(error, thunkApi);
    }
  }
);
