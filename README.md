Simple API using fastify.

### Setup

#### `npm install`
Install required dependencies for running the project.

#### `npm start`
Start fastify server config values set in .env file


### Available API

#### `GET /api/number`
Returns the current number value

<i>Request:</i>
```
curl http://127.0.0.1:3000/api/number
```

<i>Response:</i>
```
{ "value": 0 }
```

#### `POST /api/number/step`
Performs action on the current number value.

<i>Query Params:</i>
action - increment or decrement

<i>Request:</i>
```
curl -X POST "http://127.0.0.1:3000/api/number/step?action=increment"
```

<i>Response:</i>
```
{ "value": 1 }
```


