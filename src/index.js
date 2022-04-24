async function main() {
  console.log("main")
}

document.addEventListener("DOMContentLoaded", () =>
  main()
    .then(() => console.log("READY."))
    .catch((err) => console.error(err))
);