import moment from 'moment';

export function formatDate(dateString: string): string {
  return moment(dateString).format('MMM-D-YY,  h:mm a');
}
