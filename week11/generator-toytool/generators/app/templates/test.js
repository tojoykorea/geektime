import assert from 'assert'
import {add} from '../src/add.js'

it('1 + 2 should return 3', function() {
    assert.equal(add(1, 2), 3)
})
