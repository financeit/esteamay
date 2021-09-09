
export default class AvailabilityTemplateModel extends Model {
  @attr('string') jiraId
  @attr('string') summary
  @attr('string') description
  
  get jiraUrl() {
    return `https://esteamay.atlassian.net/browse/${this.jiraId}`
  }
}