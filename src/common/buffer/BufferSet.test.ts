/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import * as assert from 'assert';
import { BufferSet } from 'common/buffer/BufferSet';
import { Buffer } from 'common/buffer/Buffer';
import { MockOptionsService, MockBufferService } from 'common/TestUtils.test';

describe('BufferSet', () => {
  let bufferSet: BufferSet;

  beforeEach(() => {
    bufferSet = new BufferSet(
      new MockOptionsService({ scrollback: 1000 }),
      new MockBufferService(80, 24)
    );
  });

  describe('constructor', () => {
    it('should create two different buffers: alt and normal', () => {
      assert.strictEqual(bufferSet.normal instanceof Buffer, true);
      assert.strictEqual(bufferSet.alt instanceof Buffer, true);
      assert.notEqual(bufferSet.normal, bufferSet.alt);
    });
  });

  describe('activateNormalBuffer', () => {
    beforeEach(() => {
      bufferSet.activateNormalBuffer();
    });

    it('should set the normal buffer as the currently active buffer', () => {
      assert.equal(bufferSet.active, bufferSet.normal);
    });
  });

  describe('activateAltBuffer', () => {
    beforeEach(() => {
      bufferSet.activateAltBuffer();
    });

    it('should set the alt buffer as the currently active buffer', () => {
      assert.equal(bufferSet.active, bufferSet.alt);
    });
  });

  describe('cursor handling when swapping buffers', () => {
    beforeEach(() => {
      bufferSet.normal.x = 0;
      bufferSet.normal.y = 0;
      bufferSet.alt.x = 0;
      bufferSet.alt.y = 0;
    });

    it('should keep the cursor stationary when activating alt buffer', () => {
      bufferSet.activateNormalBuffer();
      bufferSet.active.x = 30;
      bufferSet.active.y = 10;
      bufferSet.activateAltBuffer();
      assert.equal(bufferSet.active.x, 30);
      assert.equal(bufferSet.active.y, 10);
    });
    it('should keep the cursor stationary when activating normal buffer', () => {
      bufferSet.activateAltBuffer();
      bufferSet.active.x = 30;
      bufferSet.active.y = 10;
      bufferSet.activateNormalBuffer();
      assert.equal(bufferSet.active.x, 30);
      assert.equal(bufferSet.active.y, 10);
    });
  });
});
