{ mkYarnPackage }:

mkYarnPackage {
  src = ./.;

  FAUCET_NODE_URL = "https://sc-evm-testnet-faucet.sc-evm.ws";
  sc-evm_VM = "VM_Name";

  doCheck = false;
  distPhase = "true";

  patchPhase = ''
    substituteInPlace src/index.html --replace "{process.env.sc-evm_VM}" "$sc-evm_VM"
  '';

  buildPhase = ''
    export HOME="$NIX_BUILD_TOP"
    yarn run build
  '';

  installPhase = ''
    mv deps/$pname/dist $out
  '';
}
