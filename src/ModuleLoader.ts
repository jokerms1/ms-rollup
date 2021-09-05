import Module, { DynamicImport } from './Module';
import { Queue } from './utils/queue';

export interface UnresolvedModule {
  filename: string | null;
  id: string;
  importer: string | undefined;
  name: string | null;
}

export class ModuleLoader {
  private readonly hasModuleSideEffects: HasModuleSideEffects;
  private readonly implicitEntryModules = new Set<Module>();
  private readonly indexedEntryModules: { index: number; module: Module }[] = [];
  private latestLoadModulesPromise: Promise<unknown> = Promise.resolve();
  private nextEntryModuleIndex = 0;
  private readQueue = new Queue();

  constructor(
    private readonly graph: Graph,
    
  )
}