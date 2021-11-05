import React from 'react'

import Edit from '../../assets/edit.svg'
import View from '../../assets/view.svg'
import Delete from '../../assets/delete.svg'

import { Container } from './styles'

export function PeopleTable () {
  return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Contato</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>SAMUEL</td>
                        <td className="number">64999551405</td>
                        <td>MÁRCIO</td>
                        <td><div className="imgButton"><View /></div></td>
                        <td><div className="imgButton"><Edit /></div></td>
                        <td><div className="imgButton"><Delete /></div></td>
                    </tr>
                </tbody>
            </table>
        </Container>
  )
}
