'use strict';

/* Simply change all 'var' declarations to 'let' declarations */
function changeVarToLet(j, src) {
  src.find(j.VariableDeclaration)
  .forEach(path => {
    path.value.kind = "let"
  })
}

module.exports = function(fileInfo, api) {
  let j = api.jscodeshift

  let src = api.jscodeshift(fileInfo.source)
  changeVarToLet(j, src)
  return src.toSource()
}
