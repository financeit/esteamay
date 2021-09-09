import Controller from '@ember/controller'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'

export default class IndexController extends Controller {
  @service router
  @service firebase

  formData = {}

  @action
  async createNewRoom() {
    let id = Math.random().toString(36).substr(2, 6) // alphanumeric id

    await this.firebase.createRoom(id)

    this.router.transitionTo('room', id)
    // set up a new firebase room here
  }

  @action
  joinRoom() {
    let roomId = this.formData.roomId

    this.router.transitionTo('room', roomId)
    // connect to an existing firebase room here
  }
}