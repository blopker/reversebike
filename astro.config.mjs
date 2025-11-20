import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { readdir } from "fs/promises";

const formatSlugToTitle = (input) => {
  if (!input) return input;

  // 1. Replace hyphens with spaces globally
  // 2. Match words (\w followed by non-whitespace \S*)
  // 3. Transform: First char upper, remainder lower
  return input
    .replace(/-/g, " ")
    .replace(
      /\w\S*/g,
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    );
};

async function autogenSections() {
  const sections = (
    await readdir("./src/content/docs/", {
      withFileTypes: true,
    })
  )
    .filter((x) => x.isDirectory())
    .map((x) => x.name);
  return sections.map((x) => {
    return {
      label: formatSlugToTitle(x),
      autogenerate: {
        directory: x,
        collapsed: true,
      },
    };
  });
}
const sidebar = await autogenSections();

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Reverse Bike",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar,
      // sidebar: [
      //   {
      //     label: "Guides",
      //     items: [
      //       // Each item here is one entry in the navigation menu.
      //       { label: "Example Guide", slug: "guides/example" },
      //     ],
      //   },
      //   {
      //     label: "Reference",
      //     autogenerate: { directory: "reference" },
      //   },
      // ],
    }),
  ],
});
