import { reducerWithInitialState } from "typescript-fsa-reducers"
import { add, changeRoute, select, sync } from "./actions"
import { RouterState } from "connected-react-router"
import pathToRegexp from "path-to-regexp"

export interface Thread {
  name: string
  title: string
  private: boolean
  isActive?: boolean
  users?: []
}

const general: Thread = {
  name: "general",
  title: "General",
  private: false,
  isActive: false,
}

const initialState: Thread[] = [general]

export const reducer = reducerWithInitialState<Thread[]>(initialState)
  .case(add, (state, payload: Thread) => {
    return [...state, payload]
  })
  .case(sync, (state, payload: Thread[]) => {
    const activeThread = state.find(({ isActive }) => Boolean(isActive))
    const activeThreadName = activeThread ? activeThread.name : ""
    const threads = [general, ...payload]
    return threads.map(thread => ({
      ...thread,
      isActive: thread.name === activeThreadName,
    }))
  })
  .case(changeRoute, (state, payload: RouterState) => {
    const pathname = payload.location.pathname
    const re = pathToRegexp("/thread/:threadName")
    const params = re.exec(pathname)
    if (Array.isArray(params) && params[1]) {
      return state.map(thread => ({
        ...thread,
        isActive: thread.name === params[1],
      }))
    }
    return state
  })
  .case(select, (state, name: string) =>
    state.map(thread => ({
      ...thread,
      isActive: thread.name === name,
    }))
  )
