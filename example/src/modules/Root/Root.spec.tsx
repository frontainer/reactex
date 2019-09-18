import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router'
import { stub } from 'sinon'
import Root from './Root';
import * as useRoot from './UseRoot';

it('renders without crashing', () => {
  const _stub = stub(useRoot, 'useRoot').returns({
    ready: false
  })
  const div = document.createElement('div');
  ReactDOM.render(<Root />, div);
  ReactDOM.unmountComponentAtNode(div);
  _stub.restore()
});

it('renders without crashing2', () => {
  const _stub = stub(useRoot, 'useRoot').returns({
    ready: true
  })
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Root /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
  _stub.restore()
});
