import { useRef, useState } from "react"
import { ConfirmArgs, ConfirmHooks } from "../types/confirm"

export default function useConfirm(): ConfirmHooks {
  const [args, setArgs] = useState<ConfirmArgs>()

  const refDialog = useRef<HTMLDialogElement>(null)
  const refCallbackGrant = useRef<() => void>()
  const refCallbackDenied = useRef<() => void>()

  const handleDialogAction = (action: () => void) => {
    if (refDialog.current) action()
    else console.error("Dialog element is not found.")
  }

  const open = (args: ConfirmArgs, callbackGrant?: () => void, callbackDenied?: () => void): void => {
    handleDialogAction(() => {
      refDialog.current!.showModal()
      setArgs(args)
      refCallbackGrant.current = callbackGrant
      refCallbackDenied.current = callbackDenied
    })
  }

  const grant = (): void => {
    handleDialogAction(() => {
      refDialog.current!.close()
      refCallbackGrant.current?.()
      refCallbackGrant.current = undefined
      refCallbackDenied.current = undefined
      setArgs(undefined)
    })
  }

  const denied = (): void => {
    handleDialogAction(() => {
      refDialog.current!.close()
      refCallbackDenied.current?.()
      refCallbackGrant.current = undefined
      refCallbackDenied.current = undefined
      setArgs(undefined)
    })
  }

  return { refDialog, args, open, grant, denied }
}
