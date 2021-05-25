class XRegExp {
  constructor(source, flag, root = "root") {
      this.table = new Map()
      this.regexp = new RegExp(this.compileRegExp(source, root, 0).source, flag)
      console.log(this.regexp.source)
      console.log(this.table)
  }
  compileRegExp(source, name, start) {
      if (source[name] instanceof RegExp) {
          return {
              source: source[name].source,
              length: 0
          }
      }
      let length = 0
      let regexp = source[name].replace(/\<([^>]+)\>/g, (_, $1) => {
          this.table.set(start + length, $1)
          this.table.set($1, start + length)
          length++;
          let r = this.compileRegExp(source, $1, start + length)
          length += r.length
          return '(' + r.source + ')'
      })
      return {
          source: regexp,
          length
      }
  }
  exec(str) {
      let r = this.regexp.exec(str)
      for (let i = 1; i < r.length; i++) {
          if (r[i] !== void 0) {
              r[this.table.get(i - 1)] = r[i]
          }
      }
      console.log(r)
      return r
  }
  get lastIndex() {
      return this.regexp.lastIndex
  }
  set lastIndex(val) {
      return this.regexp.lastIndex = val
  }
}


const reg_table = {
  InputElement: "<Whitespace>|<LineTerminator>|<Comments>|<Token>",
  Whitespace: / /,
  LineTerminator: /\n/,
  Comments: /\/\*(?:[^*]|\*[^\/])*\*\/|\/\/[^\n]*/,
  Token: "<Literal>|<Keywords>|<Identifier>|<Punctuator>",
  Literal: "<NumericLiteral>|<BooleanLiteral>|<StringLiteral>|<NullLiteral>",
  NumericLiteral: /(?:[1-9][0-9]*|0)(?:\.[0-9]*)?|\.[0-9]+/,
  BooleanLiteral: /true|false/,
  StringLiteral: /\"(?:[^"\n]|\\[\s\S])*\"|\'(?:[^'\n]|\\[\s\S])*\'/,
  NullLiteral: /null/,
  Identifier: /[a-zA-Z_$][a-zA-Z0-9_$]*/,
  Keywords: /if|else|for|function/,
  Punctuator: /\+|\,|\?|\:|\{|\}|\.|\(|\=|\<|\+\+|\=\=|\=\>|\*|\)|\[|\]|;/
}

function scan(str) {
  let regexp = new XRegExp(reg_table, 'g', 'InputElement')
  while (regexp.lastIndex < str.length) {
      let r = regexp.exec(str)
  //    console.log(JSON.stringify(r[0]))
  }
}

const code_sample = `
var jump = function(nums) {
  let end = 0, maxpos = 0, steps = 0
  for (let i = 0; i < nums.length - 1; i++) {
      maxpos = Math.max(maxpos, nums[i] + i)
      if (end === i) {
          end = maxpos
          steps++
      }
  }
  return steps
};
`

scan(code_sample)
