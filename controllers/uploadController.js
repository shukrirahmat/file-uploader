const getUploadForm = (req, res) => {
  res.render("uploadForm", { title: "Upload Form" });
};

const uploadSuccess = (req, res) => {
  res.render("uploadSuccess", { title: "Upload Successful" } )
}

module.exports = {
  getUploadForm,
  uploadSuccess
};
