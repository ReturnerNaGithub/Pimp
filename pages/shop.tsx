import { NFTCollection, useContract, useNFTs } from "@thirdweb-dev/react";
import { SEXTOYS_ADDRESS } from "../const/addresses";
import {Text, Card, Box, Spinner, Button, Stack,Heading, Container, Flex, Link, SimpleGrid } from "@chakra-ui/react";
import NFT from "../Components/NFT";

export default function Shop () {
    const { contract } = useContract(SEXTOYS_ADDRESS);
    const { data:nfts } = useNFTs(contract); 
    return(
<Container maxW={"1200px"}>
<Flex direction ={"row"} justifyContent={"space-between"} alignItems={"center"}>
<Link
href="/"
>
<Button>Back</Button>
</Link>

</Flex> 
<Heading mt={"40px"}>Sex toy Shop</Heading>
<Text bg={"red.200"} textAlign={"center"} >Purchase sex toys with PIMP token and start wetting your pussy.</Text>
{!nfts ? (
<Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
<Spinner />

</Flex>
) : (
<SimpleGrid columns ={3} spacing={10}>
{nfts?.map((nftItem) =>(
    <NFT
    key={nftItem.metadata.id}
    nft={nftItem}
    />
))}

</SimpleGrid>
)}
</Container>
    )
}