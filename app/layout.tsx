import StyledComponentsRegistry from "components/antdRegistry/AntdRegistry";
import "utilities/styles.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0, minimal-ui"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="cache-control" content="max-age=0" />
        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <meta httpEquiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
        <meta httpEquiv="pragma" content="no-cache" />
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" /> */}
        <meta name="msapplication-TileColor" content="#5d44f6" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body dir="ltr">
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
