import { connect } from 'react-redux';
import { getUserSession } from '../core/state/session';
import { getProducts, getError } from '../core/state/products';
import { ProductTableComponent } from './component';
import * as ProductActions from '../core/actions/products';

function mapStateToProps(state) {
  return {
    products: getProducts(state),
    error: getError(state),
    token: (getUserSession(state) || {}).authToken,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProductsSuccess: products => dispatch(ProductActions.loadProductsSuccess(products)),
    loadProductsFailure: error => dispatch(ProductActions.loadProductsFailure(error)),
    saveProductsSuccess: index => dispatch(ProductActions.saveProductSuccess(index)),
    saveProductsFailure: (index, error) => dispatch(ProductActions.saveProductFailure(index, error)),
    addProduct: () => dispatch(ProductActions.addProduct()),
    changeProductValue: (index, fieldName, value) => dispatch(ProductActions.changeProductValue(index, fieldName, value)),
  };
}

export const ProductTable = connect(mapStateToProps, mapDispatchToProps)(ProductTableComponent);
