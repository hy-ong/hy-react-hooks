import { MutableRefObject } from "react"

export type AlertArgs = {
  title: string
  message: string
}

export type AlertHooks = {
  refDialog: MutableRefObject<HTMLDialogElement | null>
  args: AlertArgs
  open: (args: AlertArgs, cb?: () => void) => void
  close: () => void
}
