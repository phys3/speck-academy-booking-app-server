const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sessionRepository = require("./repositories/sessions");
const { DateTime } = require("luxon");
const cookieParser = require("cookie-parser");
const { PORT, CLIENT_ORIGIN } = require("./config");
const { HTTP_STATUS_CODES } = require("./enums");
const {
  hallsHandler,
  reservationsHandler,
  adminsHandler
} = require("./route-handlers");

const app = express();
app.use(cookieParser());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// Base routes
app.use(async (req, res, next) => {
  const { sessionId } = req.cookies;
  const session = await sessionRepository.getById(sessionId);
  const isAdmin =
    Boolean(session) &&
    DateTime.local() <= DateTime.fromJSDate(session.expiry_date);
  req.isAdmin = isAdmin;
  next();
});
app.use("/api/halls", hallsHandler);
app.use("/api/reservations", reservationsHandler);
app.use("/api/admins", adminsHandler);

app.use((req, res) =>
  res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
    message: "Invalid URL"
  })
);

app.use((err, req, res, next) => {
  res
    .status(err.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    .send({ message: err.message });
});

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}!`));
