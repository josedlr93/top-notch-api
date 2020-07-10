export const handleDuplicateKey = (res, err) => {
  let duplicate = err.keyValue;
  console.log(duplicate);
  res.status(400).json({
    duplicate,
    message: `${Object.keys(duplicate)} already in use.`
  });
};