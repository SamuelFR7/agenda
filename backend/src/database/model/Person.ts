import { model, Model, Schema, Document } from 'mongoose'

interface IPerson extends Document {
  _id: string,
  RazaoSocial: string,
  Telefone1: string,
  Telefone1Contato: string,
  Telefone2: string,
  Telefone2Contato: string,
  Telefone3: string,
  Telefone3Contato: string,
  Telefone4: string,
  Telefone4Contato: string,
  Telefone5: string,
  Telefone5Contato: string,
  Email: string,
  Endereco: string,
  Observacoes: string
}

const PersonSchema = new Schema({
  RazaoSocial: { type: String, required: true },
  Telefone1: { type: String, required: true },
  Telefone1Contato: { type: String, required: false },
  Telefone2: { type: String, required: false },
  Telefone2Contato: { type: String, required: false },
  Telefone3: { type: String, required: false },
  Telefone3Contato: { type: String, required: false },
  Telefone4: { type: String, required: false },
  Telefone4Contato: { type: String, required: false },
  Telefone5: { type: String, required: false },
  Telefone5Contato: { type: String, required: false },
  Email: { type: String, required: false },
  Endereco: { type: String, required: false },
  Observacoes: { type: String, required: false }
})

const Person: Model<IPerson> = model('Person', PersonSchema)

export default Person
