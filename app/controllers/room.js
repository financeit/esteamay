import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import { inject as service } from '@ember/service'

export default class RoomController extends Controller {
  @service firebase

  fibonacciSequence = [0,1,2,3,5,8,13,21,34,55,89]

  @tracked selectedNumber
  @tracked selectedNumberText = 'Select your card, when prompted'
  @tracked average

  @action
  async selectCard(number) {
    this.selectedNumber = number
    this.selectedNumberText = 'Selected score card: ' + number

    await this.firebase.vote(this.model.roomId, number)
  }

  @action
  async reset() {
    this.selectedNumber = ''
    this.selectedNumberText = 'Select your card, when prompted'
    await this.firebase.reset(this.model.roomId)
  }

  @action
  async reveal() {
    this.average = await this.firebase.reveal(this.model.roomId)
    console.log('Result: ' + this.average)
  }
}
