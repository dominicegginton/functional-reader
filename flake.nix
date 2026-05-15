{
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs, ... }:
    let
      # import nixpkgs lib
      inherit (nixpkgs) lib;

      # support all Linux systems that the nixpkgs flake exposes
      systems = lib.intersectLists lib.systems.flakeExposed lib.platforms.linux;

      # get pkgs for all systems
      forAllSystems = lib.genAttrs systems;

      # pkgs for all systems
      nixpkgsFor = forAllSystems (system: import nixpkgs {
        inherit system;
        overlays = [ self.outputs.overlays.default ];
      });
    in
    {
      # formatter for flake
      formatter = forAllSystems (system: nixpkgsFor.${system}.nixpkgs-fmt);

      # functional-reader package overlay
      overlays.default = final: _: {
        functional-reader = final.callPackage ./default.nix { };
      };

      # functional-reader packages for all systems
      packages = forAllSystems (system: {
        default = nixpkgsFor.${system}.functional-reader;
      });
    };
}
