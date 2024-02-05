import { Router } from "express";

export default function (router: Router): void {
  router.get("/", (req, res) => {
    res.send("Generating Token");
  });
}
