// Tunnel to connect via SSH for mongo DB
const tunnel = require('tunnel-ssh');
const mongoose = require('mongoose');
const { init, error, success } = require('../util/color.log');

mongoose.Promise = global.Promise;

const config = {
  username: 'dvignite',
  dstPort: 22,
  host: '45.25.128.243',
  port: 22,
  password: 'DvAdmin!',
};

const init = () => {
  tunnel(config, err => {
    if (err) {
      error('Error: SSH connection failed.');
      console.error(err);
      throw new Error('SSH is not working');
    }
    init('connected to SHH');
    //TODO : Mongo URL
    mongoose
      .connect('localhost:27017')
      .then(() => {
        success('connected to mongo DB');
      })
      .catch(err => {
        error('Error: Mongo connection failed.');
        console.error(err);
      });
  });
};

module.exports = init;
