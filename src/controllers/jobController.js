import mongoose from 'mongoose';

import { JobSchema } from '../models/jobModel.js';

import { handleDuplicateKey } from '../lib/errorHandler.js';

const Job = mongoose.model('Job', JobSchema);

export const addNewJob = (req, res) => {
  let newJob = new Job(req.body);

  newJob.save((err, job) => {
    if (err) {
      // MongoError: Duplicate key error
      if (err.code === 11000) {
        handleDuplicateKey(res, err);
      } else {
        res.send(err);
      }
    }
    res.json(job);
  });
};

export const getJobs = (req, res) => {
  Job.find({}, (err, job) => {
    if (err) {
      res.send(err);
    }
    res.json(job);
  });
};

export const getJobWithID = (req, res) => {
  Job.findById(req.params.jobID, (err, job) => {
    if (err) {
      res.send(err);
    }
    res.json(job);
  });
};

export const updateJob = (req, res) => {
  Job.findOneAndUpdate(
    { _id: req.params.jobID },
    req.body,
    {
      new: true,
      useFindAndModify: false
    },
    (err, job) => {
      if (err) {
        res.send(err);
      }
      res.json(job);
    });
};

export const deleteJob = (req, res) => {
  Job.findByIdAndDelete({ _id: req.params.jobID }, (err, job) => {
    if (err) {
      res.send(err);
    }
    console.log(job);
    res.json({
      job,
      message: job ? 'Successfully deleted job' : `No job with ID: ${req.params.jobID}`
    });
  });
};