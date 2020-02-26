import { parse } from 'graphql';
import Promise from 'bluebird';

function getValue(value) {
  if (value.kind === 'ListValue') {
    return value.values.map(x => getValue(x));
  } else if (value.kind === 'Variable') {
    return `$${value.name.value}`;
  } else if (value.kind === 'ObjectValue') {
    const out = {};
    value.fields.forEach(field => {
      out[field.name.value] = getValue(field.value);
    });
    return JSON.stringify(out);
  } else {
    return value.value;
  }
}

function parseArguments(arr) {
  return arr.filter(x => x.name).map(x => ({
    name: x.name.value,
    value: getValue(x.value),
    kind: x.value.kind,
  }));
}

function parseFields(arr) {
  return arr.selections.map(x => parseOperation(x));
}

function getName(definition) {
  if (definition.kind === 'InlineFragment') {
    return `InlineFragment if ${definition.typeCondition.name.value}`;
  } else if (definition.alias && definition.name) {
    return `${definition.alias.value}: ${definition.name.value}`;
  } else if (definition.name) {
    return definition.name.value;
  } else {
    return 'Anonymous';
  }
}

function parseOperation(definition) {
  return {
    kind: definition.kind,
    name: getName(definition),
    params: definition.arguments ? parseArguments(definition.arguments) : null,
    fields: definition.selectionSet ? parseFields(definition.selectionSet) : null,
  };
}

function internalParse(requestData) {
  const { definitions } = requestData;
  return definitions.map(definition => {
    return {
      name: definition.name ? definition.name.value : (definition.operation || 'request'),
      kind: definition.kind,
      operations: definition.selectionSet.selections.map(operation => {
        return {
          ...parseOperation(operation),
          type: definition.operation || operation.kind,
        };
      }),
    };
  });
}

function isContentType(entry, contentType) {
  return entry.request.headers.some(({ name, value }) => {
    return name.toLowerCase() === 'content-type' && value.split(';')[0].toLowerCase() === contentType.toLowerCase();
  });
}

function getQueryFromParams(params = []) {
  return decodeURIComponent(params.find(param => param.name === 'query').value);
}

export function isGraphQL(entry) {
  try {
    if (isContentType(entry, 'application/graphql')) {
      return true;
    }

    if (isContentType(entry, 'application/json')) {
      const json = JSON.parse(entry.request.postData.text);
      return json.query || json[0].query;
    }

    if (isContentType(entry, 'application/x-www-form-urlencoded') && getQueryFromParams(entry.request.postData.params)) {
      return true;
    }
  } catch (e) {
    return false;
  }
}

export function parseEntry(entry) {
  const parsedQueries = [];

  if (isContentType(entry, 'application/graphql')) {
    parsedQueries.push(parseQuery(
      entry.request.postData.text,
      entry.request.postData.variables
    ));
  } else if (isContentType(entry, 'application/x-www-form-urlencoded')) {
    parsedQueries.push(parseQuery(getQueryFromParams(entry.request.postData.params)));
  } else {
    let json;

    try {
      json = JSON.parse(entry.request.postData.text);
    } catch (e) {
      return Promise.resolve(`Internal Error Parsing: ${entry}. Message: ${e.message}. Stack: ${e.stack}`);
    }

    if (!Array.isArray(json)) {
      json = [json];
    }

    for (let batchItem of json) {
      const { query } = batchItem;
      let { variables } = batchItem;

      try {
        variables = typeof variables === 'string' ? JSON.parse(variables) : variables;
      } catch (e) {
        return Promise.resolve(`Internal Error Parsing: ${entry}. Message: ${e.message}. Stack: ${e.stack}`);
      }

      parsedQueries.push(parseQuery(query, variables));
    }
  }

  return new Promise(resolve => {
    entry.getContent(responseBody => {
      const parsedResponseBody = JSON.parse(responseBody);

      resolve(parsedQueries.map((parsedQuery, i) => {
        return {
          responseBody: Array.isArray(parsedResponseBody) ? parsedResponseBody[i] : parsedResponseBody,
          url: entry.request.url,
          response: entry.response,
          request: entry.request,
          ...parsedQuery
        };
      }));
    });
  });
}

export function parseQuery(query, variables={}) {
  let requestData,
    rawParse;

  try {
    rawParse = parse(query);
  } catch (e) {
    return Promise.resolve(`GraphQL Error Parsing: ${query}. Message ${e.message}. Stack: ${e.stack}`);
  }

  try {
    requestData = internalParse(rawParse);
  } catch (e) {
    return Promise.resolve(`Internal Error Parsing: ${query}. Message: ${e.message}. Stack: ${e.stack}`);
  }

  const fragments = requestData
    .filter(x => x.kind === 'FragmentDefinition');

  return {
    queryVariables: variables,
    fragments,
    id: `${Date.now() + Math.random()}`,
    bareQuery: query,
    data: requestData,
    rawParse: JSON.stringify(rawParse),
  };
}
