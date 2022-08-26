## CLI Mocker
This mini utility is used to help mock your CLI tools when writing tests in frameworks like Mocha or Jest. It will spawn your CLI tool, and synchronously execute an array of predefined commands you provide like arrow/enter keys, text inputs, etc.

## Install
`yarn add cli-mocker --dev`\
or\
`npm install cli-mocker --save-dev`

## Available Inputs
Currently, this library supports the following inputs:

#### Up arrow key
```js
import { UP } from 'cli-mocker';
```

#### Down arrow key
```js
import { DOWN } from 'cli-mocker';
```

#### Enter key
```js
import { ENTER } from 'cli-mocker';
```

#### Shut down CLI
```js
import { EXIT } from 'cli-mocker';
```

#### String inputs
You can pass any string argument to your cli

## Example with Mocha
```js
import chai from 'chai';
import {
  run,
  UP,
  DOWN,
  ENTER,
  EXIT
} = from 'cli-mocker';

const { expect } = chai;

describe('Test CLI', function() {
  it('Runs', async () => {
    const { output, lastOutput } = await runCLI([
      // Press down arrow key
      DOWN,
      // Press enter
      ENTER,
      // Press up arrow key
      UP,
      // Type something
      'Hello, world!',
      ENTER,
      // Shut down CLI tool
      EXIT
    ]);
    
    return expect(lastOutput).to.equal(`Some value from your CLI tool's console.log() output`);
  });
})
```

## Contributing
Pull requests and feature requests are welcomed!

Husky is set up to run linting and formatting before commits.