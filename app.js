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
app.use("*", (req, res, next) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Commerce API</title>
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #fdfcfb, #e2d1c3);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: white;
          padding: 40px 30px;
          border-radius: 16px;
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 500px;
        }
        h1 {
          color: #333;
          margin-bottom: 20px;
          font-size: 28px;
        }
        p {
          font-size: 16px;
          color: #555;
          margin-bottom: 30px;
        }
        .btn {
          background: #28a745;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: bold;
          transition: background 0.3s ease;
          display: inline-block;
          margin: 5px;
        }
        .btn:hover {
          background: #1e7e34;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🛒 Welcome to the Commerce API</h1>
        <p>This API handles product management, orders, and users for e-commerce platforms.</p>
        <a href="https://github.com/maryam958/CommerceAPI" class="btn" target="_blank">📄 View README on GitHub</a>
      </div>
    </body>
    </html>
  `);
});


app.use(globalError);

connectDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
