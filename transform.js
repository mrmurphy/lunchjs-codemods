'use strict';

/* Simply change all 'var' declarations to 'let' declarations */
function changeVarToLet(j, src) {
  src.find(j.VariableDeclaration)
  .forEach(path => {
    path.value.kind = "let"
  })
}

/* Change all ocurrances of the variable 'target' to 'son' */
function targetToSon(j, src) {
  src.find(j.Identifier)
  .filter(path => {
    return path.value.name == "target"
  })
  .forEach(path => {
    path.value.name = "son"
  })
}

module.exports = function(fileInfo, api) {
  let j = api.jscodeshift

  let src = api.jscodeshift(fileInfo.source)
  changeVarToLet(j, src)
  targetToSon(j, src)
  return src.toSource()
}
