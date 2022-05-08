console.log('Loading function');

require('dotenv/config');
const { RingApi } = require('ring-client-api')

const refreshToken = process.env.RING_REFRESH_TOKEN,
ringApi = new RingApi({
  refreshToken: refreshToken,
});

exports.handler = async (event) => {
    const mode = event['mode'];
    const locations = await ringApi.getLocations()
    for (const location of locations) {
        await location.setLocationMode(mode)
    }
    return {
        statusCode: 200,
        body: JSON.stringify(`location updated to ${mode}`),
    };
};

exports.handler();