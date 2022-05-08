import "./lib/components/index.js";

async function main() {
}

document.addEventListener("DOMContentLoaded", () =>
  main()
    .then(() => console.log("READY."))
    .catch((err) => console.error(err))
);
