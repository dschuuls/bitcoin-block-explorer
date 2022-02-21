var axios = require('axios');
var express = require('express');
var nodeCache = require("node-cache");

var cache = new nodeCache({ stdTTL: 600 });
var router = express.Router();

const { BLOCKS_URL, DETAILS_URL } = require('../lib/constants');

const verifyCache = (req, res, next) => {
  try {
    if (cache.has(req.originalUrl)) {
      return res.status(200).json(cache.get(req.originalUrl));
    }
    return next();
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @swagger
 * /blocks:
 *   get:
 *     summary: Retrieve a list of blocks
 *     description: Retrieve a list of blocks
 *     responses:
 *       200:
 *         description: List of blocks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   hash:
 *                     type: string
 *                     description: The block hash
 *                     example: 00000000000000000003d2846db883caa0eb395ad6508c20d9087bb520177798
 *                   height:
 *                     type: integer
 *                     description: The block height
 *                     example: 723858
 *                   time:
 *                     type: integer
 *                     description: The block time
 *                     example: 1645169928
 *                   block_index:
 *                     type: integer
 *                     description: The block index
 *                     example: 723858
 *       304:
 *         description: Didn't change since last call, cached response
*/

router.get('/', async (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
  const fetchUrl = `${BLOCKS_URL}/${new Date().getTime()}?format=json`;
  handleFetch(fetchUrl, req, res);
});

/**
 * @swagger
 * /blocks/{hash}:
 *   get:
 *     summary: Retrieve details of a block
 *     description: Retrieve details of a block
 *     parameters:
 *       - name: hash
 *         in: path
 *         description: The block hash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of a block
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hash:
 *                   type: string
 *                   description: The block hash
 *                   example: 00000000000000000003d2846db883caa0eb395ad6508c20d9087bb520177798
 *                 height:
 *                   type: integer
 *                   description: The block height
 *                   example: 723858
 *                 time:
 *                   type: integer
 *                   description: The block time
 *                   example: 1645169928
 *                 block_index:
 *                   type: integer
 *                   description: The block index
 *                   example: 723858
 *       304:
 *         description: Didn't change since last call, cached response
 *       404:
 *         description: A block with the given hash was not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Not Found
*/

/* GET block details. */
router.get('/:hash', verifyCache, async (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
  const fetchUrl = `${DETAILS_URL}/${req.params.hash}`;
  handleFetch(fetchUrl, req, res);
});

async function handleFetch(fetchUrl, req, res) {
  try {
    const { data } = await axios.get(fetchUrl);
    cache.set(req.originalUrl, data);
    return res.status(200).json(data);
  } catch ({ response }) {
    return res.sendStatus(response.status);
  }
}

module.exports = router;
