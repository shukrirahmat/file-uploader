const getHomepage = (req, res) => {
    res.render("home", {title: "Homepage"});
} 

module.exports = {
    getHomepage,
}