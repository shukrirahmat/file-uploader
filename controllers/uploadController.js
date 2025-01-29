const getUploadForm = (req, res) => {
  res.render("uploadForm", { title: "Upload Form" });
};

module.exports = {
  getUploadForm,
};
