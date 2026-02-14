import fs from "fs";

const { NEOCITIES_USERNAME, NEOCITIES_PASSWORD } = process.env;

(async function deleteFiles() {
  const listResponse = await fetch("https://neocities.org/api/list", {
    headers: {
      Authorization: `Basic ${btoa(`${NEOCITIES_USERNAME}:${NEOCITIES_PASSWORD}`)}`,
    },
  });
  const listResponseJson = await listResponse.json();

  // always delete entire _next folder
  const filesToDelete = [];

  for (const file of listResponseJson.files) {
    if (!fs.existsSync(`./out/${file.path}`)) {
      filesToDelete.push(file.path);
    }
  }

  console.log(`found ${filesToDelete.length} files to prune from neocities...`);

  const deleteResponse = await fetch("https://neocities.org/api/delete", {
    headers: {
      Authorization: `Basic ${btoa(`${NEOCITIES_USERNAME}:${NEOCITIES_PASSWORD}`)}`,
    },
    body: JSON.stringify(filesToDelete),
  });

  if (!deleteResponse.ok()) {
    console.error(`❌ problem deleting files: ${await deleteResponse.text()}`);
  } else {
    console.log(`it worked`);
  }
})();
