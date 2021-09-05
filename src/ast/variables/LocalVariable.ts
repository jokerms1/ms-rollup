import Module from "module";
import { AstContext } from "../../Module";
import { ExpressionEntity } from "../nodes/shared/Expression";
import { PathTracker } from "../utils/PathTracker";
import Variable from "./Variable"


export default class LocalVariable extends Variable {
  calledFromTryStatement = false;
  declarations: (Identifier | ExportDefaultDeclaration)[];
  init: ExpressionEntity | null;
  module: Module;

  protected deoptimizationTracker: PathTracker;
  private additionalInitializer: ExpressionEntity[] | null = null;
  private expressionsToBeDeoptimized: DeoptimizableEntity[] = []

  constructor(
    name: string,
    declarator: Identifier | ExportDefaultDeclaration | null,
    init: ExpressionEntity | null,
    context: AstContext
  ) {
    super(name);
    this.declarations = declarator ? [declarator] : [];
    this.init = init;
    this.deoptimizationTracker = context.deoptimizationTracker
  }
}