
import { HasEffectsContext } from "./ExecutionContext";
import { ObjectPath } from "./utils/PathTracker";



export interface Entity {}
export interface WritableEntity extends Entity {
  deoptimizePath(path: ObjectPath): void;
  hasEffectsWhenAssignedAtPath(path: ObjectPath, context: HasEffectsContext): boolean
}