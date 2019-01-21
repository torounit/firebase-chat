import { reducerWithInitialState } from "typescript-fsa-reducers"
import { login, logout } from "./actions"
import { UserInfo } from "firebase"

export interface Auth extends UserInfo {
  waiting?: boolean
}

const empty: Auth = {
  displayName: "",
  email: "",
  phoneNumber: "",
  photoURL: "",
  providerId: "",
  uid: "",
}

export const initialState: Auth = { ...empty, waiting: true }

export const reducer = reducerWithInitialState<Auth>(initialState)
  .case(login, (state: Auth, user) => ({
    ...user,
  }))
  .case(logout, () => ({
    ...empty,
  }))
