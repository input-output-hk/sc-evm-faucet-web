{ mkYarnPackage }:

mkYarnPackage {
  src = ./.;

  FAUCET_NODE_URL = "https://mantis-testnet-faucet.mantis.ws";

  doCheck = false;
  distPhase = "true";

  buildPhase = ''
    export HOME="$NIX_BUILD_TOP"
    yarn run build
  '';

  installPhase = ''
    mv deps/$pname/dist $out
  '';
}
