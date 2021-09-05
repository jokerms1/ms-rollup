import Variable from "../ast/variables/Variable";



export interface RenderOptions {
  compat: boolean;
  dynamicImportFunction: string | undefined;
  exportNamesByVariable: Map<Variable, string[]>;
  format: InternalModuleFormat;
  freeze: boolean;
  ident: string;
  namespaceToStringTag: boolean;
  outputPluginDriver: PluginDriver;
  varOrConst: 'var' | 'const';
}