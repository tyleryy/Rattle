import express from 'express';
import { Request, Response } from 'express';
//

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

app.listen(2000, () => {
    console.log("App is running on port 2000!")
} )








