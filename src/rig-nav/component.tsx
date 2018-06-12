import * as React from 'react';
import { EXTENSION_VIEWS, BROADCASTER_CONFIG, LIVE_CONFIG, CONFIGURATIONS, PRODUCT_MANAGEMENT } from '../constants/nav-items';
import { UserDropdown } from '../user-dropdown';
import { LoginButton } from '../login-button';
import { UserSession } from '../core/models/user-session';
import './component.sass';

export interface PublicProps {
  openProductManagementHandler: Function,
  openConfigurationsHandler: Function,
  viewerHandler: Function,
  loginHandler: Function,
  configHandler: Function,
  liveConfigHandler: Function,
  bitsEnabled: boolean,
  selectedView: string,
  error: string,
}

export interface ReduxStateProps {
  session?: UserSession,
}
type Props = PublicProps & ReduxStateProps;

export class RigNavComponent extends React.Component<Props> {
  private openConfigurationsHandler = (): void => {
    this.props.openConfigurationsHandler();
  }

  public render() {
    const { session } = this.props;
    if (this.props.error !== '') {
      return (
        <div className="top-nav-error">
          <a> {this.props.error} </a>
        </div>
      );
    } else {
      return (
        <div className="top-nav">
          <a
            className={this.props.selectedView === EXTENSION_VIEWS ? "top-nav-item top-nav-item__selected" : "top-nav-item"}
            onClick={(event) => this.props.viewerHandler()}>Extension Views</a>
          <a
            className={this.props.selectedView === BROADCASTER_CONFIG ? "top-nav-item top-nav-item__selected" : "top-nav-item"}
            onClick={(event) => this.props.configHandler()}>Broadcaster Config</a>
          <a
            className={this.props.selectedView === LIVE_CONFIG ? "top-nav-item top-nav-item__selected" : "top-nav-item"}
            onClick={(event) => this.props.liveConfigHandler()}>Live Config</a>
          <a
            className={this.props.selectedView === CONFIGURATIONS ? "top-nav-item top-nav-item__selected" : "top-nav-item"}
            onClick={(event) => this.openConfigurationsHandler()}>Configurations</a>
          {this.props.session && this.props.bitsEnabled && 
            <a
              className={this.props.selectedView === PRODUCT_MANAGEMENT ? "top-nav-item top-nav-item__selected" : "top-nav-item"}
              onClick={(event) => this.props.openProductManagementHandler()}>Manage Products</a>
          }
          {(session && session.login) ? <UserDropdown session={this.props.session} /> : <LoginButton/>}
        </div>
      );
    }
  }
}
