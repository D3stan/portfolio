import { Helmet } from "react-helmet-async";
import {
  META_TITLE,
  META_DESCRIPTION,
  META_KEYWORDS,
  META_AUTHOR,
  META_OG_IMAGE,
  META_SITE_URL,
  META_LANGUAGE,
  ANALYTICS_GA_ID,
  FONTS_URL,
  FAVICON,
} from "@/config";

/**
 * MetaTags Component
 * Dynamically manages all meta tags, title, and external resources
 */
export default function MetaTags() {
  const fullImageUrl = `${META_SITE_URL}${META_OG_IMAGE}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={META_LANGUAGE} />
      <title>{META_TITLE}</title>
      <meta name="description" content={META_DESCRIPTION} />
      <meta name="keywords" content={META_KEYWORDS.join(", ")} />
      <meta name="author" content={META_AUTHOR} />
      <link rel="icon" type="image/svg+xml" href={FAVICON} />

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONTS_URL} rel="stylesheet" />

      {/* Open Graph / Social Media */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={META_SITE_URL} />
      <meta property="og:title" content={META_TITLE} />
      <meta property="og:description" content={META_DESCRIPTION} />
      <meta property="og:image" content={fullImageUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={META_TITLE} />
      <meta name="twitter:description" content={META_DESCRIPTION} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_GA_ID}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ANALYTICS_GA_ID}');
        `}
      </script>
    </Helmet>
  );
}
