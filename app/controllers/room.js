import Controller from '@ember/controller'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'
import { tracked } from '@glimmer/tracking'


export default class RoomController extends Controller {
  fibonacciSequence = [0,1,2,3,5,8,13,21,34,55,89]

  @tracked selectedNumber

  @action
  selectCard(number) {
    this.selectedNumber = number
  }
}