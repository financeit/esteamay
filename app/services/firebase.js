import Service from '@ember/service'
import { initializeApp } from 'firebase/app'

export default class JiraService extends Service {
  @service store

  createRoom(roomId) {
    app.database
  }

  init() {
    const app = initializeApp(ENV.firebase)

  }
}
