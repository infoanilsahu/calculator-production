import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface userState {
  value: {
    username: string;
    email: string;
    history: Uhistory[]; 
  }
  refreshHistory: number;
}

interface Uhistory {
  path: string;
  input: {};
  answer: number;
  date: string;
}

const initialState: userState = {
  value: {
    username: "",
    email: "",
    history: [],
  },
  refreshHistory: 0,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    setUser: (state,actions: PayloadAction<{email: string, username: string}>) => {
        state.value.username = actions.payload.username
        state.value.email = actions.payload.email
    },


    addHistory: (state,action: PayloadAction<Uhistory>) => {
        state.value.history?.push(action.payload)
    },

    clearHistory: (state) => {
      state.value.history = []
    },

    triggerHistoryRefresh: (state) => {
      state.refreshHistory += 1; // 👈 change value every time
    },

    clearUser: (state) => {
        state.value = initialState.value
    }

  },
})

// Action creators are generated for each case reducer function
export const { setUser,addHistory,clearUser,clearHistory,triggerHistoryRefresh } = userSlice.actions

export default userSlice.reducer