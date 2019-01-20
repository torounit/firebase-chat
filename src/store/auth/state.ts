import { reducerWithInitialState } from "typescript-fsa-reducers"
import { login, logout } from "./actions"
import { UserInfo } from "firebase"

export interface Auth extends UserInfo {
}

export const initialState: Auth = {
  displayName: "",
  email: "",
  phoneNumber: "",
  photoURL: "",
  providerId: "",
  uid: "",
}

export const reducer = reducerWithInitialState(initialState)
  .case(login, (state: any, user) => {
    return {
      ...state,
      ...user,
    }
  })
  .case(logout, (state: {}) => {
    return {
      ...state,
      ...initialState,
    }
  })
