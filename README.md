# Wolfy

Wolfy is an unofficial Wolfram Alpha API wrapper fully covered.

## Installation

TODO

## Usage

Request your SECRET_APPID
[here](https://developer.wolframalpha.com/portal/myapps) and store it securely.

Create your instance.

```typescript
import { WolframAlpha } from "wolfy";
const wolfy = new WolframAlpha("SECRET_APPID");
```

##### Simple API

```typescript
// simple api - returns image data
wolfy.getSimple({
  i: "How much does the Earth weigh?",
});

wolfy.getSimple({
  i: "How much does the Earth weigh?",
  background: "F5F5F5",
  foreground: FOREGROUNDS.WHITE,
  fontSize: 16,
  layout: LAYOUTS.LABEL_BAR,
  widht: 400,
  units: UNITS.IMPERIAL,
});
```

##### Full API

```typescript
// simple api - returns image data
wolfy.getFull({
  input: "population of France",
});

wolfy.getFull({
  input: "population of France",
  formats: [FORMATS.CELL, FORMATS.IMAGE, FORMATS.SOUND],
  ignoreCase: true,
  output: OUTPUTS.JSON,
  units: UNITS.METRIC,
  size: {
    width: 500,
    plotWidth: 100,
    mag: 50,
  },
  location: {
    ip: "127.0.0.0",
    //latlong: '',
  },
  reinterpret: true,
  translation: true,
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[Mozilla Public License Version 2.0](https://choosealicense.com/licenses/mpl-2.0/)
