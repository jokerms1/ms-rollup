import * as acorn from 'acorn';

import { PathTracker } from './ast/utils/PathTracker';
import { ModuleLoader } from './ModuleLoader';


export default class Graph {
  acornParser: typeof acorn.Parser;
  cachedModules: Map<string, ModuleJSON>;
  deoptimizationTracker: PathTracker;
  entryModules: Module[] = []
  moduleLoader: ModuleLoader;
  modulesById = new Map<string, Module | ExternalModule>();
  needsTreeshakingPass = false;
  phase: BuildPhase = BuildPhase.LOAD_AND_PARSE;
  pluginDriver: PluginDriver;
  scope: WindowOrWorkerGlobalScope;
  watchFiles: Record<string, true> = Object.create(null);
  watchMode = false;

  
}