export class UsageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UsageError";
  }
}

export interface Target {
  repository: string;
  pullRequestNumber: number;
}

const REPOSITORY = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const POSITIVE_INTEGER = /^[1-9]\d*$/;

/** Validates `owner/repo` and a pull request number from the command line. */
export function parseTarget(repository: string, number: string): Target {
  if (!REPOSITORY.test(repository)) {
    throw new UsageError(`"${repository}" is not in owner/repo form`);
  }
  if (!POSITIVE_INTEGER.test(number)) {
    throw new UsageError(`"${number}" is not a valid pull request number`);
  }
  const pullRequestNumber = Number(number);
  if (!Number.isSafeInteger(pullRequestNumber)) {
    throw new UsageError(`"${number}" is not a valid pull request number`);
  }
  return { repository, pullRequestNumber };
}
