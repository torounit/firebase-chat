import { reducerWithInitialState } from "typescript-fsa-reducers"
import { add, select } from "./actions"

export interface Thread {
  name: string
  title: string
  private: boolean
  isActive: boolean
  users?: []
}

const general: Thread = {
  name: "general",
  title: "General",
  private: false,
  isActive: true,
}

const initialState: Thread[] = [general]

export const reducer = reducerWithInitialState<Thread[]>(initialState)
  .case(add, (state, payload: Thread) => [...state, payload])
  .case(
    select,
    (state, name: string) =>
      state.map(thread => ({
        ...thread,
        isActive: thread.name === name,
      }))
  )
