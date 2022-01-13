module.exports = setup

const setup = () => {
    return (req, res, next) => {
        return next();
    };
}