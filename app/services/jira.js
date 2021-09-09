import Service from '@ember/service'
import fetch from 'fetch'


export default class JiraService extends Service {
  @service store
  
  fetchInfo(jiraId) {
    const url = this._apiUrl(jiraId)

    fetch(url, {
      method: 'GET',
      headers: {
      'Authorization': 'Basic Z21pZ2dhbkBmaW5hbmNlaXQuaW86Zk1FWFBDSXJMSVZPVEtMS1pBRTVDQkY0'
    }}).then(async (response) => {
      if (response.ok) {
        let result = await response.json()
        let ticket = this.store.createRecord('jiraTicket', {
          jiraId: jiraId, summary: response.fields.summary,
          description: response.fields.description
        })

        return ticket
      }})
  }
  _jiraBaseUrl() {
    return 'https://esteamay.atlassian.net'
  }
  _ticketUrl(id) {
    `${this._jiraBaseUrl()}/browse/${id}`
  }
  _apiUrl(id) {
    `${this._jiraBaseUrl()}/rest/api/latest/issue/${id}?fields=description,summary`
  }
}
