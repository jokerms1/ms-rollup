import { Entity } from "./Entity";
import { DiscriminatedPathTracker, PathTracker } from "./utils/PathTracker";


interface ExecutionContextIgnore {
  breaks: boolean;
  continues: boolean;
  labels: Set<string>;
  returnYield: boolean;
}

interface ControlFlowContext {
  brokenFlow: number;
  includedLabels: Set<string>;
}

export interface InclusionContext extends ControlFlowContext {
  includedCallArguments: Set<Entity>;
}

export interface HasEffectsContext extends ControlFlowContext {
  accessed: PathTracker;
  assigned: PathTracker;
  brokenFlow: number;
  called: DiscriminatedPathTracker;
  ignore: ExecutionContextIgnore;
  instantiated: DiscriminatedPathTracker;
  replacedVariableInits: Map<ThisVariable, Expression>
}