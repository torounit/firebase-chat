import actionCreatorFactory from "typescript-fsa"
import { Auth } from "./state"

const actionCreator = actionCreatorFactory()

export const login = actionCreator<Auth>("LOGIN")
export const logout = actionCreator<void>("LOGOUT")
