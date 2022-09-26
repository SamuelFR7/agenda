import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { IPerson } from '../../dtos/IPerson'
import { api } from '../../services/apiClient'
import { Input } from '../Form/input'
import InputMask from 'react-input-mask'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { queryClient } from '../../services/queryClient'
import { useMutation } from '@tanstack/react-query'

interface IEditPerson {
  isOpen: boolean
  onClose: () => void
  personToEdit: string
  setPersonToEdit: React.Dispatch<React.SetStateAction<string>>
}

interface IEditPersonFormData {
  RazaoSocial: string
  Endereco: string
  Email: string
  Telefone1: string
  Telefone1Contato: string
  Telefone2: string
  Telefone2Contato: string
  Telefone3: string
  Telefone3Contato: string
  Telefone4: string
  Telefone4Contato: string
  Telefone5: string
  Telefone5Contato: string
  Observacoes: string
}

const editPersonFormSchema = yup.object().shape({
  RazaoSocial: yup.string().required('Nome Obrigatório'),
  Email: yup.string().email('Digite um e-mail válido'),
  Observacoes: yup.string(),
  Endereco: yup.string(),
  Telefone1: yup.string().required('Telefone Obrigatório'),
  Telefone2: yup.string(),
  Telefone3: yup.string(),
  Telefone4: yup.string(),
  Telefone5: yup.string(),
  Telefone1Contato: yup.string(),
  Telefone2Contato: yup.string(),
  Telefone3Contato: yup.string(),
  Telefone4Contato: yup.string(),
  Telefone5Contato: yup.string(),
})

function EditPerson({
  isOpen,
  onClose,
  personToEdit,
  setPersonToEdit,
}: IEditPerson) {
  const { register, formState, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(editPersonFormSchema),
  })

  const { errors } = formState

  function handleCloseAndResetPerson() {
    setPersonToEdit('')
    reset()
    onClose()
  }

  const editPerson = useMutation(
    async (person: IEditPersonFormData) => {
      await api.patch('/people/update', {
        id: personToEdit,
        ...person,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['people'])
        handleCloseAndResetPerson()
      },
    }
  )

  const handleEditPerson: SubmitHandler<IEditPersonFormData> = async (
    values
  ) => {
    await editPerson.mutateAsync({
      RazaoSocial: values.RazaoSocial.toUpperCase(),
      Endereco: values.Endereco.toUpperCase(),
      Email: values.Email.toLowerCase(),
      Telefone1: values.Telefone1.replace('_', ''),
      Telefone1Contato: values.Telefone1Contato.toUpperCase(),
      Telefone2: values.Telefone2.replace('_', ''),
      Telefone2Contato: values.Telefone2Contato.toUpperCase(),
      Telefone3: values.Telefone3.replace('_', ''),
      Telefone3Contato: values.Telefone3Contato.toUpperCase(),
      Telefone4: values.Telefone4.replace('_', ''),
      Telefone4Contato: values.Telefone4Contato.toUpperCase(),
      Telefone5: values.Telefone5.replace('_', ''),
      Telefone5Contato: values.Telefone5Contato.toUpperCase(),
      Observacoes: values.Observacoes.toUpperCase(),
    })
  }

  useEffect(() => {
    async function getPersonToEditData() {
      if (personToEdit) {
        const { data } = await api.get<IPerson>(`/people/show/${personToEdit}`)
        setValue('RazaoSocial', data.RazaoSocial)
        setValue('Endereco', data.Endereco)
        setValue('Email', data.Email)
        setValue('Telefone1', data.Telefone1)
        setValue('Telefone1Contato', data.Telefone1Contato)
        setValue('Telefone2', data.Telefone2)
        setValue('Telefone2Contato', data.Telefone2Contato)
        setValue('Telefone3', data.Telefone3)
        setValue('Telefone3Contato', data.Telefone3Contato)
        setValue('Telefone4', data.Telefone4)
        setValue('Telefone4Contato', data.Telefone4Contato)
        setValue('Telefone5', data.Telefone5)
        setValue('Telefone5Contato', data.Telefone5Contato)
        setValue('Observacoes', data.Observacoes)
      }
    }
    getPersonToEditData()
  }, [personToEdit])

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseAndResetPerson}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Contato</ModalHeader>
        <ModalCloseButton />

        <Box as="form" onSubmit={handleSubmit(handleEditPerson)}>
          <ModalBody>
            <VStack spacing="4">
              <HStack spacing="4">
                <Input
                  {...register('RazaoSocial')}
                  error={errors.RazaoSocial}
                  name="RazaoSocial"
                  label="Nome"
                />
                <Input
                  {...register('Endereco')}
                  error={errors.Endereco}
                  name="Endereco"
                  label="Endereço"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Email"
                  {...register('Email')}
                  error={errors.Email}
                  label="E-mail"
                />
                <Input
                  name="Telefone1"
                  {...register('Telefone1')}
                  error={errors.Telefone1}
                  label="Telefone"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Telefone1Contato"
                  {...register('Telefone1Contato')}
                  error={errors.Telefone1Contato}
                  label="Contato 1"
                />
                <Input
                  name="Telefone2"
                  as={InputMask}
                  mask="(**) *****-****"
                  {...register('Telefone2')}
                  error={errors.Telefone2}
                  label="Telefone 2"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Telefone2Contato"
                  {...register('Telefone2Contato')}
                  error={errors.Telefone2Contato}
                  label="Contato 2"
                />
                <Input
                  name="Telefone3"
                  as={InputMask}
                  mask="(**) *****-****"
                  {...register('Telefone3')}
                  error={errors.Telefone3}
                  label="Telefone 3"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Telefone3Contato"
                  {...register('Telefone3Contato')}
                  error={errors.Telefone3Contato}
                  label="Contato 3"
                />
                <Input
                  name="Telefone4"
                  as={InputMask}
                  mask="(**) *****-****"
                  {...register('Telefone4')}
                  error={errors.Telefone4}
                  label="Telefone 4"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Telefone4Contato"
                  {...register('Telefone4Contato')}
                  error={errors.Telefone4Contato}
                  label="Contato 4"
                />
                <Input
                  name="Telefone5"
                  as={InputMask}
                  mask="(**) *****-****"
                  {...register('Telefone5')}
                  error={errors.Telefone5}
                  label="Telefone 5"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Telefone5Contato"
                  {...register('Telefone5Contato')}
                  error={errors.Telefone5Contato}
                  label="Contato 5"
                />
                <Input
                  name="Observacoes"
                  {...register('Observacoes')}
                  error={errors.Observacoes}
                  label="Observações"
                />
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" onClick={onClose} mr={3}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="green">
              Editar
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export { EditPerson }
