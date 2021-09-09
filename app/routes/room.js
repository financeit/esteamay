import Route from '@ember/routing/route'

export default class RoomRoute extends Route {
  model({ room_id }) {
    return room_id
  }

  // setupController(controller, model)
}
