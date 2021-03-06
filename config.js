const PORT = process.env.PORT || 8080;

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

module.exports = { PORT, HTTP_STATUS_CODES, CLIENT_ORIGIN };
