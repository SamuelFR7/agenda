import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { Input } from '../Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'

const addContactSchema = z.object({
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

type AddContactSchemaType = z.infer<typeof addContactSchema>

export function AddContactDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddContactSchemaType>({
    resolver: zodResolver(addContactSchema),
  })

  const addContactMutation = useMutation({
    mutationFn: async (values: AddContactSchemaType) => {
      return api.post('/contacts/', values)
    },
    onSuccess: () => {
      setIsOpen(false)
    },
  })

  const handleAddContact: SubmitHandler<AddContactSchemaType> = async (
    values,
  ) => {
    addContactMutation.mutate(values)
  }

  useEffect(() => {
    reset()
  }, [isOpen, reset])

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="w-[15%] bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-2 rounded-md">
          Novo Contato
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4">
          <Dialog.Title className="text-2xl font-bold">
            Novo Contato
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(handleAddContact)}
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
