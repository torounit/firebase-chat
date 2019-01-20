import actionCreatorFactory from "typescript-fsa"
import { UserInfo } from "firebase"

const actionCreator = actionCreatorFactory()
export const add = actionCreator<UserInfo[]>("ADD_USERS")
export const fetch = actionCreator<string[]>("FETCH_USERS")
