# @danimydev/wolfy

Wolfram Alpha API wrapper built with TypeScript.

## Usage

Request your secret APP_ID [here](https://developer.wolframalpha.com/portal/myapps) and store it securely.

```typescript
import Wolfy from "wolfy";

const shortAnswersResult = await Wolfy.shortAnswers({
  appId: "YOUR_APP_ID",
  input: "2+2",
});

console.log(shortAnswersResult); // "4"

const spokenResult = await Wolfy.spokenResult({
  appId: "YOUR_APP_ID",
  input: "Hello",
});

console.log(spokenResult); // "Hello, human"
```

## License

[The Unlicense](https://unlicense.org/)
