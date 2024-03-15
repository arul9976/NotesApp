import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    data: [],
    trail: [],
    loading: null
  },
  reducers: {
    fetchedData: (state, action) => {
      state.trail = []
      action.payload.data.forEach(item => {
        state.trail = [item, ...state.trail]
      })

    },
    addNote: (state, action) => {
      state.data = [action.payload, ...state.data]
    },
    addData: (state, action) => {
      state.trail.push(action.payload)
    },
    updateNote: (state, action) => {
      const { id, content } = action.payload;
      const note = state.find(note => note.id === id);
      if (note) {
        note.content = content;
      }
    },
    removeNote: (state, action) => {
      state.trail = state.trail.filter(note => note.id !== action.payload)
    },

    loggedOut: (state, action) => {
      state.trail = action.payload
    }
  }
});
export default notesSlice;