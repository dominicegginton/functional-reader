{ lib, buildNpmPackage, nodejs, importNpmLock }:

let
  package = builtins.fromJSON (builtins.readFile ./package.json);
in

buildNpmPackage rec {
  pname = package.name;
  version = package.version;

  src = ./.;

  npmConfigHook = importNpmLock.npmConfigHook;
  npmDeps =  importNpmLock {
    npmRoot = src;
  };

  passthru = {
    #
  };

  meta = with lib; {
    description = "A purely functional dependency injection library for TypeScript";
    homepage = "https://github.com/dominicegginton/functional-reader";
  };
}
