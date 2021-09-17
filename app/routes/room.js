import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default class RoomRoute extends Route {
  @service firebase

  // eslint-disable-next-line camelcase
  model({ room_id }) {
    return {
      roomId: room_id
    }
  }

  deactivate() {
    this.firebase.listeners.forEach(listener => {
      listener() // this unsubscribes the listener
    })
  }

  async setupController(controller, model) {
    super.setupController(controller, model)

    await this.firebase.joinRoom(model.roomId)

    this.firebase.listenForReveal(model.roomId, controller.setAverage.bind(controller))
    this.firebase.listenForReset(model.roomId, controller.resetSelectedNumber.bind(controller))
  }
}
