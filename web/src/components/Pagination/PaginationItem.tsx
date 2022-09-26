import React from 'react'
import { Button, useColorModeValue } from '@chakra-ui/react'

interface IPaginationItemProps {
  isCurrent?: boolean
  number: number
  onPageChange: (page: number) => void
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: IPaginationItemProps) {
  const notCurrentBg = useColorModeValue('gray.200', 'gray.500')

  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="green"
        disabled
        _disabled={{ bg: 'green.400', cursor: 'default' }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg={notCurrentBg}
      _hover={{
        bg: 'gray.300',
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}
