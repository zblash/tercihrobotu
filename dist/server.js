"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http = require("http");
const PORT = parseInt(process.env.PORT, 10) || 5000;
http.createServer(app_1.default).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map