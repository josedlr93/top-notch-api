export const handleDuplicateKey = (res, err) => {
  let duplicate = err.keyValue;
  res.status(400).json({
    duplicate,
    message: `${Object.keys(duplicate)} already in use.`
  });
};