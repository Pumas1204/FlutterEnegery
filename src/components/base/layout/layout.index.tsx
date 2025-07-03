import FooterComp from "./footer/footer.index";
import HeaderComp from "./header/header.index";
import styles from "./layout.module.scss";

export default function LayoutComp(props: React.PropsWithChildren) {
  return (
    <main className={`${styles["container"]} flex-column`}>
      <HeaderComp />
      {props.children}
      <FooterComp />
    </main>
  );
}
