
// 对正则表达式进行封装。
// 获取当前字符串属于“大正则表达式”的哪个分组
// 利用正则表达式的括号分组功能
class XRegExp {
  constructor(source, flag, root = 'root') {
    this.table = new Map()
    this.regexp = new RegExp(this.compileRegExp(source, root, 0).source, flag)
  }
  compileRegExp(source, name, start) {
    if (source[name] instanceof RegExp) {
      return {
        source: source[name].source,
        length: 0
      }
    }
    // 有replace，所以对序号有影响，要另外计算序号
    let length = 0

    const regexp = source[name].replace(/\<([^>]+)\>/g, (str, $1) => {
      this.table.set(start + length, $1)
      ++length
      const r = this.compileRegExp(source, $1, start + length)
      length += r.length
      return '(' + r.source + ')'
    })
    return {
      source: regexp,
      length: length
    }
  }
  exec(string) {
    let r = this.regexp.exec(string)
    for (let i = 1, len = r.length; i < len; i++) {
      if (r[i] !== void 0) {
        r[this.table.get(i - 1)] = r[i]
      }
    }
    return r
  }
  get lastIndex() {
    return this.regexp.lastIndex
  }
  set lastIndex(value) {
    this.regexp.lastIndex = value
  }
}

export function* scan(str) {
  let regexp = new XRegExp({
    InputElement: '<Whitespace>|<LineTerminator>|<Comments>|<Token>',
    Whitespace: / /,
    LineTerminator: /\n/,
    Comments: /\/\*(?:[^*]|\*[^\/])*\*\/|\/\/[^\n]*/,
    Token: '<Literal>|<Keywords>|<Identifier>|<Punctuator>', // Keywords在Identifier之前，因为Keywords也符合Identifier
    Literal: '<NumericLiteral>|<BooleanLiteral>|<StringLiteral>|<NullLiteral>',
    NumericLiteral: /(?:[1-9][0-9]*|0)(?:\.[0-9]*)?|\.[0-9]+/,
    BooleanLiteral: /true|false/,
    StringLiteral: /\"(?:[^"\n]|\\[\s\S])*\"|\'(?:[^'\n]|\\[\s\S])*\'/,
    NullLiteral: /null/,
    Keywords: /if|else|for|function|let|const/,
    Identifier: /[a-zA-Z_$][a-zA-Z0-9_$]*/,
    Punctuator: /\+|\,|\?|\:|\{|\}|\.|\(|\=|\<|\+\+|\=\=|\=\>|\*|\)|\[|\]|;/
  }, 'g', 'InputElement')

  while (regexp.lastIndex < str.length) {
    let r = regexp.exec(str)

    if (r.Whitespace) {

    } else if (r.LineTerminator) {

    } else if (r.Comments) {

    } else if (r.NumericLiteral) {
      yield {
        type: 'NumericLiteral',
        value: r[0]
      }
    } else if (r.BooleanLiteral) {
      yield {
        type: 'BooleanLiteral',
        value: r[0]
      }
    } else if (r.StringLiteral) {
      yield {
        type: 'StringLiteral',
        value: r[0]
      }
    } else if (r.NullLiteral) {
      yield {
        type: 'NullLiteral',
        value: null
      }
    } else if (r.Identifier) {
      yield {
        type: 'Identifier',
        name: r[0]
      }
    } else if (r.Keywords) {
      yield {
        type: r[0]
      }
    } else if (r.Punctuator) {
      yield {
        type: r[0]
      }
    } else {
      throw new Error('unexpected token' + r[0])
    }

    if (!r[0].length) break
  }
  yield {
    type: 'EOF'
  }
}
// scan(`
//   for(let i = 0; i < 3; i++) {
//     for(let j = 0; j < 3; j++) {
//       let cell = document.createElement('div')
//       cell.classList.add('cell');
//       cell.innerText = pattern[i * 3 + j] == 2 ? '❌' :
//         pattern[i * 3 + j] == 1 ? "⭕️" : "";
//       cell.addEventListener('click', () => userMove(j, i));
//       board.appendChild(cell);
//     }
//     board.appendChild(document.createElement('br'))
//   }
// `)

// let source = `
//   for(let i = 0; i < 3; i++) {
//     for(let j = 0; j < 3; j++) {
//       let cell = document.createElement('div')
//       cell.classList.add('cell');
//       cell.innerText = pattern[i * 3 + j] == 2 ? '❌' :
//         pattern[i * 3 + j] == 1 ? "⭕️" : "";
//       cell.addEventListener('click', () => userMove(j, i));
//       board.appendChild(cell);
//     }
//     board.appendChild(document.createElement('br'))
//   }
// `

// for (let element of scan(source)) {
//   console.log(element);
// }