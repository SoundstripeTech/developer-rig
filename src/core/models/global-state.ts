import { SessionState } from '../state/session';
import { ExtensionsState } from '../state/extensions';
import { ProductState } from '../state/products';

export interface GlobalState{
  session: SessionState;
  extensions: ExtensionsState;
  products: ProductState;
}
