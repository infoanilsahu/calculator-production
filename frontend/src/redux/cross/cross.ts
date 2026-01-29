import { createSlice } from '@reduxjs/toolkit'

export interface crossState {
  value: boolean
}

const initialState: crossState = {
  value: false,
}

export const crossSlice = createSlice({
  name: 'cross',
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
export const { positive, negative, alternative } = crossSlice.actions

export default crossSlice.reducer