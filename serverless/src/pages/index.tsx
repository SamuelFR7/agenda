import { AddContactDialog } from '~/components/Dialogs/AddContact'
import { ConfirmationDialog } from '~/components/Dialogs/ConfirmationDialog'
import { EditContactDialog } from '~/components/Dialogs/EditContact'
import { ViewContactDialog } from '~/components/Dialogs/ViewContact'
import { Loader } from '~/components/Loader'
import { Pagination } from '~/components/Pagination'
import classNames from 'classnames'
import { Trash } from 'lucide-react'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { api } from '~/utils/api'
import { getServerAuthSession } from '~/server/auth'

export default function Home() {
  const utils = api.useContext()
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const deleteContactMutation = api.contacts.delete.useMutation({
    onSuccess: async () => {
      await utils.contacts.getMany.invalidate()
    },
  })

  const { data, isLoading } = api.contacts.getMany.useQuery({
    page: currentPage,
    search,
  })

  const handleDeleteContact = (id: string) => {
    deleteContactMutation.mutate({
      id,
    })
  }

  return (
    <div className="text-gray-800 h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-[1200px] bg-white shadow-sm rounded-md p-4">
        <h2 className="font-medium text-2xl">Contatos</h2>
        <div className="w-full flex items-center justify-between mt-4">
          <input
            value={search}
            onChange={(e) => {
              if (search.length === 0) {
                setCurrentPage(1)
              }
              setSearch(e.target.value)
            }}
            className={classNames(
              'bg-slate-100 w-[83%] px-3 py-2 rounded-md shadow-sm',
              'focus:placeholder:px-1 placeholder:duration-200',
              'disabled:cursor-not-allowed',
              'focus:outline-none focus:ring-1',
              'border border-transparent focus:border-emerald-400 focus:ring-emerald-400',
            )}
            placeholder="Pesquisar Contato"
          />
          <AddContactDialog />
        </div>
        {!isLoading && data ? (
          <>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left font-medium py-3 px-2">Nome</th>
                  <th className="text-left font-medium py-3 px-2">Telefone</th>
                  <th className="text-left font-medium py-3 px-2">Email</th>
                  <th className="text-center font-medium py-3 px-2">Opções</th>
                </tr>
              </thead>
              <tbody>
                {data.contacts.map((contact) => (
                  <tr
                    className="[&_td]:py-3 [&_td]:px-3 odd:bg-slate-100"
                    key={contact.id}
                  >
                    <td className="rounded-l-md">{contact.name}</td>
                    <td>{contact.phone_1}</td>
                    <td>{contact.email}</td>
                    <td className="rounded-r-md">
                      <div className="flex gap-2 items-center justify-center">
                        <ViewContactDialog contact={contact} />
                        <EditContactDialog contact={contact} />
                        <ConfirmationDialog
                          description="Essa ação não poderá ser desfeita"
                          name="Certeza que deseja deletar esse contato?"
                          onConfirm={() => handleDeleteContact(contact.id)}
                        >
                          <button className="p-2 bg-emerald-400 hover:bg-emerald-500 text-white font-medium rounded-md">
                            <Trash size={16} />
                          </button>
                        </ConfirmationDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              onPageChange={setCurrentPage}
              totalCountOfRegisters={data.count}
              currentPage={currentPage}
              registersPerPage={10}
            />
          </>
        ) : (
          <div className="mt-6 w-full items-center justify-center flex">
            <Loader />
          </div>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
