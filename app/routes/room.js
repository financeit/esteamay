import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default class RoomRoute extends Route {
  @service firebase

  model({ room_id }) {
    return {
      roomId: room_id
    }
  }

  async afterModel(model) {
    await this.firebase.setScoreDoc(model.roomId)

    // check here if room is valid, otherwise go to error page (potentially reuse joinRoom from firebase service)
  }
}
