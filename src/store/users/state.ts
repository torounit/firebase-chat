import { reducerWithInitialState } from "typescript-fsa-reducers"
import { add } from "./actions"
import { UserInfo } from "firebase"

// export const UserInfo = {
//   displayName: "",
//   email: "",
//   photoURL: "",
//   uid: "",
// }

const initialState: UserInfo[] = []

export const reducer = reducerWithInitialState(initialState)
.case(add, (state: UserInfo[], payload: UserInfo[]): UserInfo[] => [...state, ...payload])
