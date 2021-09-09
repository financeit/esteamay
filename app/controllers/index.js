import Controller from '@ember/controller'
import { action } from '@ember/object'

export default class IndexController extends Controller {
  formData = {}

  @action
  createNewRoom() {
    // set up a new firebase room here
  }

  @action
  joinRoom() {
    let roomId = this.formData.roomId

    // connect to an existing firebase room here
  }
}