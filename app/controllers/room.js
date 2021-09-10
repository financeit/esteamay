import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import { inject as service } from '@ember/service'

export default class RoomController extends Controller {
  @service firebase

  fibonacciSequence = [0,1,2,3,5,8,13,21,34,55,89]

  @tracked selectedNumber
  @tracked average

  @action
  async selectCard(number) {
    this.selectedNumber = number

    await this.firebase.vote(this.model.roomId, number)
  }

  @action
  async reset() {
    await this.firebase.reset(this.model.roomId)
  }

  @action
  async reveal() {
    this.average = await this.firebase.reveal(this.model.roomId)
    console.log('Result: ' + this.average)
  }
}
