import { memo } from 'react';

import { Provider } from 'react-redux';

import App from 'containers/App';

import { store } from 'store';

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default memo(Root);
