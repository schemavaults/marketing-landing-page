import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SchemaVaults",
    short_name: "SchemaVaults",
    description:
      "Type-safe data for AI agents, workflows, and apps. The graph database you can just talk to.",
    start_url: "/",
    icons: [
      {
        src: "/media/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/media/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    theme_color: "#fff",
    background_color: "#fff",
    display: "standalone",
  };
}
