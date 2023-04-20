import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode, useState } from 'react'

interface ConfirmationDialogProps {
  children: ReactNode
  name: string
  description: string
  onConfirm: () => void
  isLoading?: boolean
}

function ConfirmationDialog({
  children,
  description,
  name,
  onConfirm,
  isLoading,
}: ConfirmationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleConfirm() {
    onConfirm()
    setIsOpen(false)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-10 focus:outline-none">
          <Dialog.Title className="text-xl font-bold">{name}</Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-400">
            {description}
          </Dialog.Description>
          <div className="mt-10 flex w-full items-center justify-end gap-4">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-slate-400 px-4 py-2 font-medium text-white hover:bg-slate-500"
            >
              Cancelar
            </button>
            <button
              className="rounded-md bg-emerald-400 px-4 py-2 font-medium text-white hover:bg-emerald-500"
              onClick={() => handleConfirm()}
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : 'Confirmar'}
            </button>
          </div>
          <Dialog.Close asChild></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { ConfirmationDialog }
