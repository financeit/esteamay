import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FirebaseComponent extends Component {
  @service firebase;
  @tracked completed;

  signIn() {
    //this.firebase.auth().signInWithEmailAndPassword('foo', 'bar');
  }
}
