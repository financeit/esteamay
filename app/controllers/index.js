import Controller from '@ember/controller'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'

export default class IndexController extends Controller {
  @service router

  formData = {}

  @action
  createNewRoom() {
    let randomAlphanumericId = Math.random().toString(36).substr(2, 6)

    this.router.transitionTo('room', randomAlphanumericId)
    // set up a new firebase room here
  }

  @action
  joinRoom() {
    let roomId = this.formData.roomId

    this.router.transitionTo('room', roomId)
    // connect to an existing firebase room here
  }
}