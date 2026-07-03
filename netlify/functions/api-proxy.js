# Netlify functions configuration
exports.handler = async (event) => {
  // API proxy handler for backend calls
  const url = new URL(event.path, `https://${event.headers.host}`);
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // For development - restrict in production
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const queryString = url.search;
  const apiUrl = `http://localhost:3000${url.pathname}${queryString}`;

  try {
    const response = await fetch(apiUrl, {
      method: event.httpMethod,
      headers: {
        ...headers,
        ...(event.body && { 'Content-Type': 'application/json' }),
      },
      body: event.body ? event.body : undefined,
    });

    const body = await response.text();
    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch (e) {
      parsedBody = body;
    }

    return {
      statusCode: response.status,
      headers: {
        ...headers,
        ...response.headers,
      },
      body: typeof parsedBody === 'object' ? JSON.stringify(parsedBody) : parsedBody,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
