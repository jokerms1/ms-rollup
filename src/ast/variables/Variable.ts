import Module from "module";
import ExternalModule from "../../ExternalModule";
import { HasEffectsContext } from "../ExecutionContext";
import { ExpressionEntity } from "../nodes/shared/Expression";
import { ObjectPath } from "../utils/PathTracker";

export default class Variable extends ExpressionEntity {
  alwaysRendered = false;
  initReached = false;
  isId = false;
  isNamespace?: boolean;
  isReassigned = false;
  kind: string | null = null;
  module?: Module | ExternalModule;
  renderBaseName: string | null = null;
  renderName: string | null = null;

  constructor(public name: string) {
    super();
  }

  addReference(_identifier: Identifier): void {}

  getBaseVariableName(): string {
    return this.renderBaseName || this.renderName || this.name
  }

  getName(): string {
    const name = this.renderName || this.name
    return this.renderBaseName
      ? `${this.renderBaseName}${RESERVED_NAMES[name] ? `['${name}']`: `.${name}`}`
      : name;
  }

  hasEffectsWhenAssignedAtPath(path: ObjectPath, _context: HasEffectsContext): boolean {
    return path.length > 0;
  }

  include(): void {
    this.included = true;
  }

  markCalledFromTryStatement(): void {}

  setRenderNames(baseName: string | null, name: string | null): void {
    this.renderBaseName = baseName;
    this.renderName = name;
  }
}