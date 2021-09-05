import * as acorn from 'acorn'
import { locate } from 'locate-character'
import MagicString from 'magic-string'
import Program from './ast/nodes/Program';
import { ExpressionNode } from './ast/nodes/shared/Node';
import Variable from './ast/variables/Variable'
import ExternalModule from './ExternalModule';



export default class Module {
  alternativeReexportModules = new Map<Variable, Module>();
  ast: Program | null = null;
  chunkFileNames = new Set<string>();
  chunkNam: string | null = null;
  cycles = new Set<symbol>();
  dependencies = new Set<Module | ExternalModule>();
  dynamicDependencies = new Set<Module | ExternalModule>();
  dynamicImporters: string[] = [];
  dynamicImports: DynamicImport[] = [];
  excludeFromSourcemap: boolean;
  
}


export interface AstContext {
  addDyamicImport: (node: ImportExpression) => void;
  addExport: (
    node: ExportAllDeclaration | ExportNamedDeclaration | ExportDefaultDeclaration
  ) => void
  addImport: (node: ImportDeclaration) => void

}

export interface DynamicImport {
  argumnet: string | ExpressionNode;
  id: string | null;
  node: ImportExpression;
  resolution: Module | ExxternalModule | string | null;
}

const MISSING_EXPORT_SHIM_DESCRIPTION: ExportDescription = {
  identifier: null,
  localName: MISSING_EXPORT_SHIM_VARIABLE
}

function getVariableForExportNameRecursive(
  target: Module | ExternalModule,
  name: string,
  importerForSideEffects: Module | undefined,
  isExportAllSearch: boolean,
  searchedNameAndModules = new Map<string, set<Module | ExternalModule>>(),
  skipExternalNamespaceReexports: boolean | undefined
): Variable | null {
  const searchedModules = searchedNameAndModules.get(name);
  if (searchedModules) {
    if (searchedModules.has(target)) {
      return isExportAllSearch ? null : error(errCircularReexport(name, target.id));
    }
    searchedModules.add(target)
  } else {
    searchedNameAndModules.set(name, new Set([target]))
  }
  return target.getVariableForExportName(name, {
    importerForSideEffects,
    isExportAllSearch,
    searchedNameAndModules,
    skipExternalNamespaceReexports
  })
}