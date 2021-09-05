import * as acorn from 'acorn';
import { locate, Location } from 'locate-character';
import MagicString from 'magic-string';
import { AstContext } from '../../../Module';
import { Entity } from '../../Entity';
import { HasEffectsContext, InclusionContext } from '../../ExecutionContext';
import ChildScope from '../../scopes/ChildScope';
import Variable from '../../variables/Variable';
import { ExpressionEntity } from './Expression';


export const INCLUDE_PARAMETERS = 'variables' as const;
export type IncludeChildren = boolean | typeof INCLUDE_PARAMETERS;

export interface GenericEsTreeNode extends acorn.Node {
  [key: string]: any;
}

export interface Node extends Entity {
  annotations?: acorn.Comment[];
  context: AstContext;
  end: number;
  esTreeNode: GenericEsTreeNode;
  included: boolean;
  keys: string[];
  needsBoundaries?: boolean;
  parent: Node | { type?: string };
  preventChildBlockScope?: boolean;
  start: number;
  type: string;
  variable?: Variable | null;

  addExportedVariables(variable: Variable[], exportNamesByVariable: Map<Variable, string[]>): void;

  bind(): void;

  hasEffects(context: HasEffectsContext): boolean;

  include(context: InclusionContext, _includeChildrenRecursively: IncludeChildren): void;

  includeAsSingleStatement(
    context: InclusionContext,
    _includeChildrenRecursively: IncludeChildren
  ): void;

  render(code: MagicString, options: RenderOptions, nodeRenderOptions?: NodeRenderOptions): void;

  shouldBeIncluded(context: InclusionContext): boolean;
}

export type StatementNode = Node;

export interface ExpressionNode extends ExpressionEntity, Node {}

export class NodeBase extends ExpressionEntity implements ExpressionNode {
  annotations?: acorn.Comment[];
  context: AstContext;
  end!: number;
  esTreeNode: acorn.Node;
  keys: string[];
  parent: Node | { context: AstContext; type: string };
  scope!: ChildScope;
  start!: number;
  type!: keyof typeof NodeType;

  protected deoptimized?: boolean

  constructor(
    esTreeNode: GenericEsTreeNode,
    parent: Node | { context: AstContext; type: string },
    parentScope: ChildScope
  ) {
    super();
    this.esTreeNode = esTreeNode;
    this.keys = keys[esTreeNode.type] || getAndCreateKeys(esTreeNode);
    this.parent = parent;
    this.context = parent.context;
    this.createScope(parentScope);
    this.parseNode(esTreeNode);
    this.initialise();
    this.context.
  }
}