# Dial-Out

  This app shows how to connect to an OpenTok session, publish a stream, subscribe to **multiple streams**, and use OpenTok SIP Interconnect with Nexmo to call a phone number.

## Configuring the application

Before running the application, you need to configure the following credentials:
  * OpenTok
    * OpenTok API Key
    * OpenTok API Secret
  * Nexmo
    * Nexmo Long Virtual number
    * Nexmo API Key
    * Nexmo API Secret

Copy the contents of `config.example.js` file into a new file called `config.js`.  

```
  module.exports = {
    apiKey: '', // TokBox apiKey
    apiSecret: '', // TokBox apiSecret
    sip: {
      from: '', // Nexmo Long virtual number in xxxxxx@nexmo.com format
      username: '', // Nexmo apiKey
      password: '', // Nexmo apiSecret
  };
```

You should use your OpenTok Key and Secret as the `apiKey` and `apiSecret` values and your Nexmo API Key as the sip `username` and Nexmo API Secret as the sip `password`.

## Setting up OpenTok & Nexmo projects
  For OpenTok:
  * Create an API Project to get the API Key and Secret.

  For Nexmo:
  * Sign up for a [Nexmo](https://www.nexmo.com/) account to get the API Key and Secret. You can also rent a Long virtual number to use it as FROM/CLI. This is not mandatory, but in some countries the calls can be rejected by our downstream carriers if no CLI (Call Line identity) is specified as we explain in [this article](https://help.nexmo.com/hc/en-us/articles/204015273-Does-Nexmo-support-CLI-Caller-ID-for-my-voice-calls-#:~:text=When%20using%20any%20of%20the,as%20your%20CLI%2FCaller%20ID.&text=CLI%20for%20in%2Dcountry%20originating,all%20of%20our%20virtual%20numbers.)

## Starting the application
`npm start`
