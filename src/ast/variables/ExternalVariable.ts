import ExternalModule from "../../ExternalModule";

export default class EnternalVariable extends Variable {
  isNamespace: boolean;
  module: ExternalModule;
  referenced: boolean;

  constructor(module: ExternalModule, name: string) {
    super(name);
    this.module = module;
    this.isNamespace = name === '*';
    this.referenced = false;
  }

  addReference(identifier: Identifier): void {
    this.referenced = true
    if (this.name === 'default' || this.name === '*') {
      this.module.suggestName(identifier.name);
    }
  }
}