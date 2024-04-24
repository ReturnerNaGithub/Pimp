import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react';
import { Polygon } from "@thirdweb-dev/chains";
import Navbar from "../Components/NavBar";
 
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={Polygon}
    clientId={"CLIENT_ID"}
    >
      <ChakraProvider> 
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
