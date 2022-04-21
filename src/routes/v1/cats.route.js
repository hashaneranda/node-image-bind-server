const express = require('express');
const validate = require('../../middlewares/validate');
const catController = require('../../controllers/cat.controller');
const { catsValidation } = require('../../validations');

const router = express.Router();

router.route('/').get(validate(catsValidation.cats), catController.cats);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Cats
 *   description: Cats Routes
 */

/**
 * @swagger
 * paths:
 *  /cats:
 *    get:
 *      summary: Generate New cat image
 *      description: generate cat by 2 cat images
 *      tags: [Cat]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                greeting:
 *                  type: string
 *                who:
 *                  type: string
 *                width:
 *                  type: number
 *                height:
 *                  type: number
 *                color:
 *                  type: string
 *                size:
 *                  type: number
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Cats'
 *
 *  */
