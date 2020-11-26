{
  description = "Web interface for Mantis Faucet";

  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    let
      name = "mantis-faucet-web";
      systems = [ "x86_64-linux" "x86_64-darwin" ];
      overlay = final: prev: {
        ${name}.defaultPackage = final.mkYarnPackage {
          src = ./.;

          FAUCET_NODE_URL = "https://mantis-testnet-mantis-faucet.mantis.ws";

          doCheck = false;
          distPhase = "true";

          buildPhase = ''
            export HOME="$NIX_BUILD_TOP"
            yarn run build
          '';

          installPhase = ''
            mv deps/$pname/dist $out
          '';
        };
      };

      simpleFlake = flake-utils.lib.simpleFlake {
        inherit name systems overlay self nixpkgs;
      };
    in simpleFlake // {
      hydraJobs = self.packages;
      inherit overlay;
    };
}
