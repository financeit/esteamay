import Route from '@ember/routing/route'

export default class RoomRoute extends Route {
  model({ room_id }) {
    return {
      roomId: room_id
    }
  }

  afterModel(model) {
    let isRoomValid = true // CHANGE: check if roomId is valid
    
    if (!isRoomValid) {
      this.transitionTo('not-found')
    }
  }
}
