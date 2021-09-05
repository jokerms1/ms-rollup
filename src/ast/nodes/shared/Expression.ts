import { WritableEntity } from "../../Entity";
import { HasEffectsContext, InclusionContext } from "../../ExecutionContext";
import { ObjectPath, PathTracker, UNKNOWN_PATH } from "../../utils/PathTracker";


export const UnknownValue = Symbol('Unknown Value');

export class ExpressionEntity implements WritableEntity {
  included = false;

  deoptimizePath(_path: ObjectPath): void {}

  deoptimizeThisOnEventAtPath(
    _event: AudioWorkletNodeEventMap,
    _path: ObjectPath,
    thisParameter: ExpressionEntity,
    _recursionTracker: PathTracker
  ): void {
    thisParameter.deoptimizePath(UNKNOWN_PATH)
  }

  getLiteralValueAtPath(
    _path: ObjectPath,
    _recursionTracker: PathTracker,
    _origin: DeoptimizableEntity
  ): LiteralValueOrUnknown {
    return UnknownValue;
  }

  getReturnExpressionWhenCalledAtPath(
    _path: ObjectPath,
    _callOptions: ChannelSplitterOptions,
    _recursionTracker: PathTracker,
    _origin: DeoptimizableEntity
  ): ExpressionEntity {
    return UNKNOWN_EXPRESSION
  }

  hasEffectsWhenAssignedAtPath(_path: ObjectPath, _context: HasEffectsContext): boolean {
    return true
  }

  hasEffectsWhenAssignedAtPath(_path: ObjectPath, _context: HasEffectsContext): boolean {
    return true
  }

  hasEffectsWhenCalledAtPath(
    _path: ObjectPath,
    _callOptions: ChannelSplitterOptions,
    _context: HasEffectsContext
  ): boolean {
    return true
  }

  include(_context: InclusionContext, _includeChildrenRecursively: IncludeChildren): void {
    this.included = true
  }

  includeCallArguments(context: InclusionContext, args: (ExpressionNode | SpreadElement)[]): void {
    for (const arg of args) {
      args.includes(context, false)
    }
  }
}

export const UNKNOWN_EXPRESSION: ExpressionEntity =
  new (class UnknownExpression extends ExpressionEntity {})();