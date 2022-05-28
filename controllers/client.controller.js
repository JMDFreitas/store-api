import ClienteService from '../services/client.service.js';

async function createClient(req, res, next) {
    try {
        let client = req.body;
        if (
            !client.name ||
            !client.cpf ||
            !client.phone ||
            !client.email ||
            !client.address
        ) {
            throw new Error(
                'Name, cpf, phone, email, address são obrigatorios'
            );
        }
        client = await ClienteService.createClient(client);
        res.send(client);
        logger.info(`POST /client - ${JSON.stringify(client)}`);
    } catch (err) {
        console.log('CATCH');
        next(err);
    }
}

async function getClients(_req, res, next) {
    try {
        res.send(await ClienteService.getClients());
        logger.info('GET /client');
    } catch (err) {
        next(err);
    }
}

async function getClient(req, res, next) {
    try {
        res.send(await ClienteService.getClient(req.params.id));
        logger.info('GET /client/:id');
    } catch (err) {
        next(err);
    }
}

async function deleteClient(req, res, next) {
    try {
        await ClienteService.deleteClient(req.params.id);
        res.end();
        logger.info('DELETE /client/:id');
    } catch (err) {
        next(err);
    }
}

async function updateClient(req, res, next) {
    try {
        const client = req.body;
        if (
            !client.client_id ||
            !client.name ||
            !client.cpf ||
            !client.phone ||
            !client.email ||
            !client.address
        ) {
            throw new Error(
                'Client Id, Name, cpf, phone, email, address são obrigatorios'
            );
        }
        res.send(await ClienteService.updateClient(client));
        logger.info(`PUT /client - ${JSON.stringify(client)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient,
};
