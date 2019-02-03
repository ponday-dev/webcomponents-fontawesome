# webcomponents-fontawesome

> FontAwesome 5 Web Component using SVG with JS

## installation

Download this project.

```
git clone https://github.com/ponday-dev/webcomponents-fontawesome.git
```

Install packages and run build.

```
npm install
npm run build
```

After running the above command, some files will generate.

- index.js
- index.umd.js
- index.d.ts
- fa-icon.d.ts

Copy the index.js to your project. (Copy index.d.ts and fa-icon.d.ts to your typeRoot folder too if you use TypeScript.)

And also, install icon pack that you want to use.

- @fortawesome/free-solid-svg-icons
- @fortawesome/free-brands-svg-icons
- @fortawesome/free-regular-svg-icons
- @fortawesome/pro-solid-svg-icons
- @fortawesome/pro-regular-svg-icons
- @fortawesome/pro-light-svg-icons

## How to use

Import `FontAwesome` from index.js, and  import icon definition too.

```javascript
import { FontAwesome } from '...';
import { faIgloo, faSplinner } from '@fortawesome/free-solid-svg-icons';
```

Register icon definitions.

```javascript
FontAwesome.use([ faIgloo, faSpinner ]);
```

Call the following function, `fa-icon` will register as web component.

```html
<fa-icon icon="igloo" size="lg"></fa-icon>
<fa-icon icon="spinner" size="3x" spin></fa-icon>
```
