import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { generateSidebar } from "./sidebar.mjs";

const sidebar = await generateSidebar();

// https://astro.build/config
export default defineConfig({
  site: "https://reverse.bike",
  integrations: [
    starlight({
      title: "Reverse Bike",
      favicon: "/rs73-square.png",
      logo: {
        src: "./src/assets/rs73.png",
      },
      editLink: {
        baseUrl: "https://github.com/blopker/reversebike/edit/main/",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/blopker/reversebike",
        },
      ],
      sidebar,
    }),
  ],
});
