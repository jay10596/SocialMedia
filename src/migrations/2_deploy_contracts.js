/* eslint-disable no-undef */
const SocialMedia = artifacts.require("SocialMedia");

module.exports = function (deployer) {
    deployer.deploy(SocialMedia);
};
