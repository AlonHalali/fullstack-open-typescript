import type { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = ({ part }: { part: CoursePart }) => {
  const renderDetails = () => {
    switch (part.kind) {
      case 'basic':
        return (
          <>
            <i>{part.description}</i>
            <br />
          </>
        );
      case 'group':
        return (
          <>
            Project exercises {part.groupProjectCount}
            <br />
          </>
        );
      case 'background':
        return (
          <>
            <i>{part.description}</i>
            <br />
            Submit ot {part.backgroundMaterial}
            <br />
          </>
        );
      case 'special':
        return (
          <>
            <i>{part.description}</i>
            <br />
            required skills: {part.requirements.join(', ')}
            <br />
          </>
        );
      default:
        return assertNever(part);
    }
  };
  return (
    <div>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      <br />
      {renderDetails()}
    </div>
  );
};

export default Part;
