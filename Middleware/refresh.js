const { exec } = require("child_process");

module.exports = (req, res) => {
  exec("git pull origin master", (error) => {
    if (error) {
      console.error(`Error executing git pull: ${error.message}`);
      console.error(`Error executing git pull: ${error}`);
      return res.status(500).send("Failed to execute git pull");
    }
    console.log("Git pull successful");
    res.send("Git pull successful");
  });
};