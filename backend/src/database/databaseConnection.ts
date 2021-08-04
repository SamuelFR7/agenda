import { connect } from 'mongoose'

class DatabaseControl {
  async start () {
    await connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  }
}

const databaseConnection = new DatabaseControl()

export { databaseConnection }
