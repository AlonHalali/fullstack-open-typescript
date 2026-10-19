import { Typography, Box, LinearProgress, Stack } from '@mui/material';
import {
  MedicalServices,
  LocalHospital,
  MedicalInformation,
} from '@mui/icons-material';

import { type Entry, type Diagnosis, HealthCheckRating } from '../../types';
import { assertNever } from '../../utils';

import { healthCheckRatingOptions } from '../../types';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = (entry: Entry) => {
  switch (entry.type) {
    case 'HealthCheck':
      let color: 'error' | 'info' | 'success' | 'warning' = 'warning';
      let value: number = 0;
      switch (entry.healthCheckRating) {
        case HealthCheckRating.Healthy:
          color = 'success';
          value = 0;
          break;
        case HealthCheckRating.LowRisk:
          color = 'info';
          value = 33;
          break;
        case HealthCheckRating.HighRisk:
          color = 'warning';
          value = 66;
          break;
        case HealthCheckRating.CriticalRisk:
          color = 'error';
          value = 99;
          break;
      }
      return {
        icon: <MedicalServices />,
        details: (
          <Stack>
            <Typography variant="body1" color={color}>
              {
                healthCheckRatingOptions.find(
                  (r) => r.value === entry.healthCheckRating,
                )?.label
              }
            </Typography>
            <LinearProgress
              variant="determinate"
              color={color}
              value={value}
              sx={{
                width: 300,
                height: 10,
                borderRadius: 5,
              }}
            />
          </Stack>
        ),
      };
    case 'OccupationalHealthcare':
      return {
        icon: <MedicalInformation />,
        details: (
          <Stack>
            <Typography variant="inherit">
              <strong>Employ:</strong> {entry.employerName}
            </Typography>
            {entry.sickLeave && (
              <>
                <Typography variant="inherit">
                  <strong>Start date:</strong> {entry.sickLeave.startDate}
                </Typography>
                <Typography variant="inherit">
                  <strong>End date:</strong> {entry.sickLeave.endDate}
                </Typography>
              </>
            )}
          </Stack>
        ),
      };
    case 'Hospital':
      return {
        icon: <LocalHospital />,
        details: (
          <Stack>
            {entry.discharge && (
              <>
                <Typography variant="inherit">
                  <strong>Date:</strong> {entry.discharge.date}
                </Typography>
                <Typography variant="inherit">
                  <strong>Criteria:</strong> {entry.discharge.criteria}
                </Typography>
              </>
            )}
          </Stack>
        ),
      };
    default:
      return assertNever(entry);
  }
};

const EntryComponent = ({ entry, diagnoses }: Props) => {
  const { icon, details } = EntryDetails(entry);

  return (
    <Box
      component="section"
      sx={{
        p: 2,
        border: '1px solid grey',
        borderRadius: 5,
        bgcolor: 'transparent',
        transition: 'background-color 0.5s ease',
        '&:hover': {
          bgcolor: 'ButtonFace',
        },
      }}
    >
      {icon}
      <Typography variant="body1" color="textSecondary">
        {entry.date}
        <br />
        {entry.description}
      </Typography>
      <br />
      <Typography variant="inherit"></Typography>
      {details}
      <br />
      {entry.diagnosisCodes && (
        <>
          <strong>diagnosisCodes:</strong>
          <ul>
            {entry.diagnosisCodes.map((code) => {
              console.log(code);
              return (
                <li key={code}>
                  {code} {diagnoses.find((d) => d.code === code)?.name}
                </li>
              );
            })}
          </ul>
        </>
      )}
      <Typography variant="caption" color="textSecondary">
        diagnose by {entry.specialist}
      </Typography>
    </Box>
  );
};

export default EntryComponent;
