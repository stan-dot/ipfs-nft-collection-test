

## IPFS tasks
- [x] Run a local node of IPFS
- [x] Upload 10 images to this node

## descriptions and API
- [x] Create JSON metadata descriptions for all 10 images
- [x] Make a GET method in the API to get the metadata by id

## frontend
- [x] create a React frontend - 
- [x] restructure dashboard and Blockchain service to be DRY, it's terrible now
- [x] make it work - very hard to do, turns out

## NFT bit
- [ ] write Soldity contract with tokens implementing ERC20
- [ ] use the scripts to deploy (will need API keys), then check on etherscan
- [ ] Deploy NFTCollection contract - with ethers library, should be straightforward 
- [ ] mint 10 NFTs - using script as well

## blockchain - API connection - caching the blockchain data
- [ ] assign the API endpoint to the token URI
- [ ] Integrate NFT Collection contract and APIs to display NFTs metadata and images

## frontend extra
- [ ] provide wallet functions in the frontend to buy, transfer, allow, transfer from and burn NFTs
- [ ] Implement a feature for importing a wallet by pasting a seed phrase of private key as an alternative to creating a new one


# dev logs
## 16.07 Saturday
- setup
- need to reconfigure the ipfs to be running @ 5001
- add the deployment

## 17.07 Sunday
- ipfs config done, files uploaded
`ls *.jpg | while read i; do cp template.json ${i:0:(-4)}.json ; done;`
automated bash command

## 18.07 Monday
trying to make the contract work