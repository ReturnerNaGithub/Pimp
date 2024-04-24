import { MediaRenderer, Web3Button, useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";
import {NFT} from "@thirdweb-dev/sdk";
import { PIMPME_ADDRESS, SEXTOYS_ADDRESS } from "../const/addresses";
import {Text, Card, Box, SimpleGrid, Button, Stack, Link } from "@chakra-ui/react";

type Props = {
    nft: NFT[] | undefined;
};

export function Inventory({ nft }: Props ) {
const address = useAddress();
const { contract: sextoysContract } = useContract(SEXTOYS_ADDRESS);
const { contract: pimpmeContract } = useContract(PIMPME_ADDRESS);
   
async function stakeNFT(id: string) {
    if (!address){
        return;
    }
    
const isApproved = await sextoysContract?.erc1155.isApproved(
    address,
    PIMPME_ADDRESS,
);

if (!isApproved) {
    await sextoysContract?.erc1155.setApprovalForAll(
        PIMPME_ADDRESS,
        true,

    );
}
await pimpmeContract?.call("stake", [id, 1]);

};

if(nft?.length === 0) {
    return (

<Box>
<Text>No sex toys.</Text>
<Link
href="/shop"
>
<Button>Shop sex toys</Button>

</Link>


</Box>

    )
}

return (

<SimpleGrid columns={3} spacing={4}>
{nft?.map((nft) => (
<Card key={nft.metadata.id} p={5}>
<Stack alignItems={"center"}>
<MediaRenderer
src={nft.metadata.image}
height="100%"
width="100%"
/>
<Text>{nft.metadata.name}</Text>
<Web3Button
contractAddress={PIMPME_ADDRESS}
action={() => stakeNFT(nft.metadata.id)}
>Equip</Web3Button>


</Stack>


</Card>
))}

</SimpleGrid>

    );
};