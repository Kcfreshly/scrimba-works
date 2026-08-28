import { startups } from "./data/data.js";

startups.map((startup) => {
  console.log(startup.name);
  console.log(startup.description);
});