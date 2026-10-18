import { Typography, Stack } from '@mui/material';

import type { Entry, Diagnosis } from '../../types';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryComponent = ({ entry, diagnoses }: Props) => {
  console.log(entry.diagnosisCodes);

  return (
    <Stack>
      <Typography variant="inherit">
        {entry.date} {entry.description}
      </Typography>
      {entry.diagnosisCodes && (
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
      )}
    </Stack>
  );
};

export default EntryComponent;
