/*
* Open sourced from Kuali Co under the MIT license
*
* This makes sure that all generator functions specify a return type of $FlowFixYield, which equates to the `any` type.
* It also make sure to cast the return type of any use of a yield within an expression to $FlowFixYield.
*/

'use strict';
var _ = require('lodash')

module.exports = function(fileInfo, api) {
  let j = api.jscodeshift

  const fixYieldType = j.typeAnnotation(
    j.genericTypeAnnotation(
      j.identifier('$FlowFixYield'),
      null
    )
  )

  const wrapYieldInTypeCast = yieldExpr => j.typeCastExpression(
    j.parenthesizedExpression(yieldExpr),
    fixYieldType
  )

  /* This is kinda nifty. It lets you operate on the union of multiple
   search operations. */
  function combineFindResults() {
    return j(_.reduce(arguments, (memo, i) => memo.concat(i.nodes()), []))
  }

  function ensureReturnType(src) {
    return combineFindResults(
      src.find(j.FunctionDeclaration, {generator: true}),
      src.find(j.FunctionExpression, {generator: true})
    )
    .forEach(path => {
      path.value.returnType = fixYieldType
    })
  }

  function castYieldToCustomType(src) {
    return src.find(j.YieldExpression)
    .filter(path => {
      return path.parent && (
        path.parent.value.type == 'VariableDeclarator' ||
        path.parent.value.type == 'AssignmentExpression'
      )
    })
    .forEach(path => {
      j(path).replaceWith(wrapYieldInTypeCast(path.value))
    })
  }

  let src = api.jscodeshift(fileInfo.source)
  ensureReturnType(src)
  castYieldToCustomType(src)

  return src.toSource()
}
