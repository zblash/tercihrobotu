import app from './app';
import * as http from 'http';
import * as fs from 'fs';

const PORT = parseInt(process.env.PORT, 10) || 5000;

http.createServer(app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
