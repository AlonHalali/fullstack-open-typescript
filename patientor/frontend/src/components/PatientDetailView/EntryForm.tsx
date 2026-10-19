import { Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { type NewEntry, HealthCheckRating, Patient } from '../../types';

import Notification from '../Notification';
import { NotificationProps, Severity } from '../Notification';

import patientsService from '../../services/patients';
import axios from 'axios';

interface Props {
  patientId: string;
  handleAddEntry: (updatedPatient: Patient) => void;
}

const EntryForm = ({ patientId, handleAddEntry }: Props) => {
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthRating, setHealthRating] = useState<string>('');
  const [codes, setCodes] = useState<string>('');
  const [notification, setNotification] = useState<NotificationProps | null>(
    null,
  );

  const notifyWith = (message: string, severity: Severity) => {
    setNotification({ message, severity });
    setTimeout(() => {
      setNotification(null);
    }, 7000);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    let newEntry: NewEntry = {
      type: 'HealthCheck',
      date,
      description,
      specialist,
      healthCheckRating: Number(healthRating) as HealthCheckRating,
    };
    if (codes.trim().length)
      newEntry = {
        ...newEntry,
        diagnosisCodes: codes.split(',').map((code) => code.trim()),
      };

    try {
      const updatedPatient: Patient = await patientsService.addEntry(
        patientId,
        newEntry,
      );

      handleAddEntry(updatedPatient);

      setDate('');
      setDescription('');
      setSpecialist('');
      setHealthRating('');
      setCodes('');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const issues = error.response.data.error;

        const errorMessage = Array.isArray(issues)
          ? issues
              .map(
                (issue: { path: (string | number)[]; message: string }) =>
                  `${issue.path.join('.')}: ${issue.message}`,
              )
              .join(' | ')
          : 'An unexpected error occurred';

        notifyWith(errorMessage, 'error');
      }
    }
  };

  return (
    <Paper
      elevation={8}
      component="form"
      sx={{
        my: 3,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" component="h2" color="info">
        Add Entry
      </Typography>
      <Notification notification={notification} />
      <TextField
        id="outlined-basic"
        label="Date"
        variant="outlined"
        placeholder="YYYY-MM-DD"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label="Specialist"
        variant="outlined"
        value={specialist}
        onChange={(event) => setSpecialist(event.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label="Health Check Rating (0-3)"
        variant="outlined"
        value={healthRating}
        onChange={(event) => setHealthRating(event.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label="Diagnosis Code (comma-separated)"
        variant="outlined"
        value={codes}
        onChange={(event) => setCodes(event.target.value)}
      />
      <Button variant="contained" type="submit">
        Add
      </Button>
    </Paper>
  );
};

export default EntryForm;
