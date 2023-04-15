import Head from "next/head";
import styles from "./index.module.css";
import { callApi } from "@/utilFunction";
import { processIDs } from "@/config";
import useSwr from "swr";
import CurrentLocationInfo from "@/UI/CurrentLocationInfo";
import { TailSpin } from "react-loader-spinner";
// @ts-ignore
import { CSSTransition, TransitionGroup } from "react-transition-group";

const fetcher = async () => {
  const res = await callApi(processIDs?.getcurrentlocationweather, {});
  return res;
};

export default function HomePage() {
  const {
    data: res,
    isLoading,
    error,
  } = useSwr(processIDs?.getcurrentlocationweather, fetcher, {
    refreshInterval: 60000,
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
                color="black"
                ariaLabel="tail-spin-loading"
                radius={1}
                wrapperClass={styles?.loading}
                visible={true}
              />
            ) : (
              <div className={styles?.page}>
                <CurrentLocationInfo currentLocationData={res} />
              </div>
            )}
          </main>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}
