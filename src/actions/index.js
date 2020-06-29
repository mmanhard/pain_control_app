import * as UserActions from './UserActions';
import * as BodyPartActions from './BodyPartActions';
import * as EntryActions from './EntryActions';

export default {
  ...UserActions,
  ...BodyPartActions,
  ...EntryActions
};
