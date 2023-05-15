import Head from "next/head";
import Heading from "@/components/Heading";
import StepsContainer from "@/components/StepsContainer";
import StepOne from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";
import StepThree from "@/components/StepThree";
import StepFour from "@/components/StepFour";
import NftImages from "@/components/NftImages";
import { ToastContainer } from "react-toastify";

export default function Home() {
 
  return (
    <>
      <Head>
        <title>Claim the role</title>
        <meta
          name="description"
          content={`Claim role by holders nfts`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap" rel="stylesheet"/>
      </Head>
      <main>
        <ToastContainer />
        <h1>Claim role by holders nfts <sup>Alpha</sup></h1>
        {/* <Heading
          text={`Claim role by holders nfts`}
        /> */}
        <div className="main-layout">
        <StepsContainer>
          <StepOne />
          <StepTwo />
          <StepThree handleSelectChange={function (event: string): void {
              throw new Error("Function not implemented.");
            } } />
          <StepFour/>
          </StepsContainer>

          <div className="data-container">
            <NftImages />
          </div>
          </div>
      </main>
    </>
  );
}
