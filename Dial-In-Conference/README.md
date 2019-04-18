# Dial-In-Conference

  This app shows how to connect to an OpenTok session, publish a stream, subscribe to **multiple streams**, and use OpenTok SIP Interconnect with Nexmo to create an audio conference.

## Configuring the application

Before running the application, you need to configure the following credentials:
  * OpenTok
    * OpenTok API Key
    * OpenTok API Secret
  * Nexmo
    * Nexmo API Key
    * Nexmo API Secret
    * Nexmo Virtual Number

Copy the contents of `config.example.js` file into a new file called `config.js`.  

```javascript
module.exports = {
    apiKey: '', // TokBox apiKey
    apiSecret: '', // TokBox apiSecret
    sip: {
        username: '', // Nexmo apiKey
        password: '', // Nexmo apiSecret
    },
    conferenceNumber: '', // the Nexmo Virtual Number
    serverUrl: '', // your server URL
};
```

You should use your OpenTok Key and Secret as the `apiKey` and `apiSecret` values and your Nexmo API Key as the sip `username` and Nexmo API Secret as the sip `password`.

## Setting up OpenTok & Nexmo projects
  For OpenTok:
  * Create an API Project to get the API Key and Secret.

  For Nexmo:
  * Sign up for a [Nexmo](https://www.nexmo.com/) account to get the API Key and Secret.
  * Create a Voice Application and set the event and answer urls.
  * Purchace a Virtual number and forward all activity from the number to the Voice application you created.

## Starting the application
`npm start`