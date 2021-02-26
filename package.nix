{ mkYarnPackage }:

mkYarnPackage {
  src = ./.;

  FAUCET_NODE_URL = "https://mantis-testnet-faucet.mantis.ws";
  MANTIS_VM = "VM_Name";

  doCheck = false;
  distPhase = "true";

  patchPhase = ''
    substituteInPlace src/index.html --replace "{process.env.MANTIS_VM}" "$MANTIS_VM"
  '';

  buildPhase = ''
    export HOME="$NIX_BUILD_TOP"
    yarn run build
  '';

  installPhase = ''
    mv deps/$pname/dist $out
  '';
}
