import { connect } from 'react-redux';
import { GlobalState } from '../core/models/global-state';
import { getUserSession } from '../core/state/session';
import { PublicProps, ReduxStateProps, RigNavComponent } from './component';
import { getManifest } from '../core/state/extensions';

function mapStateToProps(state: GlobalState): ReduxStateProps {
  return {
    session: getUserSession(state),
    manifest: getManifest(state),
  };
}

export const RigNav = connect<ReduxStateProps, PublicProps, {}>(mapStateToProps)(RigNavComponent);
