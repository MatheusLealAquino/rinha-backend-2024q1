import * as express from 'express';

import { createTransaction, getExtract } from '../../controllers/client/client.controller';

const router = express.Router();

router.post('/:id/transacoes', async (req, res) => {
	try {
		const { id } = req.params;
		const { tipo, valor, descricao } = req.body;

		const clientId = parseInt(id, 10);
		if (!clientId) throw new Error('clientId is required a number value');
		if (!tipo) throw new Error('tipo is required');
		if (!['c', 'd'].includes(tipo)) throw new Error('tipo is not allowed');
		if (!valor) throw new Error('valor is required');
		if (!descricao) throw new Error('descricao is required');
		if (descricao.length == 0 || descricao.length > 10) throw new Error('descricao length should be between 1 and 10');

		const createClientOperation = await createTransaction({
			clientId,
			transactionInput: {
				type: tipo,
				value: valor,
				description: descricao
			}
		});

		return res.status(200).json(createClientOperation);
	} catch (err) {
		const error = err as Error;
		console.error(err);

		const inputValidations = [
			'clientId is required a number value',
			'tipo is required',
			'valor is required',
			'descricao is required',
			'descricao length should be between 1 and 10'
		];

		if (inputValidations.includes(error.message)) {
			return res.status(422).json({
				message: error.message,
			});	
		}

		if (error.message === 'Inconsistency operation') {
			return res.status(422).json({
				message: error.message,
			});	
		}

		if (error.message === 'Client not found') {
			return res.status(404).json({
				message: error.message,
			});	
		}

		return res.status(500).json({
			message: 'Try again later',
		});
	}
});

router.get('/:id/extrato', async (req, res) => {
	try {
		const { id } = req.params;

		const clientId = parseInt(id, 10);
		if (!clientId) throw new Error('clientId is required a number value');

		const extractOfClient = await getExtract({
			clientId,
		});

		return res.status(200).json(extractOfClient);
	} catch (err) {
		const error = err as Error;
		console.error(err);

		const inputValidations = ['clientId is required a number value'];

		if (inputValidations.includes(error.message)) {
			return res.status(422).json({
				message: error.message,
			});	
		}

		if (error.message === 'Client not found') {
			return res.status(404).json({
				message: error.message,
			});	
		}

		return res.status(500).json({
			message: 'Try again later',
		});
	}
})

export default router;