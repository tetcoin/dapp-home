// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import sinon from 'sinon';

import Contracts from '@parity/shared/lib/contracts';

import { VERSION_ID } from './news';

let contracts;
let globalContractsGet;
let globalFetch;

export function stubGlobals () {
  contracts = {
    githubHint: {
      getEntry: sinon.stub().resolves(['testUrl', 'testOwner', 'testCommit'])
    },
    registry: {
      lookupMeta: sinon.stub().resolves('testMeta')
    }
  };

  globalContractsGet = Contracts.get;
  globalFetch = global.fetch;

  sinon.stub(Contracts, 'get', () => contracts);
  sinon.stub(global, 'fetch').resolves({
    ok: true,
    json: sinon.stub().resolves({
      [VERSION_ID]: {
        items: 'testContent'
      }
    })
  });
}

export function restoreGlobals () {
  Contracts.get = globalContractsGet;
  global.fetch = globalFetch;
}
