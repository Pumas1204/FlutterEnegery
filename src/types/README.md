# Types

general and basic types and interfaces defined in this section.

## Files

- general.ts: contains general types for all react app projects like Response, Token, Pagination, ...

- power-grid.ts: contains types of models for this specific project

- context.ts: types that used for general state system (context) includes main types for context and each state saved in it

- index.ts: export all types from this file

## How to use:

in component:

```javascript
// import
import { API } from 'data';
import { PaginationType } from 'types';
import { get } from 'scripts/api';
...
    // use in api call
    post<PaginationType<Type>>(API.account.exchange.index, { params }).then((res) => {
        //
    });
...
```
