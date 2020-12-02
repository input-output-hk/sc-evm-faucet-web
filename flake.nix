{
  description = "Web interface for Mantis Faucet";

  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    let
      name = "mantis-faucet-web";
      systems = [ "x86_64-linux" "x86_64-darwin" ];
      overlay = final: prev: {
        ${name}.defaultPackage = final.callPackage ./package.nix {};
      };

      simpleFlake = flake-utils.lib.simpleFlake {
        inherit name systems overlay self nixpkgs;
      };
    in simpleFlake // {
      hydraJobs = self.packages;
      inherit overlay;
    };
}
