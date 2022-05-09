function capitalize(str) {
    return str.substr(0, 1).toUpperCase() + str.substring(1);
}
module.exports = {
    capitalize: capitalize,
};