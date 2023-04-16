import Head from "next/head";
import styles from "./index.module.css";
import { callApi } from "@/utilFunction";
import { processIDs } from "@/config";
import useSwr from "swr";
import CurrentLocationInfo from "@/UI/CurrentLocationInfo";
import { TailSpin } from "react-loader-spinner";
// @ts-ignore
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Link from "next/link";
import SearchSection from "@/UI/SearchSection";
import History from "@/UI/History";

const fetcher = async () => {
  const res = await callApi(processIDs?.getcurrentlocationweather, {});
  if (res?.returnCode) {
    return res;
  }
  return null;
};

export default function HomePage() {
  const {
    data: res,
    isLoading,
    error,
  } = useSwr(processIDs?.getcurrentlocationweather, fetcher, {
    refreshInterval: 60000,
    loadingTimeout: 10000,
  });
  return (
    <>
      <Head>
        <title>Real Weather</title>
        <meta name="description" content="Real Weather" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logo.png" />
      </Head>
      <TransitionGroup>
        <CSSTransition
          key={`css-transition-${isLoading ? "1" : "0"}`}
          timeout={500}
          classNames="transition"
        >
          <main className={styles.main}>
            {isLoading ? (
              <TailSpin
                height={50}
                width={50}
                color="var(--black)"
                ariaLabel="tail-spin-loading"
                radius={1}
                wrapperClass={styles?.loading}
                visible={true}
              />
            ) : res === undefined ? (
              <div className={styles?.nodata}>
                Network error! Please refresh
              </div>
            ) : (
              <div className={styles?.page}>
                <div className={styles?.grid}>
                  <CurrentLocationInfo currentLocationData={res} />
                  <SearchSection />
                  <History />
                </div>
                <div className={styles?.copyright}>&copy; Soumya Banerjee</div>
                <div className={styles?.credit}>
                  Powered by{" "}
                  <Link
                    href="https://www.weatherapi.com/"
                    title="Free Weather API"
                    className={styles?.link}
                    target="_blank"
                  >
                    WeatherAPI.com
                  </Link>
                </div>
              </div>
            )}
          </main>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}
