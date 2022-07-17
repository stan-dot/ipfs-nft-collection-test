
## IPFS tasks
- [x] Run a local node of IPFS
- [x] Upload 10 images to this node

## descriptions and API
- [ ] Create JSON metadata descriptions for all 10 images
- [ ] Make a GET method in the API to get the metadata by id

## NFT bit
- [ ] write Soldity contract with tokens implementing ERC20
- [ ] Deploy NFTCollection contract 
- [ ] mint 10 NFTs

## blockchain - API connection - caching the blockchain data
- [ ] assign the API endpoint to the token URI
- [ ] Integrate NFT Collection contract and APIs to display NFTs metadata and images

## frontend
- [ ] create a React frontend
- [ ]  provide wallet functions in the frontend to buy, transfer, allow, transfer from and burn NFTs
- [ ] Implement a feature for importing a wallet by pasting a seed phrase of private key as an alternative to creating a new one

### substeps for the frontend
- [ ] add blockservice - ethers wallet object
- [ ] add login with metamask
- [ ] 



# dev logs
## 16.07 Saturday
- setup
- need to reconfigure the ipfs to be running @ 5001
- add the deployment

## 17.07 Sunday
- ipfs config done, files uploaded
`ls *.jpg | while read i; do cp template.json ${i:0:(-4)}.json ; done;`
automated bash command