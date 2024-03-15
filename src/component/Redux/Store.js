import { configureStore } from '@reduxjs/toolkit'
import notesSlice from './Reducer';

export const { addNote, updateNote, removeNote } = notesSlice.actions;
export const selectNotes = state => state.notes;

const store = configureStore({
  reducer: {
    notes: notesSlice.reducer
  }
});

export default store;