import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });
import express from "express";
import morgan from "morgan";
import * as indexRouter from "./src/modules/index.router.js";
import connectDB from "./DB/connection.js";
import { globalError } from "./src/services/asyncHandler.js";
const app = express();

const port = process.env.PORT || 5000;
const baseUrl = process.env.BASEURL;

app.use(express.json());
app.use(morgan("common"));

app.use(`${baseUrl}/auth`, indexRouter.authRouter);
app.use(`${baseUrl}/user`, indexRouter.userRouter);
app.use(`${baseUrl}/category`, indexRouter.categoryRouter);
app.use(`${baseUrl}/subCategory`, indexRouter.subcategoryRouter);
app.use(`${baseUrl}/brand`, indexRouter.brandRouter);
app.use(`${baseUrl}/product`, indexRouter.productRouter);
app.use(`${baseUrl}/cart`, indexRouter.cartRouter);
app.use(`${baseUrl}/coupon`, indexRouter.couponRouter);
app.use(`${baseUrl}/order`, indexRouter.orderRouter);
app.use(`${baseUrl}/reviews`, indexRouter.reviewsRouter);


// app.use("*", (req, res, next) => {
//   res.send("Welcome to Commerce API");
// });

app.use("*", (req, res, next) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Commerce API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f5f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        h1 {
          color: #4CAF50;
          margin-bottom: 10px;
        }
        p {
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Welcome to Commerce API</h1>
        <p>Your API is running smoothly!</p>
      </div>
    </body>
    </html>
  `);
});


app.use(globalError);

connectDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
