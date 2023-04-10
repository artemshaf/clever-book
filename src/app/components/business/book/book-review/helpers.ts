import { Comment } from '@types';

export function makeActualyReviews(r: Comment[]) {
  return [...r].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return dateB - dateA;
  });
}
