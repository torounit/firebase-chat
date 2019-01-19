import { UserInfo } from "firebase"
import actionCreatorFactory from "typescript-fsa"

const actionCreator = actionCreatorFactory()

export const login = actionCreator<UserInfo>("LOGIN")
export const logout = actionCreator<void>("LOGOUT")
