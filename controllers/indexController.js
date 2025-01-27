const getHomepage = (req, res) => {
    res.render("homepage", {title: "Homepage"});
}

module.exports = {
    getHomepage
}