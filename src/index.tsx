import { createRoot } from 'react-dom/client';

import Root from 'containers/Root';

import 'styles/index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<Root />);
