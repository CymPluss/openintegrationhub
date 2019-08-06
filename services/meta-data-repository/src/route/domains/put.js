const express = require('express');
const logger = require('@basaas/node-logger');
const { domainOwnerOrAllowed } = require('../../middleware/permission');
const conf = require('../../conf');
const { DomainDAO } = require('../../dao');
const {
    transformDbResults,
} = require('../../transform');

const log = logger.getLogger(`${conf.logging.namespace}/domains:put`);

const router = express.Router();

router.put('/:id', domainOwnerOrAllowed({
    permissions: ['not.defined'],
}), async (req, res, next) => {
    const { data } = req.body;
    try {
        if (!data) throw 'Missing data';

        if (data.owners) {
            delete data.owners;
        }

        res.send({
            data: transformDbResults(await DomainDAO.updateById({
                id: req.params.id,
                ...data,
            })),
        });
    } catch (err) {
        log.error(err);
        next({
            status: 500,
        });
    }
});

module.exports = router;