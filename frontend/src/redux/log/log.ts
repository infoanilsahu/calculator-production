import { createSlice } from '@reduxjs/toolkit'

export interface logState {
  value: boolean
}

const initialState: logState = {
  value: false,
}

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    positive: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    negative: (state) => {
      state.value = false
    },
    alternative: (state) => {
      state.value = !state.value
    },
  },
})

// Action creators are generated for each case reducer function
export const { positive, negative, alternative } = logSlice.actions

export default logSlice.reducer