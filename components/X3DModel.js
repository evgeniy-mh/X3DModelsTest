class X3DModel {
  constructor(name, rusName) {
    this.name = name;
    this.rusName = rusName;
  }

  getX3DModelName() { return this.name + ".x3d"; }

  getModelDescription() { return this.name + ".html" }
}
