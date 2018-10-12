const express = require('express');

const app = express();

const ApiRouter = require('./routers/apiRouter');

app.use('/api/', ApiRouter);

const port = 3000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});