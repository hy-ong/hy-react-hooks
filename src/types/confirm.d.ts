import { MutableRefObject } from "react"

export type ConfirmArgs = {
  title: string
  message: string
  grantText: string
  deniedText: string
}

export type ConfirmHooks = {
  refDialog: MutableRefObject<HTMLDialogElement | null>
  args: ConfirmArgs
  open: (args: ConfirmArgs, callbackGrant?: () => void, callbackDenied?: () => void) => void
  grant: () => void
  denied: () => void
}
