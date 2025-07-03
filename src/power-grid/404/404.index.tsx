"use client";
import styles from "./404.module.scss";
import { Button, Result } from "antd";
import Image from "next/image";
import errorState from "assets/images/404.svg";
import { useRouter } from "next/navigation";

const Error404Comp: React.FC = () => {
  const router = useRouter();

  return (
    <div className={`${styles["error-404"]} m-auto`}>
      <Result
        icon={
          <Image
            className={styles.image}
            src={errorState}
            alt="error image"
            height={300}
          />
        }
        title={<p>The requested page was not found.</p>}
        subTitle={
          <p>
            There is no page matching the address you requested. Please check
            the address and try again.
          </p>
        }
        extra={
          <Button
            key={"sada"}
            color="primary"
            variant="solid"
            onClick={() => router.back()}
          >
            Back
          </Button>
        }
      />
    </div>
  );
};
export default Error404Comp;
