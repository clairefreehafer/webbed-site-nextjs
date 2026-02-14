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
  const filesToDelete = new FormData();

  for (const file of listResponseJson.files) {
    if (!fs.existsSync(`./out/${file.path}`)) {
      filesToDelete.append("filenames[]", file.path);
    }
  }

  const numberOfFiles = filesToDelete.getAll("filenames[]").length;

  if (numberOfFiles === 0) {
    console.log("no neocities files to prune");
    return;
  }

  console.log(`found ${numberOfFiles} file(s) to delete...`);

  const deleteResponse = await fetch("https://neocities.org/api/delete", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${NEOCITIES_USERNAME}:${NEOCITIES_PASSWORD}`)}`,
    },
    body: filesToDelete,
  });

  const deleteResponseJson = await deleteResponse.json();

  if (!deleteResponse.ok) {
    console.error(`❌ problem deleting files: ${deleteResponseJson.message}`);
  } else {
    console.log(`✅ ${deleteResponseJson.message}`);
  }
})();
