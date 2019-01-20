import actionCreatorFactory from "typescript-fsa"
import { Thread } from "./state"

const actionCreator = actionCreatorFactory()

export const add = actionCreator<Thread>("ADD_THREAD")
export const sync = actionCreator<Thread[]>("SYNC_THREAD")
export const select = actionCreator<string>("SELECT_THREAD")
export const remove = actionCreator<string>("REMOVE_THREAD")
export const subscribe = actionCreator<void>("SUBSCRIBE_THREADS")
