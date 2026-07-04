exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    let formData;
    if (typeof event.body === 'string') {
      try {
        formData = JSON.parse(event.body);
      } catch {
        formData = Object.fromEntries(new URLSearchParams(event.body));
      }
    } else {
      formData = event.body;
    }

    if (!formData.name || !formData.phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name and phone number are required' }),
      };
    }

    const ticketId = formData.ticketId || `VTX-${Date.now().toString(36).toUpperCase()}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        ticketId,
        whatsappUrl: `https://wa.me/2348158432605?text=${encodeURIComponent(
          `Hi, I'm ${formData.name}. I would like to consult on: ${formData.solution || 'General Consulting'}.\n\n📋 Ticket: #${ticketId}\n\nPlease help me get started.`
        )}`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};