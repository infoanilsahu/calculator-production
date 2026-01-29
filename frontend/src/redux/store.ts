import { configureStore } from '@reduxjs/toolkit'
import crossReducer from './cross/cross.ts'
import logReducer from './log/log.ts'
import userReducer from './user/user.ts'
import userLoginReducer from './user/userLogin.ts'

export const store = configureStore({
  reducer: {
    cross: crossReducer,
    log: logReducer,
    user: userReducer,
    userLogin: userLoginReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch