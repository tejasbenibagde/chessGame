const requestHandler = (req, res, next) => {
  const filename = req.url;

  switch (filename.substring(filename.lastIndexOf(".") + 1)) {
    case "html":
    case "htm":
    case "ejs":
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      break;
    case "js":
      res.setHeader("Content-Type", "application/javascript; charset=UTF-8");
      break;
    case "css":
      res.setHeader("Content-Type", "text/css; charset=UTF-8");
      break; // Add break here
    case "svg":
      res.setHeader("Content-Type", "image/svg+xml");
      break; // Add break here
    default:
      res.setHeader("Content-Type", "application/octet-stream");
      break;
  }

  next();
};

export default requestHandler;
