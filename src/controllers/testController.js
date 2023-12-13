const test = async (req, res) => {
  console.log("inside test() controller");
  return res.status(200).json({ text: "test success" });
};

module.exports = {
  test,
};
