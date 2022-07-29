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
import React from 'react'
import { usePeople } from '../../hooks/usePeople'
import api from '../../services/api'
import { Input } from '../Form/input'
import InputMask from 'react-input-mask'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface IAddPersonProps {
  isOpen: boolean
  onClose: () => void
}

interface IPersonFormData {
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

const createPersonFormSchema = yup.object().shape({
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

function AddPerson({ isOpen, onClose }: IAddPersonProps) {
  const { currentPage, search, setPeople } = usePeople()
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(createPersonFormSchema),
  })
  
  const { errors } = formState

  function handleResetAndClose() {
    reset()
    onClose()
  }

  const handleFinish: SubmitHandler<IPersonFormData> = async (values) => {
    await api.post('/people/', {
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
    if (search) {
      const { data } = await api.get(
        `/people/list/${currentPage}?name=${search.toUpperCase()}`
      )
      setPeople(data)
    } else {
      const { data } = await api.get(`/people/list/${currentPage}`)
      setPeople(data)
    }
    handleResetAndClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleResetAndClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Contato</ModalHeader>
        <ModalCloseButton />
        <Box as="form" onSubmit={handleSubmit(handleFinish)}>
          <ModalBody>
            <VStack spacing="4">
              <HStack spacing="4">
                <Input
                  error={errors.RazaoSocial}
                  {...register('RazaoSocial')}
                  name="RazaoSocial"
                  label="Nome"
                />
                <Input
                  error={errors.Endereco}
                  {...register('Endereco')}
                  name="Endereco"
                  label="Endereço"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  error={errors.Email}
                  {...register('Email')}
                  name="Email"
                  label="E-mail"
                />
                <Input
                  error={errors.Telefone1}
                  {...register('Telefone1')}
                  name="Telefone1"
                  as={InputMask}
                  mask="(**) *****-****"
                  label="Telefone"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  error={errors.Telefone1Contato}
                  {...register('Telefone1Contato')}
                  name="Telefone1Contato"
                  label="Contato 1"
                />
                <Input
                  error={errors.Telefone2}
                  {...register('Telefone2')}
                  name="Telefone2"
                  as={InputMask}
                  mask="(**) *****-****"
                  label="Telefone 2"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  error={errors.Telefone2Contato}
                  {...register('Telefone2Contato')}
                  name="Telefone2Contato"
                  label="Contato 2"
                />
                <Input
                  error={errors.Telefone3}
                  {...register('Telefone3')}
                  name="Telefone3"
                  as={InputMask}
                  mask="(**) *****-****"
                  label="Telefone 3"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Telefone3Contato"
                  label="Contato 3"
                  error={errors.Telefone3Contato}
                  {...register('Telefone3Contato')}
                />
                <Input
                  error={errors.Telefone4}
                  {...register('Telefone4')}
                  name="Telefone4"
                  as={InputMask}
                  mask="(**) *****-****"
                  label="Telefone 4"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  error={errors.Telefone4Contato}
                  {...register('Telefone4Contato')}
                  name="Telefone4Contato"
                  label="Contato 4"
                />
                <Input
                  error={errors.Telefone5}
                  {...register('Telefone5')}
                  name="Telefone5"
                  as={InputMask}
                  mask="(**) *****-****"
                  label="Telefone 5"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  error={errors.Telefone5Contato}
                  {...register('Telefone5Contato')}
                  name="Telefone5Contato"
                  label="Contato 5"
                />
                <Input
                  error={errors.Observacoes}
                  {...register('Observacoes')}
                  name="Observacoes"
                  label="Observações"
                />
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" onClick={handleResetAndClose} mr={3}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="green">
              Cadastrar
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export { AddPerson }
