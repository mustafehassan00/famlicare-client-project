// Middleware to check if the user has admin privileges
const isAdmin = (req, res, next) => {
    // Check if the user is authenticated and if the user is an admin
    // req.isAuthenticated() should be correctly capitalized
    if (req.isAuthenticated() && req.user.is_admin){
        // If both conditions are true, proceed to the next middleware/function
        return next();
    }
    // If the user is not authenticated or not an admin, return a 403 Forbidden status
    // This prevents unauthorized access to certain routes
    res.status(403).json({message: 'Access denied'});
};

// Export the isAdmin middleware to be used in other parts of the application
module.exports = {isAdmin};