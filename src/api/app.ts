import express from 'express';
import { Request, Response } from 'express';
import { generateLobbyCode } from './routes/lobby';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

app.get('/lobbycode', (req: Request, res: Response) => {
    res.send(generateLobbyCode())
})


app.listen(2000, () => {
    console.log("App is running on port 2000!")
} )


module.exports = {
    app
}







