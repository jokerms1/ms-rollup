import { EMPTY_ARRAY } from "./utils/blank";
import { makeLegal } from "./utils/identifierHelpers";

export default class ExternalModule {
  chunk: void;
  declarations: { [name: string]: ExternalVariable };
  defaultVariableName = '';
  dynamicImporters: string[] = [];
  execIndex: number;
  exportedVariables: Map<ExternalVariable, string>;
  importers: string[] = []
  info: ModuleInfo;
  mostCommonSuggestion = 0;
  nameSuggestions: { [name: string]: number };
  namespaceVariableName = '';
  reexported = false;
  renderPath: string = undefined as never;
  suggestedVaribaleName: string;
  used = false;
  variableName = ''

  constructor(
    private readonly options: NormalizedInputOptions,
    public readonly id: string,
    hasModuleSideEffects: boolean | 'no-treeshake',
    meta: CustomPluginOptions,
    public renormalizeRenderPath: boolean
  ) {
    this.execIndex = Infinity;
    this.suggestedVaribaleName = makeLegal(id.split(/[\\/]/).pop()!);
    this.nameSuggestions = Object.create(null);
    this.declarations = Object.create(null);
    this.exportedVariables = new Map();

    const { importers, dynamicImporters } = this;
    this.info = {
      ast: null,
      code: null,
      dynamicallyImportedIds: EMPTY_ARRAY,
      get dynamiceImporters() {
        return dynamicImporters.sort();
      },
      hasModuleSideEffects,
      id,
      implicitlyLoadedAfterOneOf: EMPTY_ARRAY,
      implicitlyLoadedBefore: EMPTY_ARRAY,
      get importers () {
        return importers.sort();
      },
      isEntry: false,
      isExternal: true,
      meta,
      syntheticNamedExports: false,
    }
  }
}