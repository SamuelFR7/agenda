import { model, Schema } from 'mongoose'

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

export default model('Person', PersonSchema)
