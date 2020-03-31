const express = require('express');
const jobRouter = express.Router();
const { addJobLog, deleteJob, toggleComplete, getTasksByUserId } = require('../queries');

// use token 
jobRouter.get('/me', async (req, res) => {

    const { userId } = req.params;  

    const [result] = await getTasksByUserId(userId);

    res.send(result)
})

jobRouter.post('/', async (req, res) => {
    const { description, date, userId } = req.body;

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