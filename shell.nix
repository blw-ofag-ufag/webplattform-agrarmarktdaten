let
  pkgs = import <nixpkgs> { };
  nodejs = pkgs.nodejs-18_x;

in pkgs.mkShell {
  buildInputs = [
    pkgs.darwin.apple_sdk.frameworks.CoreServices
    pkgs.yarn
    nodejs
  ];
}