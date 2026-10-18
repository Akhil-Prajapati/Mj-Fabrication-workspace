import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  jsonLd?: object;
}

const SEO = ({
  title = "MJ Fabrication | Custom Metal Manufacturing & Industrial Fabrication Solutions",
  description = "MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. We work with customer drawings, technical specifications, and project needs to deliver practical and reliable fabrication solutions.",
  keywords = "MJ Fabrication, industrial fabrication, customized metal manufacturing, sheet metal fabrication, raw material supply Jindal Steel, custom manufacturing, build to drawing fabrication, metal enclosures and brackets",
  ogTitle,
  ogDescription,
  ogImage = "https://mjfabrication.in/img/mj-fabrication-og-image.jpg",
  canonicalUrl = "https://mjfabrication.in/",
  jsonLd,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    }

    // Update Open Graph tags
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute("content", ogTitle || title);
    }

    const ogDescMeta = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescMeta) {
      ogDescMeta.setAttribute("content", ogDescription || description);
    }

    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute("content", ogImage);
    }

    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", canonicalUrl);
    }

    // Add JSON-LD structured data if provided
    if (jsonLd) {
      const existingJsonLd = document.querySelector(
        'script[type="application/ld+json"][data-component="seo"]'
      );
      if (existingJsonLd) {
        existingJsonLd.remove();
      }

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-component", "seo");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup JSON-LD on unmount
      const jsonLdScript = document.querySelector(
        'script[type="application/ld+json"][data-component="seo"]'
      );
      if (jsonLdScript) {
        jsonLdScript.remove();
      }
    };
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    canonicalUrl,
    jsonLd,
  ]);

  return null; // This component doesn't render anything
};

export default SEO;
