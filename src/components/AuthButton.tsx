import React from "react"
import { Button } from "@material-ui/core"

type Props = {
  login: Function
}
export default ({ login }: Props) => (
  <Button variant="contained" color="primary" onClick={() => login()}>
    Login
  </Button>
)
