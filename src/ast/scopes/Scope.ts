import { AstContext } from "../../Module";
import { ExpressionEntity } from "../nodes/shared/Expression";
import Variable from "../variables/Variable"
import ChildScope from "./ChildScope"
export default class Scope {
  children: ChildScope[] = []
  variables = new Map<string, Variable>();

  addDeclaration(
    identifier: AlgorithmIdentifier,
    context: AstContext,
    init: ExpressionEntity | null,
    _isHoisted: boolean
  ): LocalVariable {
    const name = identifier.name;
    let variable = this.variables.get(name) as LocalVariable;
  }
}