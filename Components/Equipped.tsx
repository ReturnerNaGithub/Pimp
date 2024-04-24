import { BasicNFTInput, MediaRenderer, Web3Button, useAddress, useContract, useContractMetadata, useContractRead, useNFT } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { PIMPME_ADDRESS, SEXTOYS_ADDRESS } from "../const/addresses";
import {Text, Card, Box,Flex, Stack } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
interface EquippedProps {
    tokenId: number;
};

export const Equipped = (props: EquippedProps) => {
const address = useAddress();

const { contract: pimpmeContract } = useContract(PIMPME_ADDRESS);
const { contract: sextoysContract } = useContract(SEXTOYS_ADDRESS);

const { data: nft } = useNFT(sextoysContract, props.tokenId);

const { data: claimableRewards } = useContractRead(
    pimpmeContract,
    "getStakeInfoForToken",
    [props.tokenId,address]
);

return(
    <Box>
{nft && (
    <Card className={styles.equipcontainer} p={5}>
<Flex>
<Box>
<MediaRenderer
src={nft.metadata.image}
height="80%"
width="80%"
/>
</Box>
<Stack spacing={1}>
    <Text fontSize={"2xl"} fontWeight={"bold"}>{nft.metadata.name}</Text>
<Text>Equipped: {ethers.utils.formatUnits(claimableRewards[0], 0)}</Text>
<Web3Button
contractAddress={PIMPME_ADDRESS}
action={(contract) => contract.call("withdraw", [props.tokenId, 1])}
className={styles.unequipbutton}
>Pull Out</Web3Button>

</Stack>


</Flex>
<Box mt={5}>
<Text>Claimable PIMP:</Text>
<Text>{ethers.utils.formatUnits(claimableRewards[1], 18)}</Text>
<Web3Button 
contractAddress={PIMPME_ADDRESS}
action={(contract) => contract.call("claimRewards", [props.tokenId])}
>Claim PIMP</Web3Button>

</Box>

    </Card>
)}

    </Box>
)

};