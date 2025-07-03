"use client";
import styles from "./500.module.scss";
import { Button, Result } from "antd";
import Image from "next/image";
import errorStateLight from "assets/images/500.svg";
import { useRouter } from "next/navigation";

const Error500Comp: React.FC<{ reset: () => void; error?: any }> = (props) => {
  const router = useRouter();
  return (
    <div className={`${styles["container"]} m-auto`}>
      <Result
        icon={
          <Image
            className={styles.image}
            src={errorStateLight}
            alt="error image"
          />
        }
        title={<p>An error has occurred.</p>}
        subTitle={<p>Please try again later.</p>}
        extra={
          <>
            <Button
              color="primary"
              variant="solid"
              className="ph-6-i"
              key={"sada"}
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Button
              color="primary"
              variant="filled"
              className="ph-6-i"
              key={"0asdf0"}
              onClick={() => props.reset()}
            >
              Try again
            </Button>
          </>
        }
      />
    </div>
  );
};
export default Error500Comp;
