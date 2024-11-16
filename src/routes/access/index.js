const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");
const {asyncHandel} = require("../../auth/checkAuth");

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
router.post("/shop/signup", asyncHandel(accessController.signUp));



/**
 * @swagger
 * /v1/api/shop/login:
 *   post:
 *     summary: Login 
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
 *               - email
 *               - password
 *             properties:
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
 *         description: Error
 *       500:
 *         description: Internal server error
 */
router.post("/shop/login", asyncHandel(accessController.login));

module.exports = router;
