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
  title = "MJ Fabrication | Industrial & Sheet Metal Fabrication Manufacturer & Exporter to Europe and the Gulf",
  description = "MJ Fabrication - industrial and sheet metal fabrication manufacturer and exporter. Custom metal manufacturing from your drawings and technical specifications, using Jindal Steel material. Supplying fabricated components to European and Gulf markets. 15+ years experience. GST registered.",
  keywords = "MJ Fabrication, industrial fabrication manufacturer, sheet metal fabrication exporter, metal fabrication exporter Europe, fabrication supplier Europe, metal fabrication Gulf Middle East, custom metal manufacturing, contract manufacturing fabrication, welded assemblies manufacturer, fabricated metal components exporter, Jindal Steel fabrication, build to drawing fabrication, metal enclosures and brackets manufacturer",
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
