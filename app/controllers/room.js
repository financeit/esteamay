import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import { inject as service } from '@ember/service'

export default class RoomController extends Controller {
  @service firebase

  fibonacciSequence = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]

  @tracked selectedNumber
  @tracked average

  @action
  async selectCard(number) {
    this.selectedNumber = number

    await this.firebase.vote(this.model.roomId, number)
  }

  @action
  async reset() {
    this.resetSelectedNumber()

    await this.firebase.reset(this.model.roomId)
  }

  resetSelectedNumber() {
    this.average = undefined
    this.selectedNumber = undefined
  }

  @action
  async reveal() {
    await this.firebase.reveal(this.model.roomId)
  }

  setAverage(number) {
    this.average = number
  }
}
