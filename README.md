# aiWordAssociations
# an AI Word Association sample app

![main workflow](https://github.com/ez-6/aiWordAssociations/actions/workflows/github-actions.yml/badge.svg?branch=main)


This is a sample app to run word associations using OpenAI API

## Usage

- The app allows the user to enter an input word or phrase
- Using the Open AI API, the app retreives and displays:
  - words associated with the given input
  - colors them in palette colors associated to the given input
  - uses a Google font that relates to the given input
- The result workds are displayed circuling the user input text
- Entering a new input and pressing 'Submit' will update the display to the new input
- Clicking on one of the associated words will also update the display and use that word as input

## Installation

The app requires [Express](https://expressjs.com/) to run.

It relies on a .env file present in the root dir with the OpenAi API Key to use

```dosini
OPENAI_API_KEY=<personal API key>
```

Install the dependencies using NPM and run the express server.

```sh
cd wordy
npm i
node express
```
#### Example
This is a possible result when entering 'joyful' as the input term.

![Example imaage](https://raw.githubusercontent.com/ez-6/aiWordAssociations/main/example-images/joyful.jpg)

