import { Container, Flex, Heading, Link , Button} from '@chakra-ui/react';
import { ConnectWallet } from '@thirdweb-dev/react';

export default function Navbar() {
    return (

        <Container 
        bg={"purple.200"}
        maxW={"1200px"} 
        py={4}>
            <Flex 
            direction={"row"} 
            justifyContent="space-between">
                <Heading>
                    Pimp Me
                </Heading>
                <Flex 
                alignItems={"center"}>
                    <Button><Link href={"/"} mx={2}>Play</Link></Button>
                    <Button><Link href={"/shop"} mx={2}>Shop</Link></Button>
                </Flex>
                <ConnectWallet/>
            </Flex>

        </Container>
    )
};


