import { RigStore } from './rig-store';

describe('RigStore', () => {
  it('initializes the correct reducers', () => {
    const store = new RigStore();
    const expectedState = {
      session: {},
      extensions: {},
    }
    const state = store.getState();
    expect(state).toEqual(expectedState);[]
  });
});
