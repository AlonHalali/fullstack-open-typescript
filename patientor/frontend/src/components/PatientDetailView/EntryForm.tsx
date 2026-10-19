import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  MedicalServices,
  LocalHospital,
  MedicalInformation,
} from '@mui/icons-material';
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

const FormTypes = {
  HealthCheck: 'HealthCheck',
  OccupationalHealthcare: 'OccupationalHealthcare',
  Hospital: 'Hospital',
};
type FormTypes = (typeof FormTypes)[keyof typeof FormTypes];

type EntryFormValues = Omit<
  NewEntry,
  'healthCheckRating' | 'sickLeave' | 'discharge' | 'diagnosisCodes'
> & {
  healthCheckRating: string;
  employerName: string;
  sickLeaveStart?: string;
  sickLeaveEnd?: string;
  dischargeDate?: string;
  dischargeCriteria?: string;
  diagnosisCodes?: string;
};

const initialState: EntryFormValues = {
  type: 'HealthCheck',
  date: '',
  specialist: '',
  description: '',
  diagnosisCodes: '',
  healthCheckRating: '',
  employerName: '',
  sickLeaveStart: '',
  sickLeaveEnd: '',
  dischargeDate: '',
  dischargeCriteria: '',
};

const EntryForm = ({ patientId, handleAddEntry }: Props) => {
  const [newEntry, setNewEntry] = useState<EntryFormValues>(initialState);

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

    const baseEntry = {
      date: newEntry.date,
      description: newEntry.description,
      specialist: newEntry.specialist,
      ...(newEntry.diagnosisCodes &&
        newEntry.diagnosisCodes.trim() && {
          diagnosisCodes: newEntry.diagnosisCodes
            .split(',')
            .map((code) => code.trim()),
        }),
    };

    let entryToAdd: NewEntry;

    switch (newEntry.type) {
      case 'HealthCheck':
        entryToAdd = {
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating: Number(
            newEntry.healthCheckRating,
          ) as HealthCheckRating,
        };
        break;
      case 'OccupationalHealthcare':
        entryToAdd = {
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName: newEntry.employerName,
          ...(newEntry.sickLeaveStart &&
            newEntry.sickLeaveEnd && {
              sickLeave: {
                startDate: newEntry.sickLeaveStart,
                endDate: newEntry.sickLeaveEnd,
              },
            }),
        };
        break;
      case 'Hospital':
        entryToAdd = {
          ...baseEntry,
          type: 'Hospital',
          ...(newEntry.dischargeDate &&
            newEntry.dischargeCriteria && {
              discharge: {
                date: newEntry.dischargeDate,
                criteria: newEntry.dischargeCriteria,
              },
            }),
        };
        break;
    }

    try {
      const updatedPatient: Patient = await patientsService.addEntry(
        patientId,
        entryToAdd,
      );

      handleAddEntry(updatedPatient);
      setNewEntry({ ...initialState, type: newEntry.type });
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

  let icon;
  let inputs;

  switch (newEntry.type) {
    case FormTypes.HealthCheck:
      icon = <MedicalServices />;
      inputs = (
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            label="Health Check Rating (0-3)"
            variant="outlined"
            value={newEntry.healthCheckRating}
            onChange={(event) =>
              setNewEntry({
                ...newEntry,
                healthCheckRating: event.target.value,
              })
            }
            required
            fullWidth
          />
        </Stack>
      );
      break;

    case FormTypes.OccupationalHealthcare:
      icon = <MedicalInformation />;
      inputs = (
        <Stack spacing={3}>
          <TextField
            id="outlined-basic"
            label="Employer Name"
            variant="outlined"
            value={newEntry.employerName}
            onChange={(event) =>
              setNewEntry({ ...newEntry, employerName: event.target.value })
            }
            required
            fullWidth
          />

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'action.hover',
            }}
          >
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={600}>
                Sick Leave
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  id="outlined-basic"
                  label="Start Date"
                  variant="outlined"
                  value={newEntry.sickLeaveStart}
                  onChange={(event) =>
                    setNewEntry({
                      ...newEntry,
                      sickLeaveStart: event.target.value,
                    })
                  }
                  fullWidth
                />

                <TextField
                  id="outlined-basic"
                  label="End Date"
                  variant="outlined"
                  value={newEntry.sickLeaveEnd}
                  onChange={(event) =>
                    setNewEntry({
                      ...newEntry,
                      sickLeaveEnd: event.target.value,
                    })
                  }
                  fullWidth
                />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      );
      break;

    case FormTypes.Hospital:
      icon = <LocalHospital />;
      inputs = (
        <Stack spacing={3}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'action.hover',
            }}
          >
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                Discharge Information
              </Typography>

              <TextField
                id="outlined-basic"
                label="Date"
                variant="outlined"
                value={newEntry.dischargeDate}
                onChange={(event) =>
                  setNewEntry({
                    ...newEntry,
                    dischargeDate: event.target.value,
                  })
                }
                fullWidth
              />

              <TextField
                id="outlined-basic"
                label="Criteria"
                variant="outlined"
                value={newEntry.dischargeCriteria}
                onChange={(event) =>
                  setNewEntry({
                    ...newEntry,
                    dischargeCriteria: event.target.value,
                  })
                }
                fullWidth
                multiline
                minRows={2}
              />
            </Stack>
          </Paper>
        </Stack>
      );
      break;
  }

  return (
    <Paper
      elevation={0}
      component="form"
      onSubmit={handleSubmit}
      sx={{
        my: 4,
        p: { xs: 2, sm: 3, md: 4 },
        border: 1,
        borderColor: 'divider',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 900,
        mx: 'auto',
        bgcolor: 'background.paper',
      }}
    >
      <Stack spacing={1}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Paper
            elevation={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'action.hover',
              color: 'primary.main',
            }}
          >
            {icon}
          </Paper>

          <Stack spacing={0.5}>
            <Typography variant="h5" component="h2" fontWeight={700}>
              Add {newEntry.type} Entry
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter the details of the medical record
            </Typography>
          </Stack>
        </Stack>

        <Notification notification={notification} />
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'action.hover',
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Entry Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newEntry.type}
            label="Enter Type"
            onChange={(event) => {
              setNewEntry({
                ...initialState,
                type: event.target.value,
              });
            }}
          >
            {(Object.values(FormTypes) as string[]).map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight={700}>
          General Information
        </Typography>

        <TextField
          id="outlined-basic"
          label="Date"
          variant="outlined"
          placeholder="YYYY-MM-DD"
          value={newEntry.date}
          onChange={(event) => {
            setNewEntry({ ...newEntry, date: event.target.value });
          }}
          required
          fullWidth
        />

        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={newEntry.description}
          onChange={(event) => {
            setNewEntry({ ...newEntry, description: event.target.value });
          }}
          required
          fullWidth
          multiline
          minRows={2}
        />

        <TextField
          id="outlined-basic"
          label="Specialist"
          variant="outlined"
          value={newEntry.specialist}
          onChange={(event) => {
            setNewEntry({ ...newEntry, specialist: event.target.value });
          }}
          required
          fullWidth
        />

        <TextField
          id="outlined-basic"
          label="Diagnosis Code (comma-separated)"
          variant="outlined"
          value={newEntry.diagnosisCodes}
          onChange={(event) => {
            setNewEntry({ ...newEntry, diagnosisCodes: event.target.value });
          }}
          fullWidth
          helperText="Separate multiple diagnosis codes with commas."
        />
      </Stack>

      <Paper
        elevation={1}
        sx={{
          p: { xs: 2, sm: 3 },
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        {inputs}
      </Paper>

      <Button
        variant="contained"
        type="submit"
        size="large"
        startIcon={icon}
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontWeight: 700,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 2,
          },
        }}
      >
        Add Entry
      </Button>
    </Paper>
  );
};

export default EntryForm;
