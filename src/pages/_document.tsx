import createEmotionServer from "@emotion/server/create-instance";
import { AppType } from "next/app";
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import * as React from "react";

import { createEmotionCache } from "@/theme/emotion-cache";

import { MyAppProps } from "./_app";

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

const documentStyles = `
  html {
    @media screen and (min-width: 1024px) {
      scroll-padding-top: 110px;
    }
    scroll-padding-top: 30px;
  }
`;

// See https://github.com/mui/material-ui/blob/master/examples/material-next-ts/pages/_app.tsx.
export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html style={{ scrollBehavior: "smooth" }}>
      <Head>
        <style>{documentStyles}</style>
        {/* PWA primary color, background of the page on Safari (cobalt[600]). */}
        <meta name="theme-color" content="2f4356" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* The following lines need to be in sync with storybook/main.js:previewHead */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body style={{ position: "relative" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
