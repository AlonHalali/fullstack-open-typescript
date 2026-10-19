import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Paper, Stack, Typography } from '@mui/material';
import { Female, Male } from '@mui/icons-material';

import { Patient, Diagnosis } from '../../types';
import patientsService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import EntryComponent from './EntryComponent';
import EntryForm from './EntryForm';

const PatientDetailView = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      patientsService
        .getOne(id)
        .then((patientReturned) => {
          if (patientReturned) setPatient(patientReturned);
        })
        .catch((error) => {
          if (axios.isAxiosError(error) && error.response) {
            setError(error.response.data.error);
          } else setError(String(error));
        });
    }
  }, [id]);

  useEffect(() => {
    diagnosesService.getAll().then((initialDiagnoses) => {
      setDiagnoses(initialDiagnoses);
    });
  }, []);

  if (error)
    return (
      <div>
        <h1>Something went wrong</h1>
        <h3>{error}</h3>
      </div>
    );

  if (!patient || !diagnoses)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  const handleAddEntry = (updatedPatient: Patient) => {
    setPatient(updatedPatient);
  };

  const genderIconStyle = {
    fontSize: 20,
    color: patient.gender === 'male' ? 'blue' : 'pink',
    padding: 0,
    margin: 0,
  };

  return (
    <Paper elevation={8} sx={{ my: 3, p: 3 }}>
      <Stack spacing={1}>
        <Typography variant="h4" component="h2">
          {patient.name}{' '}
          {patient.gender === 'male' && <Male sx={genderIconStyle} />}
          {patient.gender === 'female' && <Female sx={genderIconStyle} />}
        </Typography>

        <Typography variant="body1">
          <strong>ssn:</strong> {patient.ssn}
        </Typography>

        <Typography variant="body1">
          <strong>occupation:</strong> {patient.occupation}
        </Typography>

        <Typography variant="body1">
          <strong>date of birth:</strong> {patient.dateOfBirth}
        </Typography>
        <EntryForm patientId={patient.id} handleAddEntry={handleAddEntry} />
        {patient.entries.length ? (
          <>
            <Typography variant="h5" component="h5" sx={{ pt: 3 }}>
              Entries
            </Typography>
            {patient.entries.map((e) => (
              <EntryComponent key={e.id} entry={e} diagnoses={diagnoses} />
            ))}
          </>
        ) : (
          <></>
        )}
      </Stack>
    </Paper>
  );
};

export default PatientDetailView;
