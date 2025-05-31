include .env

deploy:
	forge create --rpc-url ${SCROLL_SEPOLIA_RPC_URL} --private-key ${PRIVATE_KEY} src/Voting.sol:Voting --broadcast

deploy2:
	forge script ./script/Vault.s.sol:VaultScript --rpc-url ${SCROLL_SEPOLIA_RPC_URL} --private-key ${PRIVATE_KEY} --broadcast