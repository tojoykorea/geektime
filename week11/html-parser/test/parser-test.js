import assert from 'assert'
import {parseHTML} from '../src/parser.js'

describe('parse html', function() {
    it('<a></a>', function() {
        let tree = parseHTML('<a></a>')
        //console.log(tree)
        assert.equal(tree.children[0].tagName, 'a')
        assert.equal(tree.children[0].children.length, 0)
    })
    it('<a href="//time.geekbang.com/"></a>', function() {
        let tree = parseHTML('<a href="//time.geekbang.com/"></a>')
        //console.log(tree)
        assert.equal(tree.children[0].tagName, 'a')
        assert.equal(tree.children[0].children.length, 0)
    })
    it('<a href ></a>', function() {
        let tree = parseHTML('<a href ></a>')
        //console.log(tree)
        assert.equal(tree.children[0].tagName, 'a')
        assert.equal(tree.children[0].children.length, 0)
    })
    it('<a href id></a>', function() {
        let tree = parseHTML('<a href id></a>')
        //console.log(tree)
        assert.equal(tree.children[0].tagName, 'a')
        assert.equal(tree.children[0].children.length, 0)
    })
    it('<a href="//time.geekbang.com/" id></a>', function() {
        let tree = parseHTML('<a href="//time.geekbang.com/"></a>')
        //console.log(tree)
        assert.equal(tree.children[0].tagName, 'a')
        assert.equal(tree.children[0].children.length, 0)
    })
    it('<a id=abc></a>', function() {
        let tree = parseHTML('<a id=abc></a>')
        //console.log(tree)
        assert.equal(tree.children[0].tagName, 'a')
        assert.equal(tree.children[0].children.length, 0)
    })
    it('<input/>', function() {
        let tree = parseHTML('<input/>')
        //console.log(tree)
        assert.equal(tree.children[0].tagName, 'input')
        assert.equal(tree.children[0].children.length, 0)
    })
    it("<a href='abc' id></a>", function() {
        let tree = parseHTML("<a href='abc' id></a>")
        //console.log(tree)
        assert.equal(tree.children[0].tagName, 'a')
        assert.equal(tree.children[0].children.length, 0)
    })
    it("<a />", function() {
        let tree = parseHTML("<a />")
        //console.log(tree)
        assert.equal(tree.children[0].tagName, 'a')
        assert.equal(tree.children[0].children.length, 0)
    })
    //描述要与上一case不同
    it("<A /> use upper case", function() {
        let tree = parseHTML("<A />")
        //console.log(tree)
        assert.equal(tree.children[0].tagName, 'A')
        assert.equal(tree.children[0].children.length, 0)
    })
    it("<>", function() {
        let tree = parseHTML("<>")
        console.log(tree)
        assert.equal(tree.children[0].type, 'text')
        assert.equal(tree.children.length, 1)
    })
    it('<a id=abc/>', function() {
        let tree = parseHTML('<a id=abc/>')
        //console.log(tree)
        assert.equal(tree.children[0].tagName, 'a')
        assert.equal(tree.children[0].children.length, 0)
    })
    it('<a></>', function() {
        try {
            let tree = parseHTML('<a></>')
        } catch (err) {
            assert.equal(err.message, 'wrong tag')
        }
    })
})
