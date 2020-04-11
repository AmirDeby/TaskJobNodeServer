const express = require('express');
const jobRouter = express.Router();
const { addJobLog, deleteJob, toggleComplete, getTasksByUserId, getTaskJobs } = require('../queries');


jobRouter.get('/', async (req, res) => {

    const { userId } = req.user;

    const [result] = await getTasksByUserId(userId);

    res.send(result)
})

jobRouter.post('/', async (req, res) => {

    const { description, date } = req.body;
    const { userId } = req.user;
    console.log(userId);

    const [result] = await addJobLog(description, date, userId);

    const jobId = result.insertId;

    res.send({ id: jobId });
})

jobRouter.delete('/:id', async (req, res) => {

    const { id } = req.params;
    const { userId } = req.user;
    // same as toggle for useID
    const [result] = await deleteJob(id, userId);
    console.log(result);
    if (!result.affectedRows) {
        return res.status(403).send('something want wrong')
    }
    res.send('job deleted');
})

jobRouter.put('/:id/togglecomplete', async (req, res) => {

    const { id } = req.params;
    const { userId } = req.user;

    const [result] = await toggleComplete(id, userId);
    // console.log(result);
    if (!result.affectedRows) {
        return res.status(403).send('job not found')
    }
    res.send('job done')
})




module.exports = { jobRouter };