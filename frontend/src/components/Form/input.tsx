import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import React from 'react'

interface IInputProps extends ChakraInputProps {
  name: string
  label?: string
  mask?: string
}

function Input({ name, label, ...rest }: IInputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="green.500"
        _hover={{ bgColor: 'gray.50' }}
        size="lg"
        {...rest}
      />
    </FormControl>
  )
}

export { Input }
