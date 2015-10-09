# Codemods - Lunch JS Talk

This is a tiny sample repository to show off the technique of modifying source
code through its AST.

# Running

`npm install`

`npm run peek` - This will perform a dry run on the codemods in ./transform.js
and print the result to stdio. This is great for writing new mods.
`npm run` - This will run the mods and actually leave the source files changed
on disk. Don't worry! You can always discard the changes with git!

# Resources

[JS Codeshift](https://github.com/facebook/jscodeshift)

codeshift is the tool you will actually run. It provides a CLI, and it wraps the
next two libraries listed here with some convenience functions for finding nodes
in the tree.

[AST Types](https://github.com/benjamn/ast-types)

This repo is where you'll want to do all of your searching to find out how to
define new nodes. Here are some hints:

- Names that start with a lower-case letter (e.g. `variableDeclaration`) are
constructor functions and will construct a new node when called with arguments
- Names that start with an upper-case letter (e.g. `VariableDeclaration` are
objects, and can be passed to src.find() in order to find nodes of that same type)
- To find out how a constructor for a type should be called, search its name in
the ast-types codebase, and then find where `def` is called on the top-level of the
file with that typename as an argument. (example: https://github.com/benjamn/ast-types/blob/8baed603a84e4404f952f75fcf36a6a00a25495a/def/esprima.js#L8)

[Recast](https://github.com/benjamn/recast)

Not too much you need to learn about with Recast. It does a nice job of reconstructing
well formatted javascript from the AST.

[AST Explorer](http://felix-kling.de/esprima_ast_explorer/)

AST Explorer is a terribly valuable tool for figuring out how different parsers turn your
code into an AST. You'll definitely want to keep this at hand while writing new mods.
