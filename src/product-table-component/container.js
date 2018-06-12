import { connect } from 'react-redux';
import { getUserSession } from '../core/state/session';
import { ProductTableComponent } from './component';

function mapStateToProps(state) {
  return {
    token: (getUserSession(state) || {}).authToken,
  };
}

export const ProductTable = connect(mapStateToProps)(ProductTableComponent);
