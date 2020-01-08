import { reducerWithInitialState } from "typescript-fsa-reducers"
import { add } from "./actions"

export interface User {
  avatarUrl: string
  displayName: string
  email: string
  uid: string
}

const initialState: User[] = []

export const reducer = reducerWithInitialState(initialState).case(add, (state: User[], payload: User[]): User[] => [
  ...state,
  ...payload,
])
