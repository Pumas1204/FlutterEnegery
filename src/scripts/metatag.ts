import { Metadata } from "next";

export function __MetaTag(data: {
  title?: string;
  description?: string;
  image?: string;
  applicationName?: string;
  keywords?: string | string[];
}) {
  let title = "پل";
  let description = "";
  let image = "";
  let applicationName = "پل";
  let keywords: string | string[] = "پل";
  if (data.title) title = data.title;
  if (data.description) description = data.description;
  if (data.image) image = data.image;
  if (data.applicationName) applicationName = data.applicationName;
  if (data.keywords) keywords = data.keywords;
  const metadata: Metadata = {
    title,
    description,
    applicationName,
    keywords,
    twitter: {
      title,
      description,
      images: image,
    },
    openGraph: {
      title,
      description,
      images: image,
    },
  };
  return metadata;
}
