import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import Modal from "react-modal";

import AuthLayout from "../components/AuthLayout";
import { PageComponent } from "../types";
import { ClassProvider } from "../components/context/ClassContext";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ClassProvider>
        {(Component as PageComponent<{}>).auth ? (
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ClassProvider>
    </Provider>
  );
}

export default MyApp;
