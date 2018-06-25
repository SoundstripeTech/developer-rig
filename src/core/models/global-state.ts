import { SessionState } from '../state/session';
import { ExtensionsState } from '../state/extensions';

export interface GlobalState{
  session: SessionState;
  extensions: ExtensionsState;
}
