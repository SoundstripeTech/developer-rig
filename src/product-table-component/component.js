import React, { Component } from 'react'
import { ProductRow } from './product-row';
import { fetchProducts, saveProduct } from '../util/api';
import * as ProductErrors from '../constants/product-errors';
import './component.sass';

const PRODUCT_NUM_LIMIT = 250;

export class ProductTableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [{
        displayName: 'New Product',
        sku: 'sku1',
        amount: '1',
        inDevelopment: 'true',
        broadcast: 'true',
        deprecated: false,
        dirty: true,
        validationErrors: {}
      }],
      error: ''
    };
  }

  componentDidMount() {
    fetchProducts(
      'api.twitch.tv',
      this.props.clientId,
      this.props.token,
      this._handleFetchProductsSuccess.bind(this),
      this._handleFetchProductsError.bind(this)
    );
  }

  handleValueChange(index, event) {
    const value = event.target.value;
    const fieldName = event.target.name;
    const partial = {
      [fieldName]: value,
      dirty: true
    };
    this._updateProduct(index, partial);
  }

  handleDeprecateClick(index, event) {
    const deprecated = this.state.products[index].deprecated;
    const partial = {
      deprecated: !deprecated,
      dirty: true
    };
    this._updateProduct(index, partial);
  }

  handleAddProductClick(event) {
    this.setState(prevState => {
      const products = [...prevState['products']];
      const product = {
        displayName: 'New Product',
        sku: 'newSKU',
        amount: '1',
        inDevelopment: 'true',
        broadcast: 'true',
        deprecated: false,
        dirty: true,
        validationErrors: {}
      };
      products.push(product)
      return { products: products };
    });
  }

  handleSaveProductsClick(event) {
    const products = this.state.products.map((p, i) => {
      if (p.dirty) {
        p.saving = true
        saveProduct(
          'api.twitch.tv',
          this.props.clientId,
          this.props.token,
          p,
          this._handleSaveProductSuccess.bind(this, i),
          this._handleSaveProductError.bind(this, i)
        );
      }
      return p;
    });
    this.setState({
      products: products
    });
  }

  render() {
    const skus = this.state.products.map(p => p.sku);
    const disableAddButton = this.state.products.length >= PRODUCT_NUM_LIMIT;
    let disableSaveButton = false;
    let liveProducts = [];
    let deprecatedProducts = [];

    this.state.products.forEach((p, i) => {
      const matchingSkus = skus.filter(sku => sku === p.sku);
      p.validationErrors = p.validationErrors || {};
      if (matchingSkus.length > 1) {
        p.validationErrors = {
          ...p.validationErrors,
          sku: ProductErrors.SKU_UNIQUE
        }
      } else if (p.validationErrors.sku === ProductErrors.SKU_UNIQUE) {
        delete p.validationErrors.sku;
      }

      if (Object.keys(p.validationErrors).length > 0) {
        disableSaveButton = true;
      }

      const productRowElement = (
        <ProductRow key={i} product={p}
          handleValueChange={this.handleValueChange.bind(this, i)}
          handleDeprecateClick={this.handleDeprecateClick.bind(this, i)}
        />
      );

      if (p.deprecated) {
        deprecatedProducts.push(productRowElement);
      } else {
        liveProducts.push(productRowElement);
      }
    });

    return (
      <div className="product-table">
        {this.state.error &&
          <div className="product-table__error">
            <h4>Error getting products.</h4>
            <p>{this.state.error}</p>
          </div>
        }
        {liveProducts.length > 0 &&
          <div>
            <div className="product-table__category">
              Live
            </div>
            <div className="product-table__header">
              <div className="text-col">Product Name</div>
              <div className="text-col">SKU</div>
              <div className="text-col">Amount (in Bits)</div>
              <div className="select-col">In Development</div>
              <div className="select-col">Broadcast</div>
              <div className="button-col"></div>
              <div className="dirty-col"></div>
            </div>
            {liveProducts}
          </div>        
        }
        {deprecatedProducts.length > 0 &&
          <div>
            <div className="product-table__category">
              Deprecated
            </div>
            <div className="product-table__header">
              <div className="text-col">Product Name</div>
              <div className="text-col">SKU</div>
              <div className="text-col">Amount (in Bits)</div>
              <div className="select-col">In Development</div>
              <div className="select-col">Broadcast</div>
              <div className="button-col"></div>
              <div className="dirty-col"></div>
            </div>
            {deprecatedProducts}
          </div>
        }
        <div className="product-table__buttons">
          <button className="product-table__add-button"
              onClick={this.handleAddProductClick.bind(this)}
              disabled={disableAddButton}>
            Add Product
          </button>
          <button className="product-table__save-button"
              onClick={this.handleSaveProductsClick.bind(this)}
              disabled={disableSaveButton}>
            Save All
          </button>
        </div>
      </div>
    );
  }

  _updateProduct(index, partial) {
    this.setState(prevState => {
      const products = prevState.products.map((product, idx) => {
        if (idx === index) {
          let newProduct = {
            ...product,
            ...partial
          };
          newProduct.validationErrors = this._validateProduct(newProduct);
          return newProduct;
        }
        return product;
     });
     return { products: products };
    });
  }

  _validateProduct(product) {
    let validationErrors = {};

    if (!product.displayName) {
      validationErrors.displayName = ProductErrors.NAME_EMPTY;
    } else if (product.displayName.length > 255) {
      validationErrors.displayName = ProductErrors.NAME_CHAR_LIMIT;
    }

    if (!product.sku) {
      validationErrors.sku = ProductErrors.SKU_EMPTY;
    } else if (product.sku.search(/^\S*$/)) {
      validationErrors.sku = ProductErrors.SKU_WHITESPACE;
    } else if (product.sku.length > 255) {
      validationErrors.sku = ProductErrors.SKU_CHAR_LIMIT;
    }

    if (!product.amount) {
      validationErrors.amount = ProductErrors.AMOUNT_EMPTY;
    } else if (product.amount < 1 || product.amount > 10000) {
      validationErrors.amount = ProductErrors.AMOUNT_OUT_OF_RANGE;
    }

    return validationErrors;
  }

  _handleFetchProductsSuccess(products) {
    this.setState({ products: products });
  }

  _handleFetchProductsError(error) {
    this.setState({ error: error });
  }

  _handleSaveProductSuccess(index) {
    const partial = {
      savedInCatalog: true,
      dirty: false
    };
    this._updateProduct(index, partial);
  }

  _handleSaveProductError(index, error) {
    const partial = {
      error: error
    };
    this._updateProduct(index, partial);
  }
}