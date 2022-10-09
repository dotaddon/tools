# `@mobilc/panorama-react-dom`

> React for Valve's Panorama UI (for Dota 2 Custom Games).

To get started, check out an [introductory tutorial on ModDota](https://moddota.com/panorama/react).

## Installation

To avoid wasting time on configuration, it's recommended to start with the
[JavaScript](https://github.com/ark120202/dota-templates/tree/webpack-react) or
[TypeScript](https://github.com/ark120202/dota-templates/tree/webpack-typescript-react) templates,
even if you're integrating it into an existing project.

If you want to configure tools yourself, you can follow these instructions:

### Using webpack

webpack is the recommended way to use React with Panorama. To see how webpack can be configured for
use with Panorama, check out [webpack tutorial on ModDota](https://moddota.com/panorama/webpack).

```shell
npm install react @mobilc/panorama-react-dom
```

> If you are using TypeScript you also need to install `@types/react`

```jsx
import React, { useState } from 'react';
import { render } from '@mobilc/panorama-react-dom';

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return (
    <Panel style={{ flowChildren: 'down' }}>
      <Label text={`Count: ${count}`} />
      <TextButton className="ButtonBevel" text="Increment" onactivate={increment} />
    </Panel>
  );
}

render(<Counter />, $.GetContextPanel());
```

### Using UMD

> Warning: UMD builds don't have a wide ecosystem support and make it harder to write idiomatic
> React code. While UMD might seem like an easier way to get started, using a bundler allows for a
> better code organization and gives you an access to a huge list of libraries built for React.

1. Download UMD bundles of [React](https://unpkg.com/react/umd/react.development.js) and
   [`ReactDOM`](https://unpkg.com/panorama-react-dom/dist/umd/panorama-react-dom.development.js)
2. Put all downloaded files to `panorama/scripts/custom_game/libraries`
3. Include them in your layout file:

```xml
<root>
  <scripts>
    <include src="file://{resource}/scripts/custom_game/libraries/react.development.js" />
    <include src="file://{resource}/scripts/custom_game/libraries/panorama-react-dom.development.js" />
    <!-- Your scripts -->
  </scripts>
  <Panel />
</root>
```

4. Use `React` and `ReactDom` globals in your script:

```js
function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count + 1);

  return React.createElement(
    'Panel',
    { style: { flowChildren: 'down' } },
    React.createElement('Label', { text: `Count: ${count}` }),
    React.createElement('TextButton', {
      className: 'ButtonBevel',
      text: 'Increment',
      onactivate: increment,
    }),
  );
}

ReactDom.render(React.createElement(Counter), $.GetContextPanel());
```

#### UMD and TypeScript

If you are using TypeScript directly via `tsc` CLI, you need to install `@types/react` and
`@mobilc/panorama-react-dom` from npm, and change your `tsconfig.json` like this:

```diff
{
  "compilerOptions": {
-    "types": ["panorama-types"],
+    "types": ["panorama-types", "react", "@mobilc/panorama-react-dom"],
+    "jsx": "react",
  }
}
```

Then you can use React UMD globals and JSX with type safety:

```tsx
function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count + 1);

  return (
    <Panel style={{ flowChildren: 'down' }}>
      <Label text={`Count: ${count}`} />
      <TextButton className="ButtonBevel" text="Increment" onactivate={increment} />
    </Panel>
  );
}

ReactDom.render(<Counter />, $.GetContextPanel());
```

## JSX

`ReactDOM` allows to use most of known Panorama panel types as bare elements (i.e.
`<Panel />`). For a full list of supported elements check out
[renderer/panels.ts](src/renderer/panels.ts). All unsupported panel types can be used with
`<GenericPanel type="CustomPanelName" />` pseudo-element.

## API

### Renderer

#### `render(element: ReactElement, container: Panel, callback?: () => void): void`

Render a React element into the layout in the supplied container.

See [ReactDOM.render](https://reactjs.org/docs/react-dom.html#render) for more information.

#### `createPortal(children: ReactNode, container: Panel, key?: null | string): ReactPortal`

Creates a [React Portal](https://reactjs.org/docs/portals.html).

### Hooks

#### `useGameEvent(eventName: string, callback: (event: object) => void, dependencies?: DependencyList): void`

Executes `callback` every time `eventName` game event is fired.

#### `useClientEvent(event: string, callback: (...args: any[]) => void, dependencies?: DependencyList): void`

Executes `callback` every time `event` UI event is fired.

#### `useNetTableKey(name: string, key: string): object`

Gets the value of a key in a custom NetTable and updates component when it changes.

#### `useNetTableAll(name: string): object`

Gets all values in a custom NetTable and updates component when it changes.

#### `useTick(tick: number): boolean`
更新器 
tick tock tool
#### `usePlayerMap(): PlayerID[]`
输出当前玩家ID数组，玩家重连时更新
get all playerID in game now，refresh on anyone connect

#### `useInterval(callback: () => number, interval: number, deps:[]): void`
 * 异步useEffect 
 * 处理当依赖项在回调中被修改造成的挂起
 * same as async useEffect
 * Handle hangs when State in dependencies are modified in callback

# issue
欢迎添加我的个人[飞书](https://www.feishu.cn/invitation/page/add_contact/?token=9fah665e-ee7a-4916-a45d-1693350e39c5&amp;unique_id=fSNYli_1nRgdHKoNPARsJA==),我拉你进话题组中讨论地图制作
 * 比起QQ，飞书可以按话题讨论，对于技术点更有针对性
 * 我也是初尝试，欢迎大家一通使用

或者使用[github](https://github.com/takegine/testdodo/issues) 给我留言。

编辑不易，欢迎通过[爱发电](https://afdian.net/@takegine)对我赞助