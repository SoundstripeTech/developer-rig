import * as React from 'react';
import * as classNames from 'classnames';
import { UserSession } from '../core/models/user-session';
import './component.sass';

export interface PublicProps {
  session: UserSession;
}

export interface ReduxDispatchProps {
  logout: () => void;
}

interface State {
  open?: boolean;
}

type Props = PublicProps & ReduxDispatchProps;
export class UserDropdownComponent extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  private signOut() {
    localStorage.removeItem('rigLogin');
    this.props.logout();
  }
  private toggleDropdown() {
    this.setState({
      open: !this.state.open,
    })
  }
  public render() {
    if (!this.props.session) {
      return null;
    }
    const { login, profileImageUrl } = this.props.session;
    const usernameClasses = classNames({
      'user-dropdown__username': true,
      'open': this.state.open,
    });
    const dropdownClass = classNames({
      'user-dropdown__menu': true,
      'transition': true,
      'open': this.state.open,
    });

    return (
      <div onClick={() => { this.toggleDropdown(); }} className='user-dropdown' tabIndex={0}>
        <div className='user-dropdown__name-container'>
          <img alt={login} className='user-dropdown__image' src={profileImageUrl} />
          <div className={usernameClasses}>{login}</div>
        </div>
        <div className={dropdownClass}>
          <ul>
            <li>
              <a target='_blank' href="https://dev.twitch.tv/dashboard/extensions">Extensions Dashboard</a>
            </li>
            <li>
              <a target='_blank' href="https://dev.twitch.tv/docs/extensions/">Documentation</a>
            </li>
            <li onClick={() => { this.signOut() }}>Sign Out</li>
          </ul>
        </div>
      </div>
    );
  }
}
