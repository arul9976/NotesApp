import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    isLogged: false,
    trail: [],
    loading: null
  },
  reducers: {
    fetchedData: (state, action) => {
      state.trail = []
      state.isLogged = true;
      action.payload.data.forEach(item => {
        state.trail = [item, ...state.trail]
      })
    },
    addNote: (state, action) => {
      state.trail.forEach(item => {
        if(item.heading === action.payload.heading){
          item.id = action.payload.id
        }
      })
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
      state.isLogged = false;
    }
  }
});
export default notesSlice;