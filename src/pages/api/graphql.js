import axios from 'axios';

export default async (req, res) => {
  console.log(process.env.GRAPHQL_URI, 'server');
  try {
    const { body: data, headers } = req;
    const { method } = req;
    const a = await axios({
      method,
      url: process.env.GRAPHQL_URI,
      data,
      headers,
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(a.data));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};
