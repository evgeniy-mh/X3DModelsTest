class X3DModel {
  constructor(name) { this.name = name; }

  getX3DModelName() { return this.name + ".x3d"; }

  getModelDescription() { return this.name + ".html" }
}
