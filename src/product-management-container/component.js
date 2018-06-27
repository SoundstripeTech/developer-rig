import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './component.sass';
import { ProductTable } from '../product-table-component';

export class ProductManagementViewContainer extends Component {
  render() {
    return (
      <div className='product-container-wrapper'>
        <div className='product-container'>
          <ProductTable clientId={this.props.clientId} />
        </div>
      </div>
    );
  }
}

ProductManagementViewContainer.propTypes = {
  clientId: PropTypes.string.isRequired,
}