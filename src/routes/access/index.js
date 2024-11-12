const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");

/**
 * @swagger
 * /v1/api/shop/signup:
 *   post:
 *     summary: Register a new shop
 *     tags: [Shop]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Shop name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Shop email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Shop password
 *     responses:
 *       201:
 *         description: Shop successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 metadata:
 *                   type: object
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post("/shop/signup", accessController.signUp);

module.exports = router;
