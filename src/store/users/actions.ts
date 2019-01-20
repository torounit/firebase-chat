import actionCreatorFactory from "typescript-fsa"
import { User } from "./state"

const actionCreator = actionCreatorFactory()
export const add = actionCreator<User[]>("ADD_USERS")
export const fetch = actionCreator<string[]>("FETCH_USERS")
