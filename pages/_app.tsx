import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { DataProvider } from "@/lib/Context";
import { EthosConnectProvider } from "ethos-connect";
import { Chain } from "ethos-connect";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <DataProvider>
        <EthosConnectProvider
          ethosConfiguration={{
            chain: Chain.SUI_MAINNET,
            network: "https://fullnode.mainnet.sui.io:443/",
            hideEmailSignIn: true, // defaults to false
          }}
        >
          <Component {...pageProps} />
        </EthosConnectProvider>
      </DataProvider>
    </Layout>
  );
};

export default App;
