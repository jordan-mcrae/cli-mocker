import * as cp from 'child_process';

// https://www.tldp.org/LDP/abs/html/escapingsection.html
export const DOWN = '\x1B\x5B\x42';
export const UP = '\x1B\x5B\x41';
export const ENTER = '\x0D';
export const SPACE = '\x20';
export const EXIT = 'exit 0';

type Commands = typeof DOWN | typeof UP | typeof ENTER | typeof SPACE | typeof EXIT;

const COMMAND_DELAY_MS = 250;

export const run = async (command: string, inputs: Commands[]) =>
  new Promise(async (resolve) => {
    const outputs: string[] = [];
    const proc: cp.ChildProcess = cp.exec(command);

    const sendInputs = async (commands: Commands[]) => {
      await commands.reduce(
        (previousPromise: any, input) =>
          new Promise<void>(async (resolveInput) => {
            if (previousPromise) await previousPromise;

            setTimeout(() => {
              proc.stdin.write(input);
              resolveInput();
            }, COMMAND_DELAY_MS);
          }),
        null,
      );

      proc.stdin.end();
    };

    await sendInputs(inputs);

    proc.stdout.on('data', (data: string) => outputs.push(data));
    proc.stderr.on('data', (data: string) => outputs.push(data));

    proc.on('exit', () => resolve({ outputs, lastOutput: [...outputs].pop() }));
  });
