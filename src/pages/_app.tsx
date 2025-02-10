import "@/styles/globals.css";
import type {AppProps} from "next/app";
import withNoSSR from "./withNoSSR";
import {AddressesProvider} from "@/features";
import {ModalProvider} from "@/widgets";
import '../shared/config/axiosConfig';
import {Layout, SpinnerProvider} from "@/entities";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SpinnerProvider>
      <ModalProvider>
        <AddressesProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AddressesProvider>
      </ModalProvider>
    </SpinnerProvider>
  );
};

export default withNoSSR(App);