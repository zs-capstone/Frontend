import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import * as mixin from "../styles/mixin";
import * as media from "../styles/media";
import color from "../styles/color";
import GlobalStyle from "../styles/GlobalStyle";
import React, { useEffect, useState } from "react";
import { Hydrate, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "react-query/devtools";
import { CookiesProvider } from "react-cookie";
import client from "../react-query/queryClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Toast from "../components/atoms/ui/Toast/Toast";
import Layout from "../components/organisms/layout/Layout";
import Head from "next/head";
import Script from "next/script";
import * as gtag from "../gtag";
import { iconUrl } from "../axiosInstance/constants";

const theme = { color, mixin, media };

declare global {
  interface Window {
    kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(client);

  const router = useRouter();

  useEffect(() => {
    return () => toast.dismiss();
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Hydrate state={pageProps.dehydratedState}>
            <CookiesProvider>
              <Layout>
                <Script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS}`}
                />
                <Script
                  id="gtag-init"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS}', {
                      page_path: window.location.pathname,
                    });
                  `,
                  }}
                />
                <Script
                  strategy="afterInteractive"
                  src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                />
                <Script
                  id="gtag-init"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtag.GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                  }}
                />
                <Head>
                  <title>여러다임</title>
                  <meta
                    name="description"
                    content="행동 피드백 분석을 활용한 트래블러 여행 메이커 서비스"
                  />
                  <meta property="og:title" content={"여러다임"} />
                  <meta property="og:type" content="website" />
                  <meta property="og:image" content={iconUrl("logo_emblem")} />
                </Head>
                <Component {...pageProps} />
              </Layout>
              <Toast />
            </CookiesProvider>
          </Hydrate>
          <ReactQueryDevtools />
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
