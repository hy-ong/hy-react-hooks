import { useRef, useState } from "react"
import { AlertArgs, AlertHooks } from "../types/alert"

export default function useAlert(): AlertHooks {
  const [args, setArgs] = useState<AlertArgs>()

  const refDialog = useRef<HTMLDialogElement>(null)
  const refCallback = useRef<() => void>()

  const handleDialogAction = (action: () => void) => {
    if (refDialog.current) action()
    else console.error("Dialog element is not found.")
  }

  const open = (args: AlertArgs, callback?: () => void): void => {
    handleDialogAction(() => {
      refDialog.current!.showModal()
      setArgs(args)
      refCallback.current = callback
    })
  }

  const close = (): void => {
    handleDialogAction(() => {
      refDialog.current!.close()
      refCallback.current?.()
      refCallback.current = undefined
      setArgs(undefined)
    })
  }

  return { refDialog, args, open, close }
}
