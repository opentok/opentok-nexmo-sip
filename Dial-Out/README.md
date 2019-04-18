# Dial-Out

  This app shows how to connect to an OpenTok session, publish a stream, subscribe to **multiple streams**, and use OpenTok SIP Interconnect with Nexmo to call a phone number.

## Configuring the application

Before running the application, you need to configure the following credentials:
  * OpenTok
    * OpenTok API Key
    * OpenTok API Secret
  * Nexmo
    * Nexmo API Key
    * Nexmo API Secret

Copy the contents of `config.example.js` file into a new file called `config.js`.  

```
  module.exports = {
    apiKey: '', // TokBox apiKey
    apiSecret: '', // TokBox apiSecret
    sip: {
      username: '', // Nexmo apiKey
      password: '', // Nexmo apiSecret
  };
```

You should use your OpenTok Key and Secret as the `apiKey` and `apiSecret` values and your Nexmo API Key as the sip `username` and Nexmo API Secret as the sip `password`.

## Setting up OpenTok & Nexmo projects
  For OpenTok:
  * Create an API Project to get the API Key and Secret.

  For Nexmo:
  * Sign up for a [Nexmo](https://www.nexmo.com/) account to get the API Key and Secret.

## Starting the application
`npm start`