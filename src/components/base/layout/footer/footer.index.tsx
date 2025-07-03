import styles from "./footer.module.scss";

export default function FooterComp() {
  return (
    <footer className={`${styles["footer"]}`}>
      <div className={`main-content`}>
        <div className={`footer__content`}>footer</div>
      </div>
    </footer>
  );
}
