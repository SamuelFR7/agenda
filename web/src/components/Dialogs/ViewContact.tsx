import * as Dialog from '@radix-ui/react-dialog'
import { Eye, X } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { Input } from '../Form/Input'

const ViewContactSchema = z.object({
  name: z.string().nonempty({ message: 'Digite um nome' }).toUpperCase(),
  phone_1: z.string().nonempty({ message: 'Digite um telefone' }).toUpperCase(),
  phone_2: z.string().nullish(),
  phone_3: z.string().nullish(),
  phone_4: z.string().nullish(),
  phone_5: z.string().nullish(),
  contact_1: z.string().nullish(),
  contact_2: z.string().nullish(),
  contact_3: z.string().nullish(),
  contact_4: z.string().nullish(),
  contact_5: z.string().nullish(),
  email: z.string().toLowerCase().nullish(),
  address: z.string().toUpperCase().nullish(),
  observations: z.string().toUpperCase().nullish(),
})

type ViewContactSchemaType = z.infer<typeof ViewContactSchema>

export function ViewContactDialog({
  contact,
}: {
  contact: ViewContactSchemaType
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="p-2 bg-emerald-400 hover:bg-emerald-500 text-white font-medium rounded-md">
          <Eye size={16} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4">
          <Dialog.Title className="text-2xl font-bold">
            Visualizar Contato
          </Dialog.Title>
          <form className="mt-6 flex flex-col gap-3">
            <div className="flex w-full gap-2">
              <Input
                disabled={true}
                defaultValue={contact.name}
                name="name"
                label="Razão Social"
              />
              <Input
                disabled={true}
                defaultValue={contact.phone_1}
                name="phone_1"
                label="Telfone 1"
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                disabled={true}
                defaultValue={contact.email ?? '' ?? ''}
                name="email"
                label="Email"
              />
              <Input
                disabled={true}
                defaultValue={contact.address ?? ''}
                name="address"
                label="Endereço"
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                disabled={true}
                defaultValue={contact.contact_1 ?? ''}
                name="contact_1"
                label="Contato 1"
              />
              <Input
                disabled={true}
                defaultValue={contact.phone_2 ?? ''}
                name="phone_2"
                label="Telefone 2"
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                disabled={true}
                defaultValue={contact.contact_2 ?? ''}
                name="contact_2"
                label="Contato 2"
              />
              <Input
                disabled={true}
                defaultValue={contact.phone_3 ?? ''}
                name="phone_3"
                label="Telefone 3"
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                disabled={true}
                defaultValue={contact.contact_3 ?? ''}
                name="contact_3"
                label="Contato 3"
              />
              <Input
                disabled={true}
                defaultValue={contact.phone_4 ?? ''}
                name="phone_4"
                label="Telefone 4"
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                disabled={true}
                defaultValue={contact.contact_4 ?? ''}
                name="contact_4"
                label="Contato 4"
              />
              <Input
                disabled={true}
                defaultValue={contact.phone_5 ?? ''}
                name="phone_5"
                label="Telefone 5"
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                disabled={true}
                defaultValue={contact.contact_5 ?? ''}
                name="contact_5"
                label="Contato 5"
              />
              <Input
                disabled={true}
                defaultValue={contact.observations ?? ''}
                name="observations"
                label="Observações"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-white text-lg font-medium h-[40px] rounded-md"
            >
              Fechar
            </button>
          </form>
          <Dialog.Close asChild>
            <button className="bg-gray-200 hover:bg-gray-300  absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-md focus:outline-none">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
