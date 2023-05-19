import * as Dialog from '@radix-ui/react-dialog'
import { Pencil, X } from 'lucide-react'
import { Input } from '../Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { api } from '~/utils/api'

const editContactSchema = z.object({
  id: z.string().nonempty(),
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

type EditContactSchemaType = z.infer<typeof editContactSchema>

export function EditContactDialog({
  contact,
}: {
  contact: EditContactSchemaType
}) {
  const utils = api.useContext()
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditContactSchemaType>({
    resolver: zodResolver(editContactSchema),
    defaultValues: contact,
  })

  const editContactMutation = api.contacts.edit.useMutation({
    onSuccess: () => {
      utils.contacts.getMany.invalidate()
      setIsOpen(false)
    },
  })

  const handleEditContact: SubmitHandler<EditContactSchemaType> = async (
    values,
  ) => {
    editContactMutation.mutate(values)
  }

  useEffect(() => {
    reset(contact)
  }, [isOpen, reset, contact])

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="p-2 bg-emerald-400 hover:bg-emerald-500 text-white font-medium rounded-md">
          <Pencil size={16} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4">
          <Dialog.Title className="text-2xl font-bold">
            Editar Contato
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(handleEditContact)}
            className="mt-6 flex flex-col gap-3"
          >
            <div className="flex w-full gap-2">
              <Input
                {...register('name')}
                label="Razão Social"
                placeholder="Nome"
                error={errors.name}
              />
              <Input
                {...register('phone_1')}
                label="Telfone 1"
                placeholder="(64) 99999-9999"
                error={errors.phone_1}
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                {...register('email')}
                label="Email"
                placeholder="email@gmail.com"
                error={errors.email}
              />
              <Input
                {...register('address')}
                label="Endereço"
                placeholder="Rua..."
                error={errors.address}
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                {...register('contact_1')}
                label="Contato 1"
                placeholder="Nome Contato"
                error={errors.contact_1}
              />
              <Input
                {...register('phone_2')}
                label="Telefone 2"
                placeholder="(64) 99999-9999"
                error={errors.phone_2}
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                {...register('contact_2')}
                label="Contato 2"
                placeholder="Nome Contato"
                error={errors.contact_2}
              />
              <Input
                {...register('phone_3')}
                label="Telefone 3"
                placeholder="(64) 99999-9999"
                error={errors.phone_3}
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                {...register('contact_3')}
                label="Contato 3"
                placeholder="Nome Contato"
                error={errors.contact_3}
              />
              <Input
                {...register('phone_4')}
                label="Telefone 4"
                placeholder="(64) 99999-9999"
                error={errors.phone_4}
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                {...register('contact_4')}
                label="Contato 4"
                placeholder="Nome Contato"
                error={errors.contact_4}
              />
              <Input
                {...register('phone_5')}
                label="Telefone 5"
                placeholder="(64) 99999-9999"
                error={errors.phone_5}
              />
            </div>
            <div className="flex w-full gap-2">
              <Input
                {...register('contact_5')}
                label="Contato 5"
                placeholder="Nome Contato"
                error={errors.contact_5}
              />
              <Input
                {...register('observations')}
                label="Observações"
                placeholder="Este contato..."
                error={errors.observations}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-white text-lg font-medium h-[40px] rounded-md"
            >
              Salvar
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
