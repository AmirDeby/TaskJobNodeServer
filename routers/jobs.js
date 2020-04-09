const express = require('express');
const jobRouter = express.Router();
const { addJobLog, deleteJob, toggleComplete, getTasksByUserId, getTaskJobs } = require('../queries');


jobRouter.get('/', async (req, res) => {
    const [result] = await getTaskJobs();

    res.send(result);
})

jobRouter.get('/me', async (req, res) => {

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

    await deleteJob(id);

    res.send('job deleted');

})

jobRouter.put('/:id/togglecomplete', async (req, res) => {

    const { id } = req.params;

    await toggleComplete(id);

    res.send('job done')
})




module.exports = { jobRouter };