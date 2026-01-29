import { createSlice } from '@reduxjs/toolkit'

export interface userState {
  value: boolean
}



const initialState: userState = {
  value: false
}

export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    
    setUserLoginTrue: (state) => {
      state.value = true
    },
    setUserLoginFalse: (state) => {
      state.value = false
    },

    setAltLogin: (state) => {
        state.value = !state.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserLoginTrue,setUserLoginFalse,setAltLogin } = userLoginSlice.actions

export default userLoginSlice.reducer