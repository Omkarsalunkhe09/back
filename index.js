const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./modals/user.modal");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://ok1234:ok1234@cluster0.hvjws.mongodb.net/Database?retryWrites=true&w=majority"
);

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ staus: "ok" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }

  //   const isPasswordValid = await bcrypt.compare(
  //     req.body.password,
  //     user.password
  //   );

  //   if (isPasswordValid) {
  //     const token = jwt.sign(
  //       {
  //         name: user.name,
  //         email: user.email,
  //       },
  //       "secret123"
  //     );

  //     return res.json({ status: "ok", user: token });
  //   } else {
  //     return res.json({ status: "error", user: false });
  //   }
});

app.listen(1234, () => {
  console.log("Server started on 1234");
});
