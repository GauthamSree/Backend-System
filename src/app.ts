import express, { Request, Response } from 'express';
import UserRoutes from "./routes/user.js";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        "message": "Hello World!"
    })
});

app.use('/api/', UserRoutes);

export default app;