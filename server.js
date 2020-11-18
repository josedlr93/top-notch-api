import app from './src/app.js';

import { connect } from './src/lib/database.js';

connect();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Running - Port: ${PORT}`);
});