import express from "express";
import usersRouter from "./routes/users";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);

app.use((req, res, next) => {
  res.status(404);

  return res.json({
    success: false,
    payload: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

// #6
app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
