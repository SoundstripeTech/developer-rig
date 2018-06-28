import * as React from 'react';
import * as classNames from 'classnames';
import { EXTENSION_VIEWS, BROADCASTER_CONFIG, LIVE_CONFIG, CONFIGURATIONS, PRODUCT_MANAGEMENT } from '../constants/nav-items';
import { UserDropdown } from '../user-dropdown';
import { LoginButton } from '../login-button';
import { UserSession } from '../core/models/user-session';
import { ExtensionManifest } from '../core/models/manifest';
import './component.sass';

export interface PublicProps {
  openProductManagementHandler: Function,
  openConfigurationsHandler: Function,
  viewerHandler: Function,
  loginHandler: Function,
  configHandler: Function,
  liveConfigHandler: Function,
  selectedView: string,
  error: string,
}

export interface ReduxStateProps {
  session?: UserSession,
  manifest?: ExtensionManifest,
}
type Props = PublicProps & ReduxStateProps;

export class RigNavComponent extends React.Component<Props> {
  private openConfigurationsHandler = (): void => {
    this.props.openConfigurationsHandler();
  }

  private openProductManagementHandler = (): void => {
    const { session, manifest, openProductManagementHandler } = this.props;
    if ((session && session.login) && (manifest && manifest.bits_enabled)) {
      openProductManagementHandler();
    }
  }

  public render() {
    const { session, manifest, selectedView } = this.props;

    const extensionViewsClass = classNames({
      'offset': true,
      'top-nav-item': true,
      'top-nav-item__selected': selectedView === EXTENSION_VIEWS,
    });

    const broadcasterConfigClass = classNames({
      'top-nav-item': true,
      'top-nav-item__selected': selectedView === BROADCASTER_CONFIG,
    });

    const liveConfigClass = classNames({
      'top-nav-item': true,
      'top-nav-item__selected': selectedView === LIVE_CONFIG,
    });

    const configurationsClass = classNames({
      'top-nav-item': true,
      'top-nav-item__selected': selectedView === CONFIGURATIONS,
    });

    const productManagementClass = classNames({
      'top-nav-item': true,
      'top-nav-item__selected': selectedView === PRODUCT_MANAGEMENT,
      'top-nav-item__disabled': !(session && session.login) || !(manifest && manifest.bits_enabled),
    });

    if (this.props.error !== '') {
      return (
        <div className='top-nav-error'>
          <a> {this.props.error} </a>
        </div>
      );
    } else {
      return (
        <div className='top-nav'>
          <div className='personal-bar'>
            {manifest && <div className='personal-bar__ext-name'>
              <span>{manifest.name}</span>
            </div>}
            <div className='top-nav-item__login'>
              {(session && session.login) ? <UserDropdown session={session} /> : <LoginButton/>}
            </div>
          </div>
          <div className='top-nab__item-container'>
            <a className={extensionViewsClass} onClick={(event) => this.props.viewerHandler()}>
              Extension Views
            </a>
            <a className={broadcasterConfigClass} onClick={(event) => this.props.configHandler()}>
              Broadcaster Config
            </a>
            <a className={liveConfigClass} onClick={(event) => this.props.liveConfigHandler()}>
              Live Config
            </a>
            <a className={configurationsClass} onClick={(event) => this.openConfigurationsHandler()}>
              Configurations
            </a>
            <a className={productManagementClass} onClick={(event) => this.openProductManagementHandler()}>
              Manage Bits Products
            </a>
          </div>
        </div>
      );
    }
  }
}
