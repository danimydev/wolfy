# Wolfy

Wolfram Alpha API fully covered wrapper built with TypeScript.

## Installation

Wolfy is published via [jsr](https://jsr.io/@danimydev/wolfy).

### Deno

```bash
deno add @danimydev/wolfy
```

### Others

```bash
npx jsr add @danimydev/wolfy
yarn dlx jsr add @danimydev/wolfy
pnpm dlx jsr add @danimydev/wolfy
bunx jsr add @danimydev/wolfy
```

## Usage

Request your SECRET_APPID
[here](https://developer.wolframalpha.com/portal/myapps) and store it securely.

Create your instance.

```typescript
import { SimpleApi } from "wolfy";
const wolfy = new SimpleApi({
  appId: "<SECRET_API_ID>",
});
```

##### Simple API

```typescript
await wolfy.query({
  input: "How much does the Earth weigh?",
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[Mozilla Public License Version 2.0](https://choosealicense.com/licenses/mpl-2.0/)
