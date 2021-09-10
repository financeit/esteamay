import Controller from '@ember/controller'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'
import Cookies from 'js-cookie'

export default class IndexController extends Controller {
  @service router
  @service firebase

  formData = {}

  @action
  async createNewRoom() {
    let roomId = Math.random().toString(36).substr(2, 6) // alphanumeric id

    let scoreId = await this.firebase.createRoom(roomId)
    Cookies.set('room-' + roomId, scoreId)

    this.router.transitionTo('room', roomId)
    // set up a new firebase room here
  }

  @action
  async joinRoom() {
    let roomId = this.formData.roomId

    const joinResult = await this.firebase.joinRoom(roomId)

    if (joinResult)
      this.router.transitionTo('room', roomId)
    else
      this.router.transitionTo('not-found')
    // connect to an existing firebase room here
  }
}
