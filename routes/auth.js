const express = require('express');
const passport = require('../config/passport');

const router = express.Router();

router.get(
    "/github",
    passport.authenticate("github", {scope: ["user:email"]})
);

router.get('/github/callback', 
    passport.authenticate('github', {failureRedirect: "/"}),
    (req, res) =>{
        res.redirect('/profile');
    }
);

router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Not authenticated'
    });
  }

  res.json(req.user);
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.json({
        message: 'Logged out successfully'
      });
    });
  });
});

module.exports = router;