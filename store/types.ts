export const SOME_ACTION = 'SOME_ACTION';

interface SendMessageAction {
      type: typeof SOME_ACTION;
      value: number;
}

export type CoreActions = SendMessageAction;
