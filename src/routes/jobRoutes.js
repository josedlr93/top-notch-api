import {
  getJobs,
  addNewJob,
  getJobWithID,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';

const jobRoutes = (app) => {
  app.route('/job')
    .get(getJobs)

    .post(addNewJob);

  app.route('/job/:jobID')
    .get(getJobWithID)

    .put(updateJob)

    .delete(deleteJob);
};

export default jobRoutes;