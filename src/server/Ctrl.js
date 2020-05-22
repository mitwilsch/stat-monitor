const express = require('express');
const Utils = require('./Utils');

const helloWorld = (req, res) => {
  return res.json('This is the server');
};

const status = async (req, res) => {
  const data = await Utils.getStats();

  return res.json(data);
};
module.exports = { helloWorld, status };
