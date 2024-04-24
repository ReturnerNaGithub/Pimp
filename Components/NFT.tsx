import { MediaRenderer, Web3Button, useActiveClaimCondition, useContract, useContractMetadata } from "@thirdweb-dev/react";
import {NFT} from "@thirdweb-dev/sdk";
import { SEXTOYS_ADDRESS } from "../const/addresses";
import {Text, Card } from "@chakra-ui/react";
import {ethers} from "ethers";


type Props = {
    nft: NFT;
};

export default function NFTComponent({ nft } : Props) {
const { contract } = useContract(SEXTOYS_ADDRESS);
const { data, isLoading } = useActiveClaimCondition(
    contract,
    nft.metadata.id,
);
    return (
<Card key={nft.metadata.id} overflow={"hidden"}>
<MediaRenderer
src={nft.metadata.image}
height="100%"
width="100%"
/>
<Text fontSize={"2xl"} fontWeight={"bold"} my={5} textAlign={"center"}>{nft.metadata.name}</Text>
{!isLoading && data ?(
<Text textAlign={"center"} my={5}>Cost: {ethers.utils.formatEther(data?.price)}{"" + data?.currencyMetadata.symbol}</Text>
):(
<Text>Wetting...</Text>
)}
<Web3Button
contractAddress= {SEXTOYS_ADDRESS}
action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
>Buy Here</Web3Button>

</Card>
    )
};