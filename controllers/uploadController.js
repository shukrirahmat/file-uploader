const getUploadForm = (req, res) => {
  res.render("uploadForm", { title: "Upload Form" });
};

const uploadSuccess = (req, res) => {
  console.log(req.file.originalname)
  console.log(req.file.size);

  res.render("uploadSuccess", { title: "Upload Successful" } )
}

module.exports = {
  getUploadForm,
  uploadSuccess
};
