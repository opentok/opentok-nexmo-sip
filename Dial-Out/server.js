const express = require('express');
const OpenTok = require('opentok');
const config = require('./config');

const app = express();

app.use(express.static(`${__dirname}/public`));

const OT = new OpenTok(config.apiKey, config.apiSecret);

/**
   * generateToken is used to create a token for a user
   * @param {String} sessionId
   * @param {String} sipTokenData
*/

const generateToken = (sessionId, sipTokenData = '') => OT.generateToken(sessionId, {
  role: 'publisher',
  data: sipTokenData,
});

/**
   * renderRoom is used to render the ejs template
   * @param {Object} res
   * @param {String} sessionId
   * @param {String} token
   * @param {String} roomId
*/

const renderRoom = (res, sessionId, token, roomId) => {
  res.render('index.ejs', {
    apiKey: config.apiKey,
    sessionId,
    token,
    roomId,
  });
};

/**
   * setSessionDataAndRenderRoom is used to create an OpenTok session & create a token
   * It's to be used only once per roomId
   * @param {Object} res
   * @param {String} roomId
*/

const setSessionDataAndRenderRoom = (res, roomId) => {
  OT.createSession({
    mediaMode: 'routed',
  }, (error, session) => {
    const token = generateToken(session.sessionId);
    app.set(roomId, session.sessionId);
    renderRoom(res, session.sessionId, token, roomId);
  });
};

/**
   * setSipOptions is used to set properties for the OT.dial API call
   * @returns {Object}
*/

const setSipOptions = () => ({
  auth: {
    username: config.sip.username,
    password: config.sip.password,
  },
  secure: false,
});

/**
   * When the room/:rid request is made, either renderRoom or setSessionDataAndRenderRoom
   * function is called depending on if the roomId exists in memory
*/

app.get('/room/:rid', (req, res) => {
  const roomId = req.params.rid;
  if (app.get(roomId)) {
    const sessionId = app.get(roomId);
    const token = generateToken(sessionId);
    renderRoom(res, sessionId, token, roomId);
  } else {
    setSessionDataAndRenderRoom(res, roomId);
  }
});

/**
   * When the dial-out get request is made, the dial method of the OpenTok Dial API is invoked
*/

app.get('/dial-out', (req, res) => {
  const { roomId, phoneNumber } = req.query;
  const sipTokenData = `{"sip":true, "role":"client", "name":"'${phoneNumber}'"}`;
  const sessionId = app.get(roomId);
  const token = generateToken(sessionId, sipTokenData);
  const options = setSipOptions();
  const sipUri = `sip:${phoneNumber}@sip.nexmo.com`;
  OT.dial(sessionId, token, sipUri, options, (error, sipCall) => {
    if (error) {
      res.status(400).send('There was an error dialing out');
    } else {
      app.set(phoneNumber, sipCall.connectionId);
      res.json(sipCall);
    }
  });
});

/**
   * When the hang-up get request is made, the forceDisconnect method of the OpenTok API is invoked
*/
app.get('/hang-up', (req, res) => {
  const { roomId, phoneNumber } = req.query;
  const connectionId = app.get(phoneNumber);
  if (app.get(roomId)) {
    const sessionId = app.get(roomId);
    OT.forceDisconnect(sessionId, connectionId, (error) => {
      if (error) {
        res.status(400).send('There was an error hanging up');
      } else {
        res.status(200).send('Ok');
      }
    });
  } else {
    res.status(400).send('There was an error hanging up');
  }
});


const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`listening on port ${port}`));