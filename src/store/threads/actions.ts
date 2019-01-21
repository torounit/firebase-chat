import actionCreatorFactory from "typescript-fsa"
import { Thread } from "./state"
import { LOCATION_CHANGE, RouterState } from "connected-react-router"

const actionCreator = actionCreatorFactory()

export const add = actionCreator<Thread>("ADD_THREAD")
export const sync = actionCreator<Thread[]>("SYNC_THREADS")
export const select = actionCreator<string>("SELECT_THREAD")
export const changeRoute = actionCreator<RouterState>(LOCATION_CHANGE)
export const remove = actionCreator<string>("REMOVE_THREAD")
export const subscribe = actionCreator<void>("SUBSCRIBE_THREADS")
